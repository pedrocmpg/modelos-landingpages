import { createContext, useContext } from "react";
import type { SiteConfig } from "../config/types.ts";

export const ConfigContext = createContext<SiteConfig | null>(null);

/** Config do site. Componentes leem tudo daqui; nada é escrito neles. */
export function useConfig(): SiteConfig {
  const config = useContext(ConfigContext);
  if (!config) throw new Error("useConfig precisa estar dentro de <App config={...}>");
  return config;
}
