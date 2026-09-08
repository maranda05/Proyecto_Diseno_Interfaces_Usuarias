import { useState } from 'react';

const ESTADOS = {
  revision: { label: 'En revisión', cls: 'pending' },
  aprobado: { label: 'Aprobado', cls: 'ok' },
  rechazado: { label: 'Observado', cls: 'urgent' },
};

const ARCHIVOS_SIMULADOS = {
  'Informe de avance (memoria)': ['avance_2026_09.pdf', 'avance_v4.pdf'],
  'Informe final de memoria': ['informe_final_2026.pdf'],
  'Certificado de nivel de inglés': ['certificado_ingles.pdf'],
  'Copia digital de la memoria (PDF)': ['memoria_titulo_2026.pdf'],
};

export default function SolicitudesView({ tipos, solicitudes, onEnviar }) {
  const [tipo, setTipo] = useState(tipos[0] ?? '');
  const [archivo, setArchivo] = useState('');
  const [comentario, setComentario] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleAdjuntar = () => {
    const candidatos = ARCHIVOS_SIMULADOS[tipo] ?? ['documento_2026.pdf'];
    const idx = archivo ? (candidatos.indexOf(archivo) + 1) % candidatos.length : 0;
    setArchivo(candidatos[idx]);
    setEnviado(false);
  };

  const handleQuitar = () => {
    setArchivo('');
    setEnviado(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnviar({ tipo, archivo, comentario });
    setTipo(tipos[0] ?? '');
    setArchivo('');
    setComentario('');
    setEnviado(true);
  };

  return (
    <div className="view-enter">
      <div className="view-head">
        <div>
          <h1>Enviar solicitud formal</h1>
          <p>Sube un documento de avance y envíalo para su revisión oficial — sin correos ni WhatsApp.</p>
        </div>
      </div>

      <section className="block">
        <h2>Nueva solicitud</h2>
        <form className="sol-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Tipo de documento</span>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <div className="field">
            <span>Documento de avance</span>
            <div
              className={`file-sim ${archivo ? 'attached' : ''}`}
              role="button"
              tabIndex={0}
              onClick={handleAdjuntar}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleAdjuntar();
                }
              }}
            >
              {archivo ? (
                <>
                  <strong>{archivo}</strong>
                  <span className="file-sim-hint">Haz clic para cambiar</span>
                  <button
                    type="button"
                    className="file-sim-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuitar();
                    }}
                  >
                    Quitar
                  </button>
                </>
              ) : (
                <span>Adjuntar documento (simulado)</span>
              )}
            </div>
            <small>
              Formato PDF, máx. 20 MB. En el prototipo el archivo es simulado; no se sube
              realmente.
            </small>
          </div>

          <label className="field">
            <span>Comentario (opcional)</span>
            <textarea
              rows="3"
              placeholder="Ej.: enviado 2 días antes de la fecha límite para revisión anticipada."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </label>

          <button className={`btn ${archivo ? '' : 'disabled'}`} type="submit" disabled={!archivo}>
            Enviar solicitud de revisión
          </button>
        </form>

        {enviado && (
          <div className="sol-success">
            <span className="sol-success-icon">✓</span>
            <div>
              <strong>Solicitud enviada con éxito.</strong>
              <p>
                Quedó registrada para revisión oficial. Recibirás una notificación cuando esté
                respondida.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="block">
        <h2>Mis solicitudes</h2>
        {solicitudes.length === 0 ? (
          <div className="empty">Aún no has enviado ninguna solicitud.</div>
        ) : (
          solicitudes.map((s) => (
            <div className="sol-row" key={s.id}>
              <span>
                {s.tipo}
                <span className="sol-archivo">
                  {s.archivo} · {s.fecha}
                </span>
              </span>
              <span className={`status-chip ${ESTADOS[s.estado]?.cls ?? 'pending'}`}>
                {ESTADOS[s.estado]?.label ?? s.estado}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}