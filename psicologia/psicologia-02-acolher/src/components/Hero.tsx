import { motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { preenchido, whatsappUrl } from "../config/links.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { Foto } from "./Foto.tsx";
import { GlifoWhatsapp } from "./Glifos.tsx";
import { Linhas } from "./Linhas.tsx";
import "./Hero.css";

export function Hero() {
  const { conteudo, imagens, contato, secoes } = useConfig();
  const hero = conteudo.hero;
  const m = useMovimento();

  const alvo = secoes.find((s) => s.id === hero.ctaSecundario.secao && s.ativo);

  const entrada = (atraso: number) => ({
    initial: m.observador ? { opacity: 0, y: m.dist(16) } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: m.dur(0.9), ease: EASE.enter, delay: m.reduzido ? 0 : atraso },
  });

  return (
    <section id="hero" className="secao hero" tabIndex={-1}>
      <div className="container hero__grade">
        <div className="hero__texto">
          {hero.selo && (
            <motion.p className="eyebrow" {...entrada(0)}>
              {hero.selo}
            </motion.p>
          )}

          <Linhas como="h1" texto={hero.titulo} imediato atraso={0.15} className="hero__titulo" />

          <motion.p className="hero__subtitulo" {...entrada(0.7)}>
            {hero.subtitulo}
          </motion.p>

          {preenchido(hero.citacao) && (
            <motion.p className="hero__citacao" {...entrada(0.85)}>
              {hero.citacao}
            </motion.p>
          )}

          <motion.div className="opcoes" {...entrada(1)}>
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
          <motion.span
            aria-hidden="true"
            className="hero__anel"
            initial={m.observador ? { opacity: 0, scale: m.reduzido ? 1 : 0.9 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: m.dur(1.2), ease: EASE.enter, delay: m.reduzido ? 0 : 0.5 }}
          />
          <Foto imagem={imagens.hero} proporcao="3 / 4.2" posicao="center 55%" prioritaria atraso={0.25} className="hero__arco" />
        </div>
      </div>
    </section>
  );
}
