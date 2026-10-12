import { motion, useScroll, useTransform } from "motion/react";
import { useMovimento } from "../motion/tokens.ts";
import "./FormasFundo.css";

interface Forma {
  /** Posição vertical em % da altura da página. */
  topo: number;
  /** Lado: distância da borda em %, negativa = sai da tela. */
  lado: "esquerda" | "direita";
  borda: number;
  /** Largura em vw (limitada em px no CSS). */
  tamanho: number;
  /** Forma orgânica (border-radius) e rotação. */
  raio: string;
  rotacao: number;
  /** Deslocamento do parallax em px (no máximo 20, positivo ou negativo). */
  parallax: number;
  /** "primaria" ou "suave": tom da forma. */
  tom: "primaria" | "suave";
}

const FORMAS: Forma[] = [
  { topo: 1, lado: "direita", borda: -14, tamanho: 46, raio: "58% 42% 61% 39% / 47% 55% 45% 53%", rotacao: 12, parallax: -20, tom: "suave" },
  { topo: 24, lado: "esquerda", borda: -18, tamanho: 38, raio: "42% 58% 37% 63% / 55% 40% 60% 45%", rotacao: -18, parallax: 16, tom: "primaria" },
  { topo: 52, lado: "direita", borda: -20, tamanho: 40, raio: "63% 37% 54% 46% / 41% 59% 41% 59%", rotacao: 30, parallax: -14, tom: "primaria" },
  { topo: 80, lado: "esquerda", borda: -16, tamanho: 44, raio: "47% 53% 38% 62% / 60% 44% 56% 40%", rotacao: -8, parallax: 20, tom: "suave" },
];

// Formas orgânicas suaves atrás do conteúdo. O contorno desfocado vem de um
// gradiente radial (sem filter: blur, que é caro em celular). Só transform anima.
export function FormasFundo() {
  const m = useMovimento();
  const { scrollYProgress } = useScroll();
  const [a, b, c, d] = [
    useTransform(scrollYProgress, [0, 1], [0, m.dist(FORMAS[0].parallax)]),
    useTransform(scrollYProgress, [0, 1], [0, m.dist(FORMAS[1].parallax)]),
    useTransform(scrollYProgress, [0, 1], [0, m.dist(FORMAS[2].parallax)]),
    useTransform(scrollYProgress, [0, 1], [0, m.dist(FORMAS[3].parallax)]),
  ];
  const deslocamentos = [a, b, c, d];

  return (
    <div className="formas-fundo" aria-hidden="true">
      {FORMAS.map((f, i) => (
        <motion.div
          key={i}
          className={`forma forma--${f.tom}`}
          style={{
            top: `${f.topo}%`,
            [f.lado === "direita" ? "right" : "left"]: `${f.borda}vw`,
            width: `${f.tamanho}vw`,
            borderRadius: f.raio,
            rotate: f.rotacao,
            y: m.reduzido ? 0 : deslocamentos[i],
          }}
        />
      ))}
    </div>
  );
}
