import type { RefObject } from "react";
import { motion, useScroll } from "motion/react";
import { useMovimento } from "../motion/tokens.ts";
import "./Trajetoria.css";

// Trajetória de movimento que atravessa a página: ondula de uma borda à outra
// e termina com uma seta. x em 0-100, y em 0-1000.
function caminho(): string {
  const pontos: [number, number][] = [];
  for (let y = 0; y <= 1000; y += 20) {
    const x = 50 + 43 * Math.sin(y / 118 - 0.4) * (0.55 + 0.45 * Math.sin(y / 330 + 1));
    pontos.push([Number(x.toFixed(2)), y]);
  }
  return `M ${pontos.map(([x, y]) => `${x} ${y}`).join(" L ")}`;
}

const D = caminho();

/**
 * Traço que atravessa a página e se desenha conforme a rolagem. O SVG estica
 * com a altura do conteúdo (preserveAspectRatio="none") e a espessura fica fixa
 * (non-scaling-stroke). Com movimento reduzido, o traço já aparece inteiro.
 */
export function Trajetoria({ alvo }: { alvo: RefObject<HTMLElement | null> }) {
  const m = useMovimento();
  const { scrollYProgress } = useScroll({ target: alvo, offset: ["start 70%", "end 70%"] });

  return (
    <svg className="trajetoria" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {m.reduzido ? (
        <path d={D} className="trajetoria__tracado" />
      ) : (
        <motion.path d={D} className="trajetoria__tracado" style={{ pathLength: scrollYProgress }} />
      )}
    </svg>
  );
}
