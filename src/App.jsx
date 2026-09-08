import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import ProcesoView from './components/ProcesoView';
import TemasView from './components/TemasView';
import NotificacionesView from './components/NotificacionesView';
import DocumentosView from './components/DocumentosView';
import SolicitudesView from './components/SolicitudesView';
import {
  usuario,
  proceso,
  temasIniciales,
  areas,
  notificacionesIniciales,
  tiposDocumento,
  solicitudesEnviadasIniciales,
  documentos as documentosIniciales,
} from './data/mockData';

const VIEWS = ['proceso', 'temas', 'solicitudes', 'notif', 'documentos'];

function getViewFromHash() {
  const hash = window.location.hash.replace('#', '');
  return VIEWS.includes(hash) ? hash : 'proceso';
}

export default function App() {
  const [view, setView] = useState(getViewFromHash);
  const [temas] = useState(temasIniciales);
  const [solicitudes, setSolicitudes] = useState([]);
  const [notificaciones, setNotificaciones] = useState(notificacionesIniciales);
  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState(solicitudesEnviadasIniciales);
  const [documentos, setDocumentos] = useState(documentosIniciales);

  // Navegación: mantiene el hash en la URL, igual que el prototipo original,
  // y responde al botón "atrás" del navegador.
  const navigate = useCallback((nextView) => {
    setView(nextView);
    window.history.pushState({ view: nextView }, '', `#${nextView}`);
  }, []);

  useEffect(() => {
    const onPopState = () => setView(getViewFromHash());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Al entrar a Notificaciones, se marcan todas como leídas.
  useEffect(() => {
    if (view === 'notif') {
      setNotificaciones((prev) => prev.map((n) => ({ ...n, unread: false })));
    }
  }, [view]);

  const handleSolicitar = useCallback(
    (id) => {
      const tema = temas.find((t) => t.id === id);
      if (!tema) return;
      setSolicitudes((prev) => {
        if (prev.some((s) => s.id === id)) return prev;
        return [...prev, { id, titulo: tema.titulo, profesor: tema.profesor }];
      });
      setNotificaciones((prev) => [
        {
          id: Date.now(),
          type: 'tema',
          title: `Solicitud enviada a ${tema.profesor}`,
          body: `Recibirás una respuesta sobre "${tema.titulo}" en tu bandeja de notificaciones.`,
          time: 'Ahora',
          unread: true,
        },
        ...prev,
      ]);
    },
    [temas]
  );

  const handleToggleDoc = useCallback((id) => {
    setDocumentos((prev) => {
      const toggleList = (list) =>
        list.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d));
      return {
        examenTitulo: toggleList(prev.examenTitulo),
        tt2: toggleList(prev.tt2),
      };
    });
  }, []);

  const handleEnviarSolicitud = useCallback(
    (solicitud) => {
      setSolicitudesEnviadas((prev) => [
        ...prev,
        {
          id: Date.now(),
          tipo: solicitud.tipo,
          archivo: solicitud.archivo,
          fecha: new Date().toLocaleDateString('es-CL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          estado: 'revision',
        },
      ]);
      setNotificaciones((prev) => [
        {
          id: Date.now(),
          type: 'status',
          title: `Solicitud enviada: ${solicitud.tipo}`,
          body: `"${solicitud.archivo}" fue registrado y quedó en revisión oficial. Te avisaremos cuando haya respuesta.`,
          time: 'Ahora',
          unread: true,
        },
        ...prev,
      ]);
    },
    []
  );

  const unreadCount = notificaciones.filter((n) => n.unread).length;

  return (
    <div className="shell">
      <Sidebar
        usuario={usuario}
        currentView={view}
        onNavigate={navigate}
        unreadCount={unreadCount}
      />
      <main>
        {view === 'proceso' && <ProcesoView proceso={proceso} />}
        {view === 'temas' && (
          <TemasView
            temas={temas}
            areas={areas}
            solicitudes={solicitudes}
            onSolicitar={handleSolicitar}
          />
        )}
        {view === 'solicitudes' && (
          <SolicitudesView
            tipos={tiposDocumento}
            solicitudes={solicitudesEnviadas}
            onEnviar={handleEnviarSolicitud}
          />
        )}
        {view === 'notif' && <NotificacionesView notificaciones={notificaciones} />}
        {view === 'documentos' && (
          <DocumentosView documentos={documentos} onToggle={handleToggleDoc} />
        )}
      </main>
    </div>
  );
}
