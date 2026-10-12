import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { Faixa } from "./Faixa.tsx";
import { Foto } from "./Foto.tsx";
import { GlifoWhatsapp } from "./Glifos.tsx";
import { Reveal } from "./Reveal.tsx";
import { Titulo } from "./Titulo.tsx";
import "./Hero.css";

export function Hero() {
  const { conteudo, contato, imagens, secoes } = useConfig();
  const hero = conteudo.hero;
  const alvo = secoes.find((s) => s.id === hero.ctaSecundario.secao && s.ativo);

  return (
    <section id="hero" className="hero" tabIndex={-1} aria-labelledby="titulo-hero">
      <div className="container hero__grade">
        <div className="hero__texto">
          {hero.selo && (
            <Reveal tipo="fade">
              <p className="hero__selo">{hero.selo}</p>
            </Reveal>
          )}
          <Titulo como="h1" id="titulo-hero" texto={hero.titulo} imediato atraso={0.1} className="hero__titulo" />
          <Reveal atraso={0.35}>
            <p className="hero__subtitulo">{hero.subtitulo}</p>
          </Reveal>
          <Reveal atraso={0.5}>
            <div className="acoes hero__acoes">
              <a href={whatsappUrl(contato)} target="_blank" rel="noopener noreferrer" className="btn">
                <GlifoWhatsapp />
                {hero.ctaPrimario}
              </a>
              {alvo && (
                <a href={`#${alvo.id}`} className="btn btn--contorno">
                  {hero.ctaSecundario.texto}
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <div className="hero__visual">
          <Foto imagem={imagens.hero} proporcao="4 / 5" posicao="center 40%" prioritaria atraso={0.2} className="hero__foto" />
        </div>
      </div>
      <Faixa />
    </section>
  );
}
