import { useRef } from "react";
import { motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import type { Area } from "../config/types.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, escalonar, useMovimento } from "../motion/tokens.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Areas.css";

// Entra de baixo, com uma leve rotação que se corrige: o cartão "assenta".
function CartaoArea({ area, indice }: { area: Area; indice: number }) {
  const m = useMovimento();
  const ref = useRef<HTMLLIElement>(null);
  const emVista = useEmVista(ref, 0.2);
  const animado = m.observador;
  const fora = { opacity: 0, y: m.dist(56), rotate: m.dist(3) };
  const dentro = { opacity: 1, y: 0, rotate: 0 };

  return (
    <motion.li
      ref={ref}
      className="area"
      style={{ transformOrigin: "0% 100%" }}
      initial={animado ? fora : false}
      animate={!animado || emVista ? dentro : fora}
      transition={{ duration: m.dur(1.1), ease: EASE.enter, delay: m.reduzido ? 0 : escalonar(indice, 0.12) }}
    >
      <article className="cartao area__cartao">
        {area.icone && (
          <span className="area__icone">
            <Icone id={area.icone} tamanho={28} />
          </span>
        )}
        <h3>{area.titulo}</h3>
        <p>{area.texto}</p>
      </article>
    </motion.li>
  );
}

export function Areas() {
  const { conteudo } = useConfig();
  const dados = conteudo.areas;

  return (
    <section id="areas" className="secao" tabIndex={-1} aria-labelledby="titulo-areas">
      <div className="container">
        <TituloSecao id="titulo-areas" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />
        <ul className="areas__grade">
          {dados.itens.map((area, i) => (
            <CartaoArea key={area.titulo} area={area} indice={i} />
          ))}
        </ul>
        {dados.observacao && (
          <Reveal tipo="fade">
            <p className="areas__observacao">{dados.observacao}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
