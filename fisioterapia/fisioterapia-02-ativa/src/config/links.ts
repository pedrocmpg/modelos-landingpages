// Links montados a partir do config. Funções puras: usadas pelos componentes,
// pelo plugin do Vite (fallback sem JavaScript) e pelos testes.

import type { Contato } from "./types.ts";

const soDigitos = (valor: string) => valor.replace(/\D/g, "");

/** Link wa.me com a mensagem inicial codificada. */
export function whatsappUrl(contato: Contato): string {
  return `https://wa.me/${soDigitos(contato.whatsapp)}?text=${encodeURIComponent(
    contato.mensagemWhatsapp,
  )}`;
}

/** tel: a partir do telefone exibido. Acrescenta 55 se o número não tiver DDI. */
export function telHref(telefoneExibicao: string): string {
  const digitos = soDigitos(telefoneExibicao);
  const comDdi = digitos.length <= 11 ? `55${digitos}` : digitos;
  return `tel:+${comDdi}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`;
}

/** "https://instagram.com/perfil/" -> "@perfil". Se não der, devolve o host+caminho. */
export function nomeDoPerfil(url: string): string {
  try {
    const u = new URL(url);
    const caminho = u.pathname.replace(/^\/+|\/+$/g, "");
    return caminho ? `@${caminho.split("/")[0]}` : u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Remove campos opcionais vazios ("" ou só espaços) para o bloco sumir. */
export function preenchido(valor: string | undefined | null): valor is string {
  return typeof valor === "string" && valor.trim().length > 0;
}
