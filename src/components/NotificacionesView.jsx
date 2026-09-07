const ICONS = { deadline: '⏰', status: '✓', tema: '＋' };

export default function NotificacionesView({ notificaciones }) {
  return (
    <div className="view-enter">
      <div className="view-head">
        <div>
          <h1>Notificaciones</h1>
          <p>Alertas proactivas sobre fechas críticas y cambios de estado, para no enterarte tarde.</p>
        </div>
      </div>

      <div>
        {notificaciones.length === 0 ? (
          <div className="empty">No tienes notificaciones.</div>
        ) : (
          notificaciones.map((n) => (
            <div className={`notif ${n.unread ? 'unread' : ''}`} key={n.id}>
              <div className={`ntype ${n.type}`}>{ICONS[n.type] ?? '•'}</div>
              <div className="ncontent">
                <strong>{n.title}</strong>
                <p>{n.body}</p>
                <time>{n.time}</time>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
