// Ícones do site, gerados no build a partir de tema.cores.primaria:
//   favicon.svg (circular), favicon-32.png (32x32) e apple-touch-icon.png (180x180, quadrado,
//   porque o iOS arredonda os cantos sozinho). Troque a cor primária no config e o próximo
//   build já sai com os ícones novos; não há arquivo de ícone para editar.

import type { SiteConfig } from "./types.ts";

export const NOMES_ICONES = ["favicon.svg", "favicon-32.png", "apple-touch-icon.png"] as const;
export type NomeIcone = (typeof NOMES_ICONES)[number];

function canal(hex: string, inicio: number): number {
  const c = parseInt(hex.slice(inicio, inicio + 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminancia(hex: string): number {
  return 0.2126 * canal(hex, 1) + 0.7152 * canal(hex, 3) + 0.0722 * canal(hex, 5);
}

function razao(a: string, b: string): number {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}

/** Branco ou quase preto, o que tiver mais contraste com a cor primária. */
export function corSobre(primaria: string): string {
  return razao(primaria, "#FFFFFF") >= razao(primaria, "#14181C") ? "#FFFFFF" : "#14181C";
}

function marca(contraste: string, escala: number): string {
  const r = 15 * escala;
  return (
    `<circle cx="32" cy="32" r="${r}" fill="none" stroke="${contraste}" stroke-width="4.5"/>` +
    `<circle cx="32" cy="32" r="${5 * escala}" fill="${contraste}"/>`
  );
}

function validar(primaria: string): void {
  if (!/^#[0-9a-fA-F]{6}$/.test(primaria)) {
    throw new Error(`tema.cores.primaria ("${primaria}") precisa ser um hexadecimal #RRGGBB para gerar os ícones`);
  }
}

export function faviconSvg(primaria: string): string {
  validar(primaria);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<circle cx="32" cy="32" r="32" fill="${primaria}"/>${marca(corSobre(primaria), 1)}</svg>`
  );
}

export function appleTouchSvg(primaria: string): string {
  validar(primaria);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect width="64" height="64" fill="${primaria}"/>${marca(corSobre(primaria), 0.85)}</svg>`
  );
}

/** Os três arquivos prontos. O sharp só é carregado aqui (build/dev), nunca no navegador. */
export async function gerarIcones(config: SiteConfig): Promise<Record<NomeIcone, string | Uint8Array>> {
  const { primaria } = config.tema.cores;
  const { default: sharp } = await import("sharp");
  const favicon = faviconSvg(primaria);
  const png32 = await sharp(Buffer.from(favicon)).resize(32, 32).png({ compressionLevel: 9 }).toBuffer();
  const png180 = await sharp(Buffer.from(appleTouchSvg(primaria))).resize(180, 180).png({ compressionLevel: 9 }).toBuffer();
  return { "favicon.svg": favicon, "favicon-32.png": png32, "apple-touch-icon.png": png180 };
}
