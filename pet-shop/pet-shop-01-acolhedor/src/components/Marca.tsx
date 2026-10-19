// A marca do modelo: a plaquinha de identificação do pet (argola, medalha e patinha).
// Decorativa: o nome do negócio sempre aparece em texto ao lado.

export function MarcaPlaquinha({ tamanho = 34 }: { tamanho?: number }) {
  return (
    <svg
      className="marca-plaquinha"
      width={tamanho}
      height={tamanho * 1.14}
      viewBox="0 0 44 50"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="22" cy="6.5" r="5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="22" cy="29" r="19" fill="var(--cor-primaria)" stroke="currentColor" strokeWidth="2.6" />
      <g fill="currentColor" transform="translate(11.500 18.500) scale(.33)">
        <ellipse cx="22" cy="22" rx="5" ry="6.500" />
        <ellipse cx="42" cy="22" rx="5" ry="6.500" />
        <ellipse cx="14" cy="34" rx="4.500" ry="6" />
        <ellipse cx="50" cy="34" rx="4.500" ry="6" />
        <path d="M32 32c8 0 14 6 14 12.500S40.500 52 32 52s-14-3.500-14-7.500S24 32 32 32z" />
      </g>
    </svg>
  );
}

/** Texto em círculo (selo giratório do hero). */
export function TextoEmCirculo({ texto, id }: { texto: string; id: string }) {
  const repetido = `${texto} · ${texto} · `;
  return (
    <svg className="texto-circulo" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <path id={id} d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0" />
      </defs>
      <text>
        <textPath href={`#${id}`} textLength="281" lengthAdjust="spacing">
          {repetido}
        </textPath>
      </text>
    </svg>
  );
}
