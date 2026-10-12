import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { pausarRolagem, retomarRolagem } from "../lib/scroll.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { GlifoFechar, GlifoMenu } from "./Glifos.tsx";
import { Icone } from "./Icone.tsx";
import "./Header.css";

export function Header() {
  const { negocio, contato, conteudo, secoes } = useConfig();
  const { rotulos } = conteudo;
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
      initial={m.observador ? { y: "-100%" } : false}
      animate={{ y: 0 }}
      transition={{ duration: m.dur(0.7), ease: EASE.enter }}
    >
      <div className="header__fundo" aria-hidden="true" />
      <div className="container header__barra">
        <a href="#hero" className="header__marca" onClick={fechar}>
          <span className="header__logo">
            <Icone id="pata" tamanho={28} />
          </span>
          <span className="header__nome">{negocio.nome}</span>
        </a>

        <nav className="header__nav" aria-label={rotulos.menuPrincipal}>
          {links.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="link-sublinhado header__link">
              {s.menu}
            </a>
          ))}
          <a
            href={whatsappUrl(contato)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primario btn--brilho header__cta"
          >
            {rotulos.agendar}
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
            initial={m.reduzido ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={m.reduzido ? { opacity: 1 } : { clipPath: "inset(0 0 -40px 0)" }}
            exit={m.reduzido ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: m.dur(0.45), ease: EASE.inOut }}
          >
            {links.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                className="header__painel-link"
                onClick={fechar}
                initial={m.reduzido ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: m.dur(0.45), ease: EASE.enter, delay: 0.08 + i * 0.05 }}
              >
                {s.menu}
              </motion.a>
            ))}
            <a
              href={whatsappUrl(contato)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primario header__painel-cta"
              onClick={fechar}
            >
              {rotulos.agendarWhatsapp}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
