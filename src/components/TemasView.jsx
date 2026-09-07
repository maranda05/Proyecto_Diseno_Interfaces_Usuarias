import { useMemo, useState } from 'react';

export default function TemasView({ temas, areas, solicitudes, onSolicitar }) {
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('');

  const filtrados = useMemo(() => {
    const q = search.toLowerCase();
    return temas.filter(
      (t) =>
        (t.titulo.toLowerCase().includes(q) || t.profesor.toLowerCase().includes(q)) &&
        (area === '' || t.area === area)
    );
  }, [temas, search, area]);

  return (
    <div className="view-enter">
      <div className="view-head">
        <div>
          <h1>Temas disponibles</h1>
          <p>Catálogo único y actualizado — reemplaza tener que escribir a cada profesor para saber si hay cupo.</p>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por título o profesor guía…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">Todas las áreas</option>
          {areas.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filtrados.length === 0 ? (
          <div className="empty">No hay temas que coincidan con tu búsqueda.</div>
        ) : (
          filtrados.map((t) => {
            const [taken, total] = t.cupos.split('/').map(Number);
            const sinCupos = taken >= total;
            const yaSolicitado = solicitudes.some((s) => s.id === t.id);
            let btnLabel = 'Solicitar tema';
            if (yaSolicitado) btnLabel = 'Solicitud enviada';
            else if (sinCupos) btnLabel = 'Sin cupos';

            return (
              <div className="tema" key={t.id}>
                <div className="tema-top">
                  <div>
                    <h3>{t.titulo}</h3>
                    <div className="prof">Profesor guía: {t.profesor}</div>
                    <div className="tags">
                      <span className="tag">{t.area}</span>
                      <span className={`tag ${sinCupos ? 'cupos-low' : ''}`}>Cupos: {t.cupos}</span>
                      <span className="tag updated">Actualizado {t.updated}</span>
                    </div>
                  </div>
                  <button
                    className={`btn ${yaSolicitado ? 'requested' : ''} ${
                      sinCupos && !yaSolicitado ? 'disabled' : ''
                    }`}
                    disabled={sinCupos && !yaSolicitado}
                    onClick={() => onSolicitar(t.id)}
                  >
                    {btnLabel}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="misolicitudes">
        <h2 style={{ fontSize: '17px', marginBottom: '12px' }}>Mis solicitudes</h2>
        {solicitudes.length === 0 ? (
          <div className="empty">Aún no has solicitado ningún tema.</div>
        ) : (
          solicitudes.map((s) => (
            <div className="sol-row" key={s.id}>
              <span>
                {s.titulo} — <span style={{ color: 'var(--ink-soft)' }}>{s.profesor}</span>
              </span>
              <span className="status-chip pending">Esperando respuesta</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
