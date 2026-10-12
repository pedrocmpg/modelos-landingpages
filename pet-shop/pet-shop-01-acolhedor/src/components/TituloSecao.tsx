import { useRef } from "react";
import { motion } from "motion/react";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import "./TituloSecao.css";

interface Props {
  eyebrow?: string;
  titulo: string;
  introducao?: string;
  centralizado?: boolean;
  /** Fundo escuro: sublinhado e eyebrow usam as cores claras. */
  escuro?: boolean;
  /** id do <h2>, para aria-labelledby da seção. */
  id?: string;
}

// Entrada de título: o eyebrow desliza, o título sobe de dentro de uma máscara
// e o sublinhado é "desenhado". Observa o contêiner (que não é recortado), não
// o texto que começa escondido dentro da máscara.
export function TituloSecao({
  eyebrow,
  titulo,
  introducao,
  centralizado = false,
  escuro = false,
  id,
}: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.35);
  const animado = m.observador;
  const estado = !animado || emVista ? "visivel" : "oculto";

  const variantes = {
    eyebrow: {
      oculto: { opacity: 0, x: -m.dist(16) },
      visivel: { opacity: 1, x: 0, transition: { duration: m.dur(0.5), ease: EASE.enter } },
    },
    titulo: {
      oculto: m.reduzido ? { opacity: 0 } : { y: "105%" },
      visivel: {
        opacity: 1,
        y: 0,
        transition: { duration: m.dur(0.75), ease: EASE.enter, delay: m.reduzido ? 0 : 0.08 },
      },
    },
    linha: {
      oculto: m.reduzido ? { opacity: 0 } : { scaleX: 0 },
      visivel: {
        opacity: 1,
        scaleX: 1,
        transition: { duration: m.dur(0.6), ease: EASE.inOut, delay: m.reduzido ? 0 : 0.35 },
      },
    },
    texto: {
      oculto: { opacity: 0 },
      visivel: { opacity: 1, transition: { duration: m.dur(0.6), ease: EASE.enter, delay: 0.3 } },
    },
  };

  return (
    <div
      ref={ref}
      className={`titulo-secao${centralizado ? " titulo-secao--centro" : ""}${escuro ? " titulo-secao--escuro" : ""}`}
    >
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
      <div className="titulo-secao__mascara">
        <motion.h2
          id={id}
          variants={variantes.titulo}
          initial={animado ? "oculto" : false}
          animate={estado}
        >
          {titulo}
        </motion.h2>
      </div>
      <motion.span
        aria-hidden="true"
        className="titulo-secao__linha"
        variants={variantes.linha}
        initial={animado ? "oculto" : false}
        animate={estado}
      />
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
