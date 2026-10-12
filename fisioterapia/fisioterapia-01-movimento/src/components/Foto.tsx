import { useRef } from "react";
import { motion } from "motion/react";
import type { Imagem } from "../config/types.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { SeloExemplo } from "./SeloExemplo.tsx";
import "./Foto.css";

interface Props {
  imagem: Imagem;
  proporcao?: string;
  posicao?: string;
  /** Acima da dobra: carrega já e anima ao montar. */
  prioritaria?: boolean;
  atraso?: number;
  className?: string;
}

const FECHADO = "inset(0 100% 0 0)";
const ABERTO = "inset(0 0% 0 0)";

// Foto que se revela como uma cortina (clip-path da esquerda para a direita),
// com um leve zoom-out na imagem. O contêiner externo, sem recorte, é o que o
// IntersectionObserver acompanha.
export function Foto({ imagem, proporcao = "4 / 3", posicao = "center", prioritaria = false, atraso = 0, className }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.2);
  const animado = m.observador;
  const aberto = !animado || prioritaria || emVista;
  const delay = m.reduzido ? 0 : atraso;

  return (
    <div ref={ref} className={`foto${className ? ` ${className}` : ""}`}>
      <motion.div
        className="foto__quadro"
        style={{ aspectRatio: proporcao }}
        initial={animado ? (m.reduzido ? { opacity: 0 } : { clipPath: FECHADO }) : false}
        animate={
          aberto
            ? m.reduzido
              ? { opacity: 1 }
              : { clipPath: ABERTO }
            : m.reduzido
              ? { opacity: 0 }
              : { clipPath: FECHADO }
        }
        transition={{ duration: m.dur(1.3), ease: EASE.inOut, delay }}
      >
        <motion.img
          className="foto__imagem"
          src={imagem.src}
          alt={imagem.alt}
          loading={prioritaria ? "eager" : "lazy"}
          fetchPriority={prioritaria ? "high" : undefined}
          decoding="async"
          style={{ objectPosition: posicao }}
          initial={animado ? { scale: m.reduzido ? 1 : 1.14 } : false}
          animate={aberto ? { scale: 1 } : { scale: m.reduzido ? 1 : 1.14 }}
          transition={{ duration: m.dur(1.6), ease: EASE.enter, delay }}
        />
      </motion.div>
      {imagem.exemplo && (
        <span className="foto__selo">
          <SeloExemplo />
        </span>
      )}
    </div>
  );
}
