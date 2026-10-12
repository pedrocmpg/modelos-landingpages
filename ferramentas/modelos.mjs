// Descobre os modelos da raiz (pasta/NN-nome com src/config/site.config.ts) e lê o
// config de cada um. Compartilhado pelo gerador de og-image e pela vitrine.

import { existsSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const IGNORAR = new Set(["node_modules", "ferramentas", "vitrine"]);

const NICHOS = {
  "pet-shop": "Pet shop",
  psicologia: "Psicologia",
  fisioterapia: "Fisioterapia",
};

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Lê "pet-shop-01-acolhedor" -> { numero: "01", estilo: "Acolhedor" }. */
function partesDoNome(nome) {
  const m = nome.match(/-(\d+)-(.+)$/);
  return m ? { numero: m[1], estilo: capitalizar(m[2]) } : { numero: "", estilo: capitalizar(nome) };
}

/** Todos os modelos, em ordem de pasta. `filtro` (opcional) casa com parte do caminho. */
export async function listarModelos(filtro) {
  const modelos = [];
  for (const nichoDir of readdirSync(RAIZ, { withFileTypes: true })) {
    if (!nichoDir.isDirectory() || nichoDir.name.startsWith(".") || IGNORAR.has(nichoDir.name)) continue;
    for (const dir of readdirSync(join(RAIZ, nichoDir.name), { withFileTypes: true })) {
      const pasta = join(RAIZ, nichoDir.name, dir.name);
      const configPath = join(pasta, "src", "config", "site.config.ts");
      if (!dir.isDirectory() || !existsSync(join(pasta, "package.json")) || !existsSync(configPath)) continue;
      const caminho = `${nichoDir.name}/${dir.name}`;
      if (filtro && !caminho.includes(filtro)) continue;
      const { default: config } = await import(pathToFileURL(configPath).href);
      modelos.push({
        id: basename(pasta),
        caminho,
        pasta,
        nicho: NICHOS[nichoDir.name] ?? capitalizar(nichoDir.name.replace(/-/g, " ")),
        ...partesDoNome(dir.name),
        config,
      });
    }
  }
  return modelos;
}
