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

// Foto em arco (janela). Revela de baixo para cima (clip-path) enquanto a imagem
// faz um zoom-out lento de 1.1 para 1. O contêiner externo, sem recorte, é quem
// o IntersectionObserver acompanha (um elemento recortado nunca "entra na tela").
export function Foto({ imagem, proporcao = "3 / 4", posicao = "center", prioritaria = false, atraso = 0, className }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.2);
  const animado = m.observador;
  const aberto = !animado || prioritaria || emVista;

  const cortina = {
    oculto: m.reduzido ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" },
    visivel: m.reduzido ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" },
  };
  const espera = m.reduzido ? 0 : atraso;

  return (
    <div ref={ref} className={`foto${className ? ` ${className}` : ""}`} style={{ aspectRatio: proporcao }}>
      <motion.div
        className="foto__quadro"
        initial={animado ? cortina.oculto : false}
        animate={aberto ? cortina.visivel : cortina.oculto}
        transition={{ duration: m.dur(1.2), ease: EASE.inOut, delay: espera }}
      >
        <motion.img
          className="foto__imagem"
          src={imagem.src}
          alt={imagem.alt}
          loading={prioritaria ? "eager" : "lazy"}
          fetchPriority={prioritaria ? "high" : undefined}
          decoding="async"
          style={{ objectPosition: posicao }}
          initial={animado ? { scale: m.reduzido ? 1 : 1.1 } : false}
          animate={aberto ? { scale: 1 } : { scale: m.reduzido ? 1 : 1.1 }}
          transition={{ duration: m.dur(1.8), ease: EASE.enter, delay: espera }}
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
