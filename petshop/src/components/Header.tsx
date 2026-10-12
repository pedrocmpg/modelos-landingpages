import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { business, nav } from "../content";

function PawLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
      <g fill="var(--color-gold)">
        <ellipse cx="22" cy="22" rx="5" ry="6.5" />
        <ellipse cx="42" cy="22" rx="5" ry="6.5" />
        <ellipse cx="14" cy="34" rx="4.5" ry="6" />
        <ellipse cx="50" cy="34" rx="4.5" ry="6" />
        <path d="M32 32c8 0 14 6 14 12.5S40.5 52 32 52s-14-3.5-14-7.5S24 32 32 32z" />
      </g>
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255, 246, 229, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 4px 20px rgba(43, 29, 20, 0.08)" : "none",
        transition: "background 0.35s var(--ease-enter), box-shadow 0.35s var(--ease-enter), height 0.35s var(--ease-enter)",
        height: scrolled ? "var(--header-height-scrolled)" : "var(--header-height)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 19,
          }}
        >
          <PawLogo />
          {business.name}
        </a>

        <nav
          style={{ display: "flex", alignItems: "center", gap: 32 }}
          className="header-nav-desktop"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline"
              style={{ fontWeight: 600, fontSize: 15 }}
            >
              {item.label}
            </a>
          ))}
          <a href="#contato" className="btn btn-primary btn-shine">
            Agendar
          </a>
        </nav>

        <button
          type="button"
          className="header-nav-mobile-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M5 5l14 14M19 5L5 19"
                stroke="var(--color-text)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="var(--color-text)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <motion.nav
          id="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="header-nav-mobile-panel"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--color-cream)",
            boxShadow: "0 12px 24px rgba(43,29,20,0.12)",
            padding: "16px 20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "12px 4px",
                fontWeight: 600,
                fontSize: 16,
                minHeight: 44,
                display: "flex",
                alignItems: "center",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary"
            style={{ marginTop: 8, width: "100%" }}
          >
            Agendar
          </a>
        </motion.nav>
      )}
    </motion.header>
  );
}
