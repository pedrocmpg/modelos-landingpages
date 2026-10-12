// Gera, para cada modelo, a partir de uma captura do hero (Playwright + Chrome):
//   <modelo>/public/og-image.png     1200x630, < 300 KB, com o título do cartão (meta.ogTitle)
//   vitrine/capturas/<modelo>.jpg    captura limpa do hero, para a vitrine
//
// Uso (na pasta ferramentas/):  node gerar-og.mjs [filtro]
//   ex.: node gerar-og.mjs fisioterapia-02
// Chrome: CHROME_PATH ou o caminho padrão do Windows abaixo.
// Os dados são só os do config (fictícios): nada é capturado de sites reais.

import { execFileSync } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { RAIZ, listarModelos } from "./modelos.mjs";

const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const LIMITE_OG = 300 * 1024;
const MARGEM_OG = 285 * 1024;
const ESPERA_ANIMACOES_MS = 5500;
const SAIDA_VITRINE = join(RAIZ, "vitrine", "capturas");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

function construir(pasta) {
  execFileSync("npx vite build --logLevel error", { cwd: pasta, shell: true, stdio: "pipe" });
}

function servir(dist) {
  const servidor = createServer((req, res) => {
    const caminho = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let arquivo = normalize(join(dist, caminho));
    if (!arquivo.startsWith(dist)) {
      res.writeHead(403).end();
      return;
    }
    if (!existsSync(arquivo) || statSync(arquivo).isDirectory()) arquivo = join(dist, "index.html");
    res.writeHead(200, { "Content-Type": MIME[extname(arquivo)] ?? "application/octet-stream" });
    createReadStream(arquivo).pipe(res);
  });
  return new Promise((resolver) => {
    servidor.listen(0, "127.0.0.1", () => resolver({ servidor, url: `http://127.0.0.1:${servidor.address().port}/` }));
  });
}

// Faixa com o título do cartão, desenhada só na captura (nunca entra no site).
function inserirFaixa(titulo) {
  const estilo = getComputedStyle(document.documentElement);
  const fonte = estilo.getPropertyValue("--fonte-titulo") || "sans-serif";
  const cor = estilo.getPropertyValue("--cor-primaria") || "#fff";
  const faixa = document.createElement("div");
  faixa.setAttribute("data-faixa-og", "");
  faixa.style.cssText = [
    "position:fixed",
    "left:0",
    "right:0",
    "bottom:0",
    "z-index:2147483647",
    "padding:56px 56px 34px",
    "background:linear-gradient(to top, rgba(9,13,17,.96) 82%, rgba(9,13,17,0))",
    "color:#fff",
    `font-family:${fonte}`,
  ].join(";");
  const barra = document.createElement("div");
  barra.style.cssText = `width:72px;height:6px;border-radius:3px;background:${cor};margin-bottom:14px;box-shadow:0 0 0 1px rgba(255,255,255,.35)`;
  const texto = document.createElement("div");
  texto.textContent = titulo;
  texto.style.cssText = "font-size:40px;line-height:1.12;font-weight:700;letter-spacing:-0.01em;max-width:1000px;text-wrap:balance";
  faixa.append(barra, texto);
  document.body.append(faixa);
}

async function comprimirPng(entrada) {
  for (const cores of [256, 192, 128, 96, 64]) {
    const png = await sharp(entrada).png({ palette: true, colours: cores, quality: 85, effort: 10, dither: 0.7 }).toBuffer();
    if (png.length <= MARGEM_OG) return { png, cores };
  }
  throw new Error("não coube em 300 KB nem com 64 cores");
}

async function abrir(browser, url, largura, altura) {
  const contexto = await browser.newContext({
    viewport: { width: largura, height: altura },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
    locale: "pt-BR",
  });
  const pagina = await contexto.newPage();
  await pagina.goto(url, { waitUntil: "networkidle" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(ESPERA_ANIMACOES_MS);
  return { pagina, contexto };
}

const filtro = process.argv[2];
const modelos = await listarModelos(filtro);
if (modelos.length === 0) {
  console.error(`nenhum modelo encontrado${filtro ? ` para "${filtro}"` : ""}`);
  process.exit(1);
}
mkdirSync(SAIDA_VITRINE, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });
try {
  for (const m of modelos) {
    process.stdout.write(`${m.caminho}: build... `);
    construir(m.pasta);
    const dist = join(m.pasta, "dist");
    const { servidor, url } = await servir(dist);
    try {
      // Cartão de compartilhamento: 1200x630 com o título.
      const og = await abrir(browser, url, 1200, 630);
      await og.pagina.evaluate(inserirFaixa, m.config.meta.ogTitle);
      const bruto = await og.pagina.screenshot({ type: "png" });
      await og.contexto.close();
      const { png, cores } = await comprimirPng(bruto);
      writeFileSync(join(m.pasta, "public", "og-image.png"), png);

      // Captura limpa do hero para a vitrine (1440x900 -> 960x600).
      const vit = await abrir(browser, url, 1440, 900);
      const limpa = await vit.pagina.screenshot({ type: "png" });
      await vit.contexto.close();
      const jpg = await sharp(limpa).resize(960, 600).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      writeFileSync(join(SAIDA_VITRINE, `${m.id}.jpg`), jpg);

      console.log(`og-image.png ${(png.length / 1024).toFixed(0)} KB (${cores} cores, limite ${LIMITE_OG / 1024} KB); vitrine ${(jpg.length / 1024).toFixed(0)} KB`);
    } finally {
      servidor.close();
    }
  }
} finally {
  await browser.close();
}
