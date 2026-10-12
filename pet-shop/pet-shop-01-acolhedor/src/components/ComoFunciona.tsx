import { useRef } from "react";
import { motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { Icone } from "./Icone.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./ComoFunciona.css";

export function ComoFunciona() {
  const { conteudo } = useConfig();
  const dados = conteudo.comoFunciona;
  const m = useMovimento();
  const ref = useRef<HTMLOListElement>(null);
  const emVista = useEmVista(ref, 0.25);
  if (!dados) return null;

  const animado = m.observador;
  const aberto = !animado || emVista;

  return (
    <section id="comoFunciona" className="secao secao--superficie" tabIndex={-1} aria-labelledby="titulo-como-funciona">
      <div className="container">
        <TituloSecao
          id="titulo-como-funciona"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
          centralizado
        />

        <ol ref={ref} className="passos">
          {dados.itens.map((passo, i) => {
            const oculto = m.reduzido ? { opacity: 0 } : { opacity: 0, scale: m.suave ? 0.94 : 0.85, y: m.dist(18) };
            return (
              <motion.li
                key={passo.titulo}
                className="passo"
                initial={animado ? oculto : false}
                animate={aberto ? { opacity: 1, scale: 1, y: 0 } : oculto}
                transition={{ duration: m.dur(0.65), ease: EASE.pop, delay: m.reduzido ? 0 : i * 0.22 }}
              >
                <div className="passo__marca">
                  <span className="passo__numero" aria-hidden="true">
                    {i + 1}
                  </span>
                  {i < dados.itens.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      className="passo__linha"
                      initial={animado && !m.reduzido ? { scaleX: 0 } : false}
                      animate={{ scaleX: aberto ? 1 : 0 }}
                      transition={{ duration: m.dur(0.7), ease: EASE.inOut, delay: i * 0.22 + 0.35 }}
                    />
                  )}
                </div>
                <div className="passo__corpo">
                  {passo.icone && (
                    <span className="icone-chip">
                      <Icone id={passo.icone} />
                    </span>
                  )}
                  <h3>{passo.titulo}</h3>
                  <p>{passo.texto}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
