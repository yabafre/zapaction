interface Param {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

interface ApiSignatureProps {
  name: string;
  params: Param[];
  returnType: string;
  description?: string;
}

export function ApiSignature({ name, params, returnType, description }: ApiSignatureProps) {
  return (
    <section className="mt-6 mb-6">
      {description ? <p style={{ marginBottom: '0.5rem', color: '#666' }}>{description}</p> : null}
      <pre className="nextra-code" style={{
        overflowX: 'auto',
        borderRadius: '6px',
        marginTop: 0,
        marginBottom: 0
      }}>
        <code style={{ fontSize: '0.875rem', fontFamily: 'var(--font-docs-mono)', background: 'transparent', border: 'none', padding: 0 }}>
          <span style={{ color: '#d73a49' }}>function</span> <span style={{ color: '#6f42c1' }}>{name}</span>(
          {"\n"}
          {params
            .map((p, i) => {
              const optional = p.required === false ? "?" : "";
              const note = p.description ? (
                <span style={{ color: '#6a737d', fontStyle: 'italic' }}> // {p.description}</span>
              ) : (
                ""
              );
              return (
                <span key={p.name}>
                  {"  "}
                  {p.name}{optional}: <span style={{ color: '#005cc5' }}>{p.type}</span>
                  {note}
                  {i < params.length - 1 ? ",\n" : ""}
                </span>
              );
            })}
          {"\n"}
          ): <span style={{ color: '#005cc5' }}>{returnType}</span>
        </code>
      </pre>
    </section>
  );
}
