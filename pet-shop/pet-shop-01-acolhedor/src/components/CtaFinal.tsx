import { useRef } from "react";
import { motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { GlifoWhatsapp } from "./Glifos.tsx";
import "./CtaFinal.css";

export function CtaFinal() {
  const { conteudo, contato } = useConfig();
  const dados = conteudo.ctaFinal;
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.3);
  if (!dados) return null;

  const animado = m.observador;
  const fechado = m.reduzido ? { opacity: 0 } : { clipPath: "inset(50% 50% 50% 50%)" };
  const aberto = m.reduzido ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" };

  return (
    <section id="ctaFinal" className="secao cta-final" tabIndex={-1}>
      <div className="container">
        <div ref={ref}>
          <motion.div
            className="cta-final__quadro"
            initial={animado ? fechado : false}
            animate={!animado || emVista ? aberto : fechado}
            transition={{ duration: m.dur(0.9), ease: EASE.inOut }}
          >
            <h2>{dados.titulo}</h2>
            {dados.texto && <p>{dados.texto}</p>}
            <a
              href={whatsappUrl(contato)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--contorno btn--brilho cta-final__botao"
            >
              <GlifoWhatsapp />
              {dados.botao}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
