import { Fragment, useId, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { ContadorAnimado } from "./ContadorAnimado.tsx";
import { Faixa } from "./Faixa.tsx";
import { Foto } from "./Foto.tsx";
import { GlifoWhatsapp } from "./Glifos.tsx";
import { Icone } from "./Icone.tsx";
import { TextoEmCirculo } from "./Marca.tsx";
import { NomeGigante } from "./NomeGigante.tsx";
import { SeloExemplo } from "./SeloExemplo.tsx";
import "./Hero.css";

export function Hero() {
  const { conteudo, imagens, contato, secoes, negocio } = useConfig();
  const hero = conteudo.hero;
  const nota = conteudo.depoimentos?.nota;
  const m = useMovimento();
  const secaoRef = useRef<HTMLElement>(null);
  const idCirculo = useId();

  // Parallax leve (some com movimento reduzido: dist() devolve 0).
  const { scrollYProgress } = useScroll({ target: secaoRef, offset: ["start start", "end start"] });
  const yArco = useTransform(scrollYProgress, [0, 1], [0, -m.dist(60)]);

  const palavras = hero.titulo.split(" ");
  const alvoSecundario = hero.ctaSecundario
    ? secoes.find((s) => s.id === hero.ctaSecundario!.secao && s.ativo)
    : undefined;

  const espera = (atraso: number) => (m.reduzido ? 0 : atraso + m.abertura);
  const entrada = (atraso: number) => ({
    initial: m.observador ? { opacity: 0, y: m.dist(22) } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: m.dur(0.7), ease: EASE.enter, delay: espera(atraso) },
  });

  return (
    <>
      <section id="hero" ref={secaoRef} className="secao hero" tabIndex={-1}>
        <div className="container hero__grade">
          <div className="hero__texto">
            {hero.selo && (
              <motion.p className="hero__selo" {...entrada(0)}>
                {hero.selo}
              </motion.p>
            )}

            <h1 className="hero__titulo">
              {palavras.map((palavra, i) => (
                <Fragment key={i}>
                  <span className="hero__palavra">
                    <motion.span
                      className="hero__palavra-interna"
                      initial={m.observador ? (m.reduzido ? { opacity: 0 } : { y: "112%" }) : false}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: m.dur(0.75),
                        ease: EASE.enter,
                        delay: espera(0.12 + i * 0.06),
                      }}
                    >
                      {palavra}
                    </motion.span>
                  </span>
                  {i < palavras.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h1>

            <motion.p className="hero__subtitulo" {...entrada(0.5)}>
              {hero.subtitulo}
            </motion.p>

            <motion.div className="hero__acoes" {...entrada(0.6)}>
              <a
                href={whatsappUrl(contato)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--escuro btn--brilho"
              >
                <GlifoWhatsapp />
                {hero.ctaPrimario}
              </a>
              {hero.ctaSecundario && alvoSecundario && (
                <a href={`#${alvoSecundario.id}`} className="btn btn--contorno">
                  {hero.ctaSecundario.texto}
                </a>
              )}
            </motion.div>
          </div>

          <div className="hero__visual">
            {nota && (
              <motion.div
                className="hero__pendurado"
                initial={m.observador ? { opacity: 0, y: m.reduzido ? 0 : "-70%" } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: m.dur(1), ease: EASE.pop, delay: espera(0.7) }}
              >
                <div className="hero__placa">
                  <span className="hero__placa-furo" aria-hidden="true" />
                  <span aria-hidden="true" className="hero__placa-estrelas">
                    ★★★★★
                  </span>
                  <p className="hero__placa-valor">
                    <ContadorAnimado valor={nota.valor} decimais={1} />
                  </p>
                  <p className="hero__placa-rotulo">
                    <ContadorAnimado valor={nota.total} /> {nota.rotulo}
                  </p>
                  {nota.exemplo && <SeloExemplo />}
                </div>
              </motion.div>
            )}

            <motion.div className="hero__arco" style={m.reduzido ? undefined : { y: yArco }}>
              <Foto
                imagem={imagens.hero}
                proporcao="4 / 5"
                posicao="center 18%"
                prioritaria
                atraso={m.reduzido ? 0 : 0.2 + m.abertura}
                className="hero__foto"
              />
              {hero.anotacao && (
                <motion.div
                  className="hero__selo-giratorio"
                  initial={m.observador ? { opacity: 0, scale: m.reduzido ? 1 : 0.4 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: m.dur(0.7), ease: EASE.pop, delay: espera(0.95) }}
                >
                  <TextoEmCirculo texto={hero.anotacao} id={`c${idCirculo.replace(/:/g, "")}`} />
                  <span className="hero__selo-pata" aria-hidden="true">
                    <Icone id="pata" tamanho={34} />
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        <NomeGigante texto={negocio.nome} className="hero__nome" />
      </section>
      <Faixa />
    </>
  );
}
