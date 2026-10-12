import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { EASE, escalonar, useMovimento } from "../motion/tokens.ts";
import { GlifoMais } from "./Glifos.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Faq.css";

export function Faq() {
  const { conteudo } = useConfig();
  const dados = conteudo.faq;
  const m = useMovimento();
  const base = useId();
  const [abertos, setAbertos] = useState<Set<number>>(() => new Set([0]));

  const alternar = (i: number) =>
    setAbertos((atual) => {
      const novo = new Set(atual);
      if (novo.has(i)) novo.delete(i);
      else novo.add(i);
      return novo;
    });

  // O layout muda de uma vez; só opacity e clip-path animam a resposta.
  const fechado = m.reduzido ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" };
  const aberto = m.reduzido ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" };

  return (
    <section id="faq" className="secao" tabIndex={-1} aria-labelledby="titulo-faq">
      <div className="container faq__layout">
        <TituloSecao id="titulo-faq" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />

        <ul className="faq__lista">
          {dados.itens.map((item, i) => {
            const estaAberto = abertos.has(i);
            const idBotao = `${base}-p${i}`;
            const idPainel = `${base}-r${i}`;
            return (
              <Reveal key={item.pergunta} as="li" atraso={escalonar(i, 0.08)}>
                <div className={`faq__item cartao${estaAberto ? " faq__item--aberto" : ""}`}>
                  <h3 className="faq__pergunta">
                    <button
                      id={idBotao}
                      type="button"
                      className="faq__botao"
                      aria-expanded={estaAberto}
                      aria-controls={idPainel}
                      onClick={() => alternar(i)}
                    >
                      <span>{item.pergunta}</span>
                      <span className="faq__icone">
                        <GlifoMais />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {estaAberto && (
                      <motion.div
                        id={idPainel}
                        role="region"
                        aria-labelledby={idBotao}
                        className="faq__resposta"
                        initial={fechado}
                        animate={aberto}
                        exit={fechado}
                        transition={{ duration: m.dur(0.6), ease: EASE.inOut }}
                      >
                        <p>{item.resposta}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
