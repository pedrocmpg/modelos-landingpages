import { useRef } from "react";
import { motion } from "motion/react";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { Linhas } from "./Linhas.tsx";
import "./TituloSecao.css";

interface Props {
  eyebrow?: string;
  titulo: string;
  introducao?: string;
  /** Fundo escuro: textos em cores claras. */
  escuro?: boolean;
  /** id do <h2>, para aria-labelledby da seção. */
  id?: string;
}

// O título sobe por máscara, linha a linha; rótulo e introdução entram em fade.
export function TituloSecao({ eyebrow, titulo, introducao, escuro = false, id }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.35);
  const animado = m.observador;
  const estado = !animado || emVista ? "visivel" : "oculto";

  const variantes = {
    eyebrow: {
      oculto: { opacity: 0 },
      visivel: { opacity: 1, transition: { duration: m.dur(0.8), ease: EASE.enter } },
    },
    texto: {
      oculto: { opacity: 0, y: m.dist(14) },
      visivel: {
        opacity: 1,
        y: 0,
        transition: { duration: m.dur(0.9), ease: EASE.enter, delay: m.reduzido ? 0 : 0.4 },
      },
    },
  };

  return (
    <div ref={ref} className={`titulo-secao${escuro ? " titulo-secao--escuro" : ""}`}>
      {eyebrow && (
        <motion.p
          className="eyebrow"
          variants={variantes.eyebrow}
          initial={animado ? "oculto" : false}
          animate={estado}
        >
          {eyebrow}
        </motion.p>
      )}
      <Linhas id={id} texto={titulo} como="h2" className="titulo-secao__titulo" />
      {introducao && (
        <motion.p
          className="titulo-secao__intro"
          variants={variantes.texto}
          initial={animado ? "oculto" : false}
          animate={estado}
        >
          {introducao}
        </motion.p>
      )}
    </div>
  );
}
