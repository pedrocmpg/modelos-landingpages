import { useEffect } from "react";
import type { SiteConfig } from "../config/types.ts";
import { temaCss } from "../config/theme.ts";

// O plugin do Vite já escreve título, idioma e tema no HTML estático. Aqui o
// app mantém os três em sincronia em runtime (dev com HMR, testes, trocas de config).
export function useDocumentHead(config: SiteConfig) {
  const { meta, tema } = config;

  useEffect(() => {
    document.title = meta.title;
    document.documentElement.lang = meta.lang;

    let estilo = document.getElementById("tema");
    if (!estilo) {
      estilo = document.createElement("style");
      estilo.id = "tema";
      document.head.appendChild(estilo);
    }
    estilo.textContent = temaCss(tema);
  }, [meta.title, meta.lang, tema]);
}
