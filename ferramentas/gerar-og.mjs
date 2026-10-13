// Para cada modelo:
//   1. roda o `npm run og` dele, que regenera <modelo>/public/og-image.png (1200x630, < 300 KB);
//   2. captura o hero limpo para a vitrine: vitrine/capturas/<modelo>.jpg (960x600).
//
// Uso (na pasta ferramentas/):  node gerar-og.mjs [filtro] [--so-vitrine]
//   ex.: node gerar-og.mjs fisioterapia-02
//   --so-vitrine pula o passo 1 e deixa os og-image.png como estão.
// Chrome: CHROME_PATH ou o Chrome instalado. Os dados são só os do config (fictícios).

import { execFileSync } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { RAIZ, listarModelos } from "./modelos.mjs";

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

const args = process.argv.slice(2);
const soVitrine = args.includes("--so-vitrine");
const filtro = args.find((a) => !a.startsWith("--"));
const modelos = await listarModelos(filtro);
if (modelos.length === 0) {
  console.error(`nenhum modelo encontrado${filtro ? ` para "${filtro}"` : ""}`);
  process.exit(1);
}
mkdirSync(SAIDA_VITRINE, { recursive: true });

const chrome = process.env.CHROME_PATH;
const browser = await chromium.launch(chrome ? { executablePath: chrome } : { channel: "chrome" });
try {
  for (const m of modelos) {
    console.log(`${m.caminho}:`);
    if (!soVitrine) {
      execFileSync("npm run og --silent", { cwd: m.pasta, shell: true, stdio: "inherit" });
    }

    const temp = mkdtempSync(join(tmpdir(), "vitrine-"));
    const { servidor, url } = await (async () => {
      execFileSync(`npx vite build --outDir "${temp}" --emptyOutDir --logLevel error`, { cwd: m.pasta, shell: true, stdio: "pipe" });
      return servir(temp);
    })();
    try {
      // 1100x688 reduzido para 960x600 mantém o texto do hero legível no cartão da vitrine.
      const contexto = await browser.newContext({
        viewport: { width: 1100, height: 688 },
        deviceScaleFactor: 1,
        reducedMotion: "no-preference",
        locale: "pt-BR",
      });
      const pagina = await contexto.newPage();
      await pagina.goto(url, { waitUntil: "networkidle" });
      await pagina.evaluate(() => document.fonts.ready);
      await pagina.waitForTimeout(ESPERA_ANIMACOES_MS);
      const limpa = await pagina.screenshot({ type: "png" });
      await contexto.close();
      const jpg = await sharp(limpa).resize(960, 600).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      writeFileSync(join(SAIDA_VITRINE, `${m.id}.jpg`), jpg);
      console.log(`  vitrine/capturas/${m.id}.jpg ${(jpg.length / 1024).toFixed(0)} KB`);
    } finally {
      servidor.close();
      rmSync(temp, { recursive: true, force: true });
    }
  }
} finally {
  await browser.close();
}
