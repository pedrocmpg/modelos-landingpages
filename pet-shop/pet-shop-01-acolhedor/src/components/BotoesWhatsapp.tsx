import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { GlifoWhatsapp } from "./Glifos.tsx";
import "./BotoesWhatsapp.css";

// Barra fixa no rodapé do celular: o "Agendar pelo WhatsApp" sempre à mão.
export function BarraWhatsapp() {
  const { contato, conteudo } = useConfig();
  const m = useMovimento();

  return (
    <motion.div
      className="barra-whatsapp"
      initial={m.observador ? { y: "110%" } : false}
      animate={{ y: 0 }}
      transition={{ duration: m.dur(0.6), ease: EASE.enter, delay: m.reduzido ? 0 : 0.6 }}
    >
      <a
        href={whatsappUrl(contato)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primario btn--brilho barra-whatsapp__botao"
      >
        <GlifoWhatsapp tamanho={24} />
        {conteudo.rotulos.agendarWhatsapp}
      </a>
    </motion.div>
  );
}

// Botão redondo flutuante, só em telas maiores (no celular vale a barra).
export function BotaoWhatsappFlutuante() {
  const { contato, conteudo } = useConfig();
  const m = useMovimento();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 400);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.a
          href={whatsappUrl(contato)}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-flutuante"
          aria-label={conteudo.rotulos.agendarWhatsapp}
          initial={{ opacity: 0, scale: m.reduzido ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: m.reduzido ? 1 : 0.6 }}
          transition={{ duration: m.dur(0.45), ease: EASE.pop }}
        >
          {m.loops && (
            <motion.span
              aria-hidden="true"
              className="whatsapp-flutuante__onda"
              animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: EASE.enter, repeatDelay: 0.6 }}
            />
          )}
          <GlifoWhatsapp tamanho={30} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
