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

// Foto com cantos bem arredondados que entra em fade com um leve zoom-out.
// O contêiner externo (sem recorte) é quem o IntersectionObserver acompanha.
export function Foto({ imagem, proporcao = "4 / 3", posicao = "center", prioritaria = false, atraso = 0, className }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.2);
  const animado = m.observador;
  const aberto = !animado || prioritaria || emVista;

  return (
    <div ref={ref} className={`foto${className ? ` ${className}` : ""}`}>
      <motion.div
        className="foto__quadro"
        style={{ aspectRatio: proporcao }}
        initial={animado ? { opacity: 0, scale: m.reduzido ? 1 : 0.97 } : false}
        animate={aberto ? { opacity: 1, scale: 1 } : { opacity: 0, scale: m.reduzido ? 1 : 0.97 }}
        transition={{ duration: m.dur(1.2), ease: EASE.enter, delay: m.reduzido ? 0 : atraso }}
      >
        <motion.img
          className="foto__imagem"
          src={imagem.src}
          alt={imagem.alt}
          loading={prioritaria ? "eager" : "lazy"}
          fetchPriority={prioritaria ? "high" : undefined}
          decoding="async"
          style={{ objectPosition: posicao }}
          initial={animado ? { scale: m.reduzido ? 1 : 1.06 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: m.dur(1.2), ease: EASE.enter, delay: m.reduzido ? 0 : atraso }}
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
