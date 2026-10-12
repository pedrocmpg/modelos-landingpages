import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { ContadorAnimado } from "./ContadorAnimado.tsx";
import { Foto } from "./Foto.tsx";
import { GlifoWhatsapp } from "./Glifos.tsx";
import { SeloExemplo } from "./SeloExemplo.tsx";
import "./Hero.css";

export function Hero() {
  const { conteudo, imagens, contato, secoes } = useConfig();
  const hero = conteudo.hero;
  const nota = conteudo.depoimentos?.nota;
  const m = useMovimento();
  const secaoRef = useRef<HTMLElement>(null);

  // Parallax leve (some com movimento reduzido: dist() devolve 0).
  const { scrollYProgress } = useScroll({ target: secaoRef, offset: ["start start", "end start"] });
  const yFoto = useTransform(scrollYProgress, [0, 1], [0, -m.dist(36)]);
  const yMancha = useTransform(scrollYProgress, [0, 1], [0, -m.dist(70)]);

  const palavras = hero.titulo.split(" ");
  const alvoSecundario = hero.ctaSecundario
    ? secoes.find((s) => s.id === hero.ctaSecundario!.secao && s.ativo)
    : undefined;

  const entrada = (atraso: number) => ({
    initial: m.observador ? { opacity: 0, y: m.dist(22) } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: m.dur(0.7), ease: EASE.enter, delay: m.reduzido ? 0 : atraso },
  });

  return (
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
                      delay: m.reduzido ? 0 : 0.15 + i * 0.06,
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
              className="btn btn--primario btn--brilho"
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

          {nota && (
            <motion.p className="hero__nota" {...entrada(0.7)}>
              <span aria-hidden="true" className="hero__estrelas">
                ★★★★★
              </span>
              <span>
                <ContadorAnimado valor={nota.valor} decimais={1} /> ·{" "}
                <ContadorAnimado valor={nota.total} /> {nota.rotulo}
              </span>
              {nota.exemplo && <SeloExemplo />}
            </motion.p>
          )}
        </div>

        <div className="hero__visual">
          <motion.div
            aria-hidden="true"
            className="hero__mancha-paralaxe"
            style={m.reduzido ? undefined : { y: yMancha }}
          >
            <motion.div
              className="hero__mancha"
              initial={m.observador ? { opacity: 0, scale: m.reduzido ? 1 : 0.6 } : false}
              animate={
                m.loops
                  ? { opacity: 1, scale: 1, y: [0, -10, 0] }
                  : { opacity: 1, scale: 1 }
              }
              transition={{
                opacity: { duration: m.dur(0.8), delay: 0.2 },
                scale: { duration: m.dur(1), ease: EASE.pop, delay: 0.2 },
                y: { duration: 7, repeat: Infinity, ease: EASE.sine, delay: 1.4 },
              }}
            />
          </motion.div>

          <motion.div className="hero__foto" style={m.reduzido ? undefined : { y: yFoto }}>
            <Foto imagem={imagens.hero} proporcao="1 / 1" posicao="center 15%" prioritaria atraso={0.25} />

            {hero.anotacao && (
              <motion.p
                aria-hidden="true"
                className="hero__anotacao"
                initial={
                  m.observador
                    ? { opacity: 0, scale: m.reduzido ? 1 : 0.5, rotate: m.reduzido ? -8 : -24 }
                    : false
                }
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: m.dur(0.7), ease: EASE.pop, delay: m.reduzido ? 0 : 0.95 }}
              >
                {hero.anotacao}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
