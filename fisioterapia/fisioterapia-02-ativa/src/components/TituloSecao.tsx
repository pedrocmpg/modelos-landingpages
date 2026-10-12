import { useRef } from "react";
import { motion } from "motion/react";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { Titulo } from "./Titulo.tsx";
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

// Rótulo e introdução entram em fade; o título, com fade e subida curta.
export function TituloSecao({ eyebrow, titulo, introducao, escuro = false, id }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.35);
  const animado = m.observador;
  const estado = !animado || emVista ? "visivel" : "oculto";

  const variantes = {
    oculto: { opacity: 0, y: m.dist(12) },
    visivel: {
      opacity: 1,
      y: 0,
      transition: { duration: m.dur(1), ease: EASE.enter, delay: m.reduzido ? 0 : 0.2 },
    },
  };

  return (
    <div ref={ref} className={`titulo-secao${escuro ? " titulo--escuro" : ""}`}>
      {eyebrow && (
        <motion.p
          className="eyebrow"
          variants={variantes}
          initial={animado ? "oculto" : false}
          animate={estado}
        >
          {eyebrow}
        </motion.p>
      )}
      <Titulo id={id} texto={titulo} className="titulo-secao__titulo" />
      {introducao && (
        <motion.p
          className="titulo-secao__intro"
          variants={variantes}
          initial={animado ? "oculto" : false}
          animate={estado}
        >
          {introducao}
        </motion.p>
      )}
    </div>
  );
}
