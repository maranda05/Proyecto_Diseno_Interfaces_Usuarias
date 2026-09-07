export default function ProcesoView({ proceso }) {
  return (
    <div className="view-enter">
      <div className="view-head">
        <div>
          <h1>Mi proceso de titulación</h1>
          <p>Estado, responsable y fechas críticas en un solo lugar — sin depender del correo.</p>
        </div>
      </div>

      <div className="stepper">
        {proceso.etapas.map((etapa) => (
          <div key={etapa.id} className={`stepitem ${etapa.estado === 'pending' ? '' : etapa.estado}`}>
            <span className="dot"></span>
            {etapa.label}
          </div>
        ))}
      </div>

      <div className="status-panel">
        <div>
          <div className="label">Trámite pendiente</div>
          <div className="value">{proceso.tramitePendiente}</div>
        </div>
        <div>
          <div className="label">Responsable actual</div>
          <div className="value">{proceso.responsableActual}</div>
        </div>
        <div className="sub">{proceso.actualizado}</div>
      </div>

      <section className="block">
        <h2>Próximos hitos</h2>
        {proceso.hitos.map((hito) => (
          <div className="milestone" key={hito.id}>
            <span className={`chip ${hito.chip}`}>{hito.chipLabel}</span>
            <div className="txt">
              <strong>{hito.titulo}</strong>
              <span>{hito.detalle}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="block">
        <h2>¿Por qué está en pausa mi inscripción?</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: '13.5px', maxWidth: '520px', margin: 0 }}>
          Para inscribir TT2 se requiere validar Práctica Profesional 2 y el nivel de inglés. Ambas
          validaciones se solicitan automáticamente al llegar al 80% de avance; no necesitas
          escribir a la Jefatura de Carrera para confirmarlo.
        </p>
      </section>
    </div>
  );
}
