import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { GlifoWhatsapp } from "./Glifos.tsx";
import { Palavras } from "./Palavras.tsx";
import { SeloExemplo } from "./SeloExemplo.tsx";
import "./Hero.css";

export function Hero() {
  const { conteudo, imagens, contato, secoes } = useConfig();
  const hero = conteudo.hero;
  const m = useMovimento();
  const secaoRef = useRef<HTMLElement>(null);

  // Parallax curto (máx. 20 px). Com movimento reduzido, dist() devolve 0.
  const { scrollYProgress } = useScroll({ target: secaoRef, offset: ["start start", "end start"] });
  const yFoto = useTransform(scrollYProgress, [0, 1], [0, -m.dist(20)]);
  const yHalo = useTransform(scrollYProgress, [0, 1], [0, m.dist(20)]);

  const alvo = secoes.find((s) => s.id === hero.ctaSecundario.secao && s.ativo);

  const entrada = (atraso: number) => ({
    initial: m.observador ? { opacity: 0, y: m.dist(12) } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: m.dur(1), ease: EASE.enter, delay: m.reduzido ? 0 : atraso },
  });

  return (
    <section id="hero" ref={secaoRef} className="secao hero" tabIndex={-1}>
      <div className="container hero__grade">
        <div className="hero__texto">
          {hero.selo && (
            <motion.p className="eyebrow hero__selo" {...entrada(0)}>
              {hero.selo}
            </motion.p>
          )}

          <Palavras como="h1" texto={hero.titulo} imediato atraso={0.15} className="hero__titulo" />

          <motion.p className="hero__subtitulo" {...entrada(0.7)}>
            {hero.subtitulo}
          </motion.p>

          <motion.div className="opcoes" {...entrada(0.85)}>
            <a href={whatsappUrl(contato)} target="_blank" rel="noopener noreferrer" className="btn">
              <GlifoWhatsapp />
              {hero.ctaPrimario}
            </a>
            {alvo && (
              <a href={`#${alvo.id}`} className="btn">
                {hero.ctaSecundario.texto}
              </a>
            )}
          </motion.div>
        </div>

        <div className="hero__visual">
          <motion.div aria-hidden="true" className="hero__halo-paralaxe" style={m.reduzido ? undefined : { y: yHalo }}>
            <div className="hero__halo" />
          </motion.div>

          <motion.div
            className="hero__foto-paralaxe"
            style={m.reduzido ? undefined : { y: yFoto }}
            initial={m.observador ? { opacity: 0, scale: m.reduzido ? 1 : 0.94 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: m.dur(1.2), ease: EASE.enter, delay: m.reduzido ? 0 : 0.3 }}
          >
            {/* A "respiração" (escala 1 -> 1.04 -> 1, ciclo de 8 s) fica num elemento só dela. */}
            <motion.div
              className="hero__respira"
              animate={m.loops ? { scale: [1, 1.04, 1] } : undefined}
              transition={{ duration: 8, ease: EASE.sine, repeat: Infinity }}
            >
              <div className="hero__organica">
                <img
                  src={imagens.hero.src}
                  alt={imagens.hero.alt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              {imagens.hero.exemplo && (
                <span className="hero__selo-foto">
                  <SeloExemplo />
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
