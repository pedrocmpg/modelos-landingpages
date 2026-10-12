import { useRef, type ElementType, type ReactNode } from "react";
import { motion } from "motion/react";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";

type Tag = "div" | "li" | "article" | "figure";

interface Props {
  children: ReactNode;
  /** Atraso em segundos (use escalonar(i, 0.1) para listas). */
  atraso?: number;
  /** "card": fade + subida. "fade": só opacidade. */
  tipo?: "card" | "fade";
  className?: string;
  as?: Tag;
}

// Entrada padrão dos blocos: fade com 20 px de subida. Só opacity e transform.
export function Reveal({ children, atraso = 0, tipo = "card", className, as = "div" }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLElement>(null);
  const emVista = useEmVista(ref, 0.2);

  // Sem IntersectionObserver: nada de estado oculto.
  const Externo = as as ElementType;
  if (!m.observador) return <Externo className={className}>{children}</Externo>;

  const MotionTag = motion[as] as typeof motion.div;
  const sobe = tipo === "card" ? m.dist(20) : 0;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y: sobe }}
      animate={emVista ? { opacity: 1, y: 0 } : { opacity: 0, y: sobe }}
      transition={{ duration: m.dur(0.9), ease: EASE.enter, delay: m.reduzido ? 0 : atraso }}
    >
      {children}
    </MotionTag>
  );
}
