export default function Sidebar({ usuario, currentView, onNavigate, unreadCount }) {
  const items = [
    { key: 'proceso', label: 'Mi proceso' },
    { key: 'temas', label: 'Temas disponibles' },
    { key: 'solicitudes', label: 'Solicitudes' },
    { key: 'notif', label: 'Notificaciones', badge: unreadCount },
    { key: 'documentos', label: 'Documentos' },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        SGM
        <small>UTFSM · Informática</small>
      </div>

      <div className="who">
        <div className="name">{usuario.nombre}</div>
        <div className="role">{usuario.rol}</div>
      </div>

      <nav className="primary">
        {items.map((item) => (
          <button
            key={item.key}
            className={currentView === item.key ? 'active' : ''}
            onClick={() => onNavigate(item.key)}
          >
            {item.label}
            {typeof item.badge === 'number' && item.badge > 0 && (
              <span className="badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        Sesión guardada automáticamente.
        <br />
        No se pierde avance al navegar.
      </div>

      <div className="uni-stripes" aria-hidden="true">
        <span className="stripe stripe-red"></span>
        <span className="stripe stripe-yellow"></span>
        <span className="stripe stripe-blue"></span>
      </div>
    </aside>
  );
}
