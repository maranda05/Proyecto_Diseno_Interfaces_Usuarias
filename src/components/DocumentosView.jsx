function DocRow({ doc, onToggle }) {
  return (
    <div className="doc-row">
      <input
        type="checkbox"
        checked={doc.checked}
        disabled={doc.disabled}
        onChange={() => onToggle(doc.id)}
      />
      <span className={`dtxt ${doc.checked ? 'done' : ''}`}>{doc.texto}</span>
      {doc.tag && <span className="dtag">{doc.tag}</span>}
      {doc.accion && <button className="link-btn">{doc.accion}</button>}
    </div>
  );
}

export default function DocumentosView({ documentos, onToggle }) {
  return (
    <div className="view-enter">
      <div className="view-head">
        <div>
          <h1>Documentos requeridos</h1>
          <p>Todo lo que necesitas para el examen de título, con su plantilla y estado, en un solo lugar.</p>
        </div>
      </div>

      <section className="block">
        <h2>Para el examen de título</h2>
        {documentos.examenTitulo.map((doc) => (
          <DocRow key={doc.id} doc={doc} onToggle={onToggle} />
        ))}
      </section>

      <section className="block">
        <h2>Para inscribir TT2</h2>
        {documentos.tt2.map((doc) => (
          <DocRow key={doc.id} doc={doc} onToggle={onToggle} />
        ))}
      </section>
    </div>
  );
}
