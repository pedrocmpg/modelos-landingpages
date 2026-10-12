import { motion, useScroll, useSpring } from "motion/react";
import { useMovimento } from "../motion/tokens.ts";

// Barra fina de progresso de leitura (scaleX: só transform).
export function BarraProgresso() {
  const m = useMovimento();
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  if (m.reduzido) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "var(--cor-destaque)",
        transformOrigin: "0% 50%",
        scaleX: escala,
        zIndex: 300,
      }}
    />
  );
}
