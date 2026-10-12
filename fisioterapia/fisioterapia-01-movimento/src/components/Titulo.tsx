import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { partesDoTitulo } from "../config/titulo.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";

interface Props {
  texto: string;
  /** Elemento do título (h1 no hero, h2 nas seções). */
  como?: "h1" | "h2";
  id?: string;
  /** true = anima ao montar (acima da dobra) em vez de ao entrar na tela. */
  imediato?: boolean;
  atraso?: number;
  className?: string;
}

/** Título com a marcação *palavra* resolvida em <em>. Entra com fade e subida curta. */
export function Titulo({ texto, como = "h2", id, imediato = false, atraso = 0, className }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLElement>(null);
  const emVista = useEmVista(ref, 0.4);
  const [montado, setMontado] = useState(false);
  useEffect(() => {
    if (!imediato) return;
    const quadro = requestAnimationFrame(() => setMontado(true));
    return () => cancelAnimationFrame(quadro);
  }, [imediato]);

  const Tag = motion[como] as typeof motion.h2;
  const animado = m.observador;
  const visivel = !animado || (imediato ? montado : emVista);
  const sobe = m.dist(16);

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      id={id}
      className={className}
      initial={animado ? { opacity: 0, y: sobe } : false}
      animate={visivel ? { opacity: 1, y: 0 } : { opacity: 0, y: sobe }}
      transition={{ duration: m.dur(1), ease: EASE.enter, delay: m.reduzido ? 0 : atraso }}
    >
      {partesDoTitulo(texto).map((p, i) =>
        p.destaque ? <em key={i}>{p.texto}</em> : <Fragment key={i}>{p.texto}</Fragment>,
      )}
    </Tag>
  );
}
