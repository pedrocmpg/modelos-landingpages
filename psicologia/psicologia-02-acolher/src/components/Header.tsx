import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { pausarRolagem, retomarRolagem } from "../lib/scroll.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { GlifoFechar, GlifoMenu } from "./Glifos.tsx";
import "./Header.css";

export function Header() {
  const { negocio, contato, conteudo, secoes } = useConfig();
  const { rotulos } = conteudo;
  const registro = negocio.registroProfissional;
  const m = useMovimento();
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const botaoMenu = useRef<HTMLButtonElement>(null);

  const links = secoes.filter((s) => s.ativo && s.menu);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!menuAberto) return;
    pausarRolagem();
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuAberto(false);
        botaoMenu.current?.focus();
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      retomarRolagem();
    };
  }, [menuAberto]);

  const fechar = () => setMenuAberto(false);

  return (
    <motion.header
      className="header"
      data-rolou={rolou || menuAberto ? "" : undefined}
      initial={m.observador ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: m.dur(0.9), ease: EASE.enter }}
    >
      <div className="header__fundo" aria-hidden="true" />
      <div className="container header__barra">
        <a href="#hero" className="header__marca" onClick={fechar}>
          <span className="header__nome">{negocio.nome}</span>
          <span className="header__registro">
            {registro.conselho} {registro.numero}
          </span>
        </a>

        <nav className="header__nav" aria-label={rotulos.menuPrincipal}>
          {links.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="link-sublinhado header__link">
              {s.menu}
            </a>
          ))}
          <a href={whatsappUrl(contato)} target="_blank" rel="noopener noreferrer" className="btn header__cta">
            {rotulos.conversarWhatsapp}
          </a>
        </nav>

        <button
          ref={botaoMenu}
          type="button"
          className="header__toggle"
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? rotulos.menuFechar : rotulos.menuAbrir}
        >
          {menuAberto ? <GlifoFechar /> : <GlifoMenu />}
        </button>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.nav
            id="menu-mobile"
            className="header__painel"
            aria-label={rotulos.menuPrincipal}
            initial={m.reduzido ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={m.reduzido ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: m.dur(0.5), ease: EASE.enter }}
          >
            {links.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="header__painel-link" onClick={fechar}>
                {s.menu}
              </a>
            ))}
            <a
              href={whatsappUrl(contato)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn header__painel-cta"
              onClick={fechar}
            >
              {rotulos.conversarWhatsapp}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
