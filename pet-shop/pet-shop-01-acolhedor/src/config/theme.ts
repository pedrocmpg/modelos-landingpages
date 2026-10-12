// Tema a partir do config: variáveis CSS do :root e link do Google Fonts.
// Funções puras, sem React: usadas pelo app, pelo plugin do Vite e nos testes.

import type { Fonte, Tema } from "./types.ts";

/** Fontes que nenhum modelo deste repositório pode usar. */
export const FONTES_PROIBIDAS = [
  "Inter",
  "Roboto",
  "Arial",
  "Open Sans",
  "Poppins",
  "Montserrat",
] as const;

export function fonteProibida(familia: string): boolean {
  const alvo = familia.trim().toLowerCase();
  return FONTES_PROIBIDAS.some((f) => f.toLowerCase() === alvo);
}

const PILHAS: Record<Fonte["fallback"], string> = {
  serif: "Georgia, serif",
  "sans-serif": "system-ui, sans-serif",
  cursive: "cursive",
  monospace: "ui-monospace, monospace",
};

export function pilhaDeFonte(fonte: Fonte): string {
  return `"${fonte.familia}", ${PILHAS[fonte.fallback]}`;
}

function parametroDaFamilia(fonte: Fonte): string {
  const nome = fonte.familia.trim().replace(/\s+/g, "+");
  const pesos = [...new Set(fonte.pesos)].sort((a, b) => a - b);
  if (fonte.italico) {
    const eixos = [
      ...pesos.map((p) => `0,${p}`),
      ...pesos.map((p) => `1,${p}`),
    ].join(";");
    return `family=${nome}:ital,wght@${eixos}`;
  }
  return `family=${nome}:wght@${pesos.join(";")}`;
}

/** URL do CSS do Google Fonts com todas as famílias do tema (sem repetir). */
export function googleFontsHref(tema: Tema): string {
  const { titulo, texto, destaque } = tema.fontes;
  const vistas = new Set<string>();
  const parametros: string[] = [];
  for (const fonte of [titulo, texto, destaque]) {
    if (!fonte || vistas.has(fonte.familia)) continue;
    vistas.add(fonte.familia);
    parametros.push(parametroDaFamilia(fonte));
  }
  return `https://fonts.googleapis.com/css2?${parametros.join("&")}&display=swap`;
}

/** Bloco :root com todas as variáveis do tema. */
export function temaCss(tema: Tema): string {
  const { cores, fontes, raio } = tema;
  const linhas = [
    `--cor-primaria:${cores.primaria}`,
    `--cor-secundaria:${cores.secundaria}`,
    `--cor-destaque:${cores.destaque}`,
    `--cor-fundo:${cores.fundo}`,
    `--cor-superficie:${cores.superficie}`,
    `--cor-texto:${cores.texto}`,
    `--cor-texto-secundario:${cores.textoSecundario}`,
    `--cor-escuro:${cores.escuro}`,
    `--fonte-titulo:${pilhaDeFonte(fontes.titulo)}`,
    `--fonte-texto:${pilhaDeFonte(fontes.texto)}`,
    `--fonte-destaque:${pilhaDeFonte(fontes.destaque ?? fontes.titulo)}`,
    `--raio-cartao:${raio.cartao}px`,
    `--raio-cartao-pequeno:${Math.round(raio.cartao * 0.75)}px`,
    `--raio-botao:${raio.botao}px`,
  ];
  return `:root{${linhas.join(";")}}`;
}
