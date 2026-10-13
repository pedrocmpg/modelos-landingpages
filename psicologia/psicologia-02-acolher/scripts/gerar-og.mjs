// npm run og: regenera public/og-image.png (1200x630, < 300 KB) a partir de uma captura do hero.
//
// Builda o site num diretório temporário, abre no Chrome (Playwright), espera as animações da
// entrada, desenha a faixa com meta.ogTitle e o selo "Exemplo" (só na captura, nunca no site) e
// comprime o PNG. Os dados são os do config. Para um site de cliente, tire o selo (SELO = "")
// ou, melhor, use uma imagem do próprio negócio em public/og-image.png.
//
// Chrome: usa o Chrome instalado; para outro caminho, CHROME_PATH=/caminho/chrome npm run og

import { execFileSync } from "node:child_process";
import { createReadStream, existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";
import config from "../src/config/site.config.ts";

const RAIZ = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SELO = "Exemplo";
const LIMITE = 300 * 1024;
const MARGEM = 285 * 1024;
const ESPERA_ANIMACOES_MS = 5500;

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

function servir(pasta) {
  const servidor = createServer((req, res) => {
    const caminho = decodeURIComponent((req.url ?? "/").split("?")[0]);
    let arquivo = normalize(join(pasta, caminho));
    if (!arquivo.startsWith(pasta)) {
      res.writeHead(403).end();
      return;
    }
    if (!existsSync(arquivo) || statSync(arquivo).isDirectory()) arquivo = join(pasta, "index.html");
    res.writeHead(200, { "Content-Type": MIME[extname(arquivo)] ?? "application/octet-stream" });
    createReadStream(arquivo).pipe(res);
  });
  return new Promise((ok) => {
    servidor.listen(0, "127.0.0.1", () => ok({ servidor, url: `http://127.0.0.1:${servidor.address().port}/` }));
  });
}

// Roda dentro da página: faixa com o título do cartão e o selo, usando a fonte e a cor do próprio site.
function desenharFaixa({ titulo, selo }) {
  const estilo = getComputedStyle(document.documentElement);
  const fonte = estilo.getPropertyValue("--fonte-titulo") || "sans-serif";
  const cor = estilo.getPropertyValue("--cor-primaria") || "#fff";

  const faixa = document.createElement("div");
  faixa.style.cssText = [
    "position:fixed",
    "left:0",
    "right:0",
    "bottom:0",
    "z-index:2147483647",
    "display:flex",
    "align-items:flex-end",
    "justify-content:space-between",
    "gap:32px",
    "padding:56px 56px 34px",
    "background:linear-gradient(to top, rgba(9,13,17,.96) 82%, rgba(9,13,17,0))",
    "color:#fff",
    `font-family:${fonte}`,
  ].join(";");

  const bloco = document.createElement("div");
  const barra = document.createElement("div");
  barra.style.cssText = `width:72px;height:6px;border-radius:3px;background:${cor};margin-bottom:14px;box-shadow:0 0 0 1px rgba(255,255,255,.35)`;
  const texto = document.createElement("div");
  texto.textContent = titulo;
  texto.style.cssText = "font-size:40px;line-height:1.12;font-weight:700;letter-spacing:-0.01em;max-width:900px;text-wrap:balance";
  bloco.append(barra, texto);
  faixa.append(bloco);

  if (selo) {
    const pilula = document.createElement("div");
    pilula.textContent = selo;
    pilula.style.cssText =
      "flex:none;padding:6px 14px;border:1.5px solid rgba(255,255,255,.7);border-radius:999px;font:600 15px/1 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.92)";
    faixa.append(pilula);
  }
  document.body.append(faixa);
}

async function comprimir(entrada) {
  for (const cores of [256, 192, 128, 96, 64]) {
    const png = await sharp(entrada).png({ palette: true, colours: cores, quality: 85, effort: 10, dither: 0.7 }).toBuffer();
    if (png.length <= MARGEM) return png;
  }
  throw new Error("a imagem não coube em 300 KB nem com 64 cores");
}

const temp = mkdtempSync(join(tmpdir(), "og-"));
let servidor;
let browser;
try {
  console.log("build...");
  execFileSync(`npx vite build --outDir "${temp}" --emptyOutDir --logLevel error`, { cwd: RAIZ, shell: true, stdio: "pipe" });
  const local = await servir(temp);
  servidor = local.servidor;

  const chrome = process.env.CHROME_PATH;
  browser = await chromium.launch(chrome ? { executablePath: chrome } : { channel: "chrome" });
  const contexto = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
    locale: "pt-BR",
  });
  const pagina = await contexto.newPage();
  await pagina.goto(local.url, { waitUntil: "networkidle" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(ESPERA_ANIMACOES_MS);
  await pagina.evaluate(desenharFaixa, { titulo: config.meta.ogTitle, selo: SELO });
  const bruto = await pagina.screenshot({ type: "png" });

  const png = await comprimir(bruto);
  writeFileSync(join(RAIZ, "public", "og-image.png"), png);
  console.log(`public/og-image.png: 1200x630, ${(png.length / 1024).toFixed(0)} KB (limite ${LIMITE / 1024} KB)`);
} finally {
  await browser?.close();
  servidor?.close();
  rmSync(temp, { recursive: true, force: true });
}
