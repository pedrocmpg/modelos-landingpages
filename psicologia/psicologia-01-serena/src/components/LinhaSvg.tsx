import type { RefObject } from "react";
import { motion, useScroll } from "motion/react";
import { useMovimento } from "../motion/tokens.ts";
import "./LinhaSvg.css";

// Pontos por onde a linha "desenhada à mão" passa (x em 0-100, y em 0-1000).
// Zigue-zague suave de uma borda à outra, com pequenas irregularidades.
const PONTOS: [number, number][] = [
  [94, 0],
  [5, 120],
  [96, 255],
  [4, 380],
  [93, 505],
  [6, 640],
  [97, 770],
  [5, 885],
  [60, 1000],
];

function caminho(): string {
  const [primeiro, ...resto] = PONTOS;
  let d = `M ${primeiro[0]} ${primeiro[1]}`;
  let [x0, y0] = primeiro;
  resto.forEach(([x, y], i) => {
    const folga = 52 + (i % 3) * 9;
    d += ` C ${x0 + (i % 2 ? 6 : -4)} ${y0 + folga}, ${x + (i % 2 ? -5 : 7)} ${y - folga}, ${x} ${y}`;
    [x0, y0] = [x, y];
  });
  return d;
}

const D = caminho();

/**
 * Linha fina que atravessa a página ligando as seções e se desenha conforme a
 * rolagem. O SVG estica com a altura do conteúdo (preserveAspectRatio="none") e
 * a espessura fica fixa (non-scaling-stroke). Com movimento reduzido, a linha
 * já aparece inteira.
 */
export function LinhaSvg({ alvo }: { alvo: RefObject<HTMLElement | null> }) {
  const m = useMovimento();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start 70%", "end 70%"] });

  return (
    <svg className="linha-svg" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {m.reduzido ? (
        <path d={D} className="linha-svg__tracado" />
      ) : (
        <motion.path d={D} className="linha-svg__tracado" style={{ pathLength: scrollYProgress }} />
      )}
    </svg>
  );
}
