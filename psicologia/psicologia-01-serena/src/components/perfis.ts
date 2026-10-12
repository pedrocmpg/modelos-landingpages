import type { ComponentType } from "react";
import type { Redes } from "../config/types.ts";
import { preenchido } from "../config/links.ts";
import { GlifoFacebook, GlifoInstagram } from "./Glifos.tsx";

export interface Perfil {
  url: string;
  Glifo: ComponentType<{ tamanho?: number }>;
}

/** Redes sociais preenchidas no config (vazias não aparecem). */
export function perfisSociais(redes: Redes): Perfil[] {
  const perfis: Perfil[] = [];
  if (preenchido(redes.instagram)) perfis.push({ url: redes.instagram, Glifo: GlifoInstagram });
  if (preenchido(redes.facebook)) perfis.push({ url: redes.facebook, Glifo: GlifoFacebook });
  return perfis;
}
