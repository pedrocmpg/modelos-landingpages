import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import type { Imagem } from "../config/types.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import "./Foto.css";

interface Props {
  imagem: Imagem;
  proporcao?: string;
  posicao?: string;
  /** Acima da dobra: carrega já e anima ao montar, em vez de ao rolar. */
  prioritaria?: boolean;
  atraso?: number;
  className?: string;
  /** Selos/legendas sobrepostos à foto. */
  children?: ReactNode;
}

// Foto com entrada de "cortina": o quadro abre de baixo para cima (clip-path)
// enquanto a imagem dá um zoom-out. A sombra fica no contêiner externo, que não
// é recortado (e é ele que o IntersectionObserver acompanha).
export function Foto({
  imagem,
  proporcao = "4 / 3",
  posicao = "center",
  prioritaria = false,
  atraso = 0,
  className,
  children,
}: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.2);
  const animado = m.observador;
  const aberto = !animado || prioritaria || emVista;

  const duracao = m.dur(0.95);
  const cortina = {
    oculto: m.reduzido ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" },
    visivel: m.reduzido ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" },
  };
  const zoom = {
    oculto: { scale: m.reduzido ? 1 : m.suave ? 1.08 : 1.18 },
    visivel: { scale: 1 },
  };

  return (
    <div ref={ref} className={`foto${className ? ` ${className}` : ""}`} style={{ aspectRatio: proporcao }}>
      <motion.div
        className="foto__quadro"
        initial={animado ? cortina.oculto : false}
        animate={aberto ? cortina.visivel : cortina.oculto}
        transition={{ duration: duracao, ease: EASE.inOut, delay: atraso }}
      >
        <motion.img
          className="foto__imagem"
          src={imagem.src}
          alt={imagem.alt}
          loading={prioritaria ? "eager" : "lazy"}
          fetchPriority={prioritaria ? "high" : undefined}
          decoding="async"
          style={{ objectPosition: posicao }}
          initial={animado ? zoom.oculto : false}
          animate={aberto ? zoom.visivel : zoom.oculto}
          transition={{ duration: m.dur(1.2), ease: EASE.enter, delay: atraso }}
        />
        {children}
      </motion.div>
    </div>
  );
}
