import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { GlifoWhatsapp } from "./Glifos.tsx";
import "./BotaoWhatsapp.css";

// Botão flutuante discreto: só aparece depois que o hero saiu da tela.
export function BotaoWhatsapp() {
  const { contato, conteudo } = useConfig();
  const m = useMovimento();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const hero = document.getElementById("hero");
      const fimDoHero = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      setVisivel(window.scrollY > fimDoHero - window.innerHeight * 0.5);
    };
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
          aria-label={conteudo.rotulos.conversarWhatsapp}
          initial={{ opacity: 0, y: m.dist(16) }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: m.dist(16) }}
          transition={{ duration: m.dur(0.6), ease: EASE.enter }}
        >
          <GlifoWhatsapp tamanho={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
