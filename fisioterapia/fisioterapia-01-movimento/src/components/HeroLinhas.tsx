import "./HeroLinhas.css";

// Linhas orgânicas do hero: uma coluna estilizada (duas curvas paralelas com
// "vértebras") e uma trajetória de movimento. Desenham-se ao carregar.
// Geometria gerada aqui; nada disso é conteúdo, então não vem do config.

const LARGURA = 660;
const ALTURA = 720;

const centro = (y: number) => 66 + 26 * Math.sin(y / 108 + 0.6);

function curva(deslocamento: number): string {
  const pontos: string[] = [];
  for (let y = 24; y <= ALTURA - 24; y += 12) {
    pontos.push(`${(centro(y) + deslocamento).toFixed(1)} ${y}`);
  }
  return `M ${pontos.join(" L ")}`;
}

const COLUNA_A = curva(-9);
const COLUNA_B = curva(9);

const VERTEBRAS = Array.from({ length: 14 }, (_, i) => {
  const y = 64 + i * 44;
  const meia = 11 + Math.sin(i / 2.2) * 5 + i * 0.5;
  return `M ${(centro(y) - meia).toFixed(1)} ${y} L ${(centro(y) + meia).toFixed(1)} ${y}`;
});

const TRAJETORIA = "M 30 690 C 130 640 150 520 310 470 S 540 300 630 84";

// Cada elemento começa a desenhar um pouco depois do anterior.
const atraso = (s: number) => ({ "--atraso": `${s}s` }) as React.CSSProperties;

export function HeroLinhas() {
  return (
    <svg
      className="hero-linhas"
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path className="hero-linhas__contorno" d={TRAJETORIA} pathLength={1} style={atraso(0.2)} />
      <path className="hero-linhas__trajetoria" d={TRAJETORIA} pathLength={1} style={atraso(0.2)} />
      <circle className="hero-linhas__ponto" cx="630" cy="84" r="9" pathLength={1} style={atraso(2.1)} />
      <path className="hero-linhas__coluna" d={COLUNA_A} pathLength={1} style={atraso(0.5)} />
      <path className="hero-linhas__coluna" d={COLUNA_B} pathLength={1} style={atraso(0.7)} />
      {VERTEBRAS.map((d, i) => (
        <path key={i} className="hero-linhas__vertebra" d={d} pathLength={1} style={atraso(1.1 + i * 0.07)} />
      ))}
    </svg>
  );
}
