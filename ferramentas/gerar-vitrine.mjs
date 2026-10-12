// Gera vitrine/index.html (HTML e CSS puros, sem JavaScript) e vitrine/og-image.png.
// Dono, WhatsApp e textos vêm de vitrine/vitrine.config.mjs; os cartões vêm dos modelos.
//
// Uso (na pasta ferramentas/):  npm run vitrine   (antes, `npm run og` para as capturas)

import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { RAIZ, listarModelos } from "./modelos.mjs";

const VITRINE = join(RAIZ, "vitrine");

export function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function linkWhatsapp(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function validar(config) {
  const { dono, pagina } = config;
  if (!dono?.nome?.trim()) throw new Error("vitrine.config.mjs: dono.nome vazio");
  if (!/^\d{12,13}$/.test(dono.whatsapp ?? "")) {
    throw new Error('vitrine.config.mjs: dono.whatsapp deve ter só dígitos, com 55 e DDD (ex.: "5511912345678")');
  }
  try {
    new URL(pagina.url);
  } catch {
    throw new Error("vitrine.config.mjs: pagina.url inválida (use https://dominio/)");
  }
}

function cartao(modelo, dono) {
  const { meta } = modelo.config;
  const nome = `${modelo.nicho} · ${modelo.estilo}`;
  const captura = `capturas/${modelo.id}.jpg`;
  const pedido = linkWhatsapp(dono.whatsapp, `${dono.mensagem} Gostei do modelo ${nome}.`);
  return `
      <article class="cartao">
        <img class="cartao__captura" src="${escapar(captura)}" width="960" height="600" loading="lazy" decoding="async"
          alt="Captura do início do modelo de site ${escapar(nome)}, com dados fictícios">
        <div class="cartao__corpo">
          <p class="cartao__nicho">${escapar(modelo.nicho)}</p>
          <h2 class="cartao__nome">${escapar(modelo.estilo)}</h2>
          <p class="cartao__texto">${escapar(meta.ogDescription)}</p>
          <div class="cartao__acoes">
            <a class="botao botao--primario" href="${escapar(meta.url)}" target="_blank" rel="noopener">Ver a demonstração<span class="sr"> do modelo ${escapar(nome)} (abre em nova aba)</span></a>
            <a class="botao" href="${escapar(pedido)}" target="_blank" rel="noopener">Quero um site assim<span class="sr"> (${escapar(nome)}) no WhatsApp</span></a>
          </div>
        </div>
      </article>`;
}

const CSS = `
:root{--fundo:#f6f5f2;--superficie:#fff;--texto:#1b1f23;--secundario:#4b5563;--borda:#d9d6cf;--primaria:#0f5c5c;--zap:#0b6b3a;--zap-texto:#fff;--raio:16px}
@media (prefers-color-scheme:dark){:root{--fundo:#121516;--superficie:#1b2022;--texto:#eef1f2;--secundario:#b4bcc0;--borda:#323a3d;--primaria:#6fd0cc;--zap:#58d68d;--zap-texto:#0b1f14}}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--fundo);color:var(--texto);font:400 17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.pagina{width:min(1160px,100% - 32px);margin-inline:auto}
.topo{padding:clamp(32px,6vw,72px) 0 clamp(24px,4vw,40px)}
.topo__rotulo{margin:0 0 12px;color:var(--secundario);font-size:14px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
h1{margin:0;max-width:20ch;font-size:clamp(32px,6vw,56px);line-height:1.08;letter-spacing:-.02em}
.topo__texto{max-width:56ch;margin:16px 0 24px;color:var(--secundario);font-size:clamp(17px,2vw,20px)}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:clamp(16px,2vw,28px);margin:0;padding:0 0 clamp(40px,6vw,72px);list-style:none}
.cartao{display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--borda);border-radius:var(--raio);background:var(--superficie)}
.cartao__captura{display:block;width:100%;height:auto;aspect-ratio:8/5;object-fit:cover;border-bottom:1px solid var(--borda);background:var(--borda)}
.cartao__corpo{display:flex;flex:1;flex-direction:column;padding:clamp(18px,2.4vw,26px)}
.cartao__nicho{margin:0 0 4px;color:var(--secundario);font-size:13px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}
.cartao__nome{margin:0 0 10px;font-size:26px;line-height:1.15}
.cartao__texto{flex:1;margin:0 0 20px;color:var(--secundario);font-size:16px}
.cartao__acoes{display:flex;flex-wrap:wrap;gap:10px}
.botao{display:inline-flex;min-height:48px;align-items:center;justify-content:center;padding:10px 18px;border:2px solid var(--primaria);border-radius:999px;color:var(--primaria);font-size:16px;font-weight:600;text-align:center;text-decoration:none}
.botao--primario{background:var(--primaria);color:var(--fundo)}
.botao--zap{border-color:var(--zap);background:var(--zap);color:var(--zap-texto)}
.botao:hover{filter:brightness(1.12)}
.botao:focus-visible{outline:3px solid var(--texto);outline-offset:3px}
.rodape{padding:clamp(28px,4vw,48px) 0 56px;border-top:1px solid var(--borda)}
.rodape p{max-width:62ch;margin:0 0 16px;color:var(--secundario);font-size:15px}
`;

function pagina(config, modelos) {
  const { dono, pagina: p } = config;
  const e = escapar;
  const imagem = new URL("og-image.png", p.url).toString();
  const geral = linkWhatsapp(dono.whatsapp, dono.mensagem);
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${e(p.titulo)} | ${e(dono.nome)}</title>
    <meta name="description" content="${e(p.descricao)}" />
    <meta name="theme-color" content="#f6f5f2" />
${p.noindex ? '    <meta name="robots" content="noindex, nofollow" />\n' : ""}    <link rel="canonical" href="${e(p.url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${e(dono.nome)}" />
    <meta property="og:title" content="${e(p.titulo)}" />
    <meta property="og:description" content="${e(p.descricao)}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:url" content="${e(p.url)}" />
    <meta property="og:image" content="${e(imagem)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Capturas dos modelos de site: ${e(modelos.map((m) => `${m.nicho} ${m.estilo}`).join(", "))}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${e(p.titulo)}" />
    <meta name="twitter:description" content="${e(p.descricao)}" />
    <meta name="twitter:image" content="${e(imagem)}" />
    <style>${CSS}</style>
  </head>
  <body>
    <header class="pagina topo">
      <p class="topo__rotulo">${e(dono.nome)}</p>
      <h1>${e(p.titulo)}</h1>
      <p class="topo__texto">${e(p.descricao)} Todos os dados das demonstrações são fictícios.</p>
      <a class="botao botao--zap" href="${e(geral)}" target="_blank" rel="noopener">Falar no WhatsApp<span class="sr"> com ${e(dono.nome)} (abre em nova aba)</span></a>
    </header>
    <main class="pagina">
      <h2 class="sr">Modelos disponíveis</h2>
      <div class="grade">${modelos.map((m) => cartao(m, dono)).join("")}
      </div>
    </main>
    <footer class="pagina rodape">
      <p>As demonstrações são exemplos: nomes, registros profissionais, telefones e endereços são inventados, e as fotos são de banco de imagens. Cada site de cliente é feito com os dados e as imagens do próprio negócio.</p>
      <a class="botao botao--zap" href="${e(geral)}" target="_blank" rel="noopener">Falar no WhatsApp<span class="sr"> com ${e(dono.nome)} (abre em nova aba)</span></a>
    </footer>
  </body>
</html>
`;
}

// Montagem 1200x630 com as capturas, sem texto (o título vai no og:title).
async function montarOg(modelos) {
  const colunas = modelos.length > 4 ? 3 : 2;
  const linhas = Math.ceil(modelos.length / colunas);
  const gap = 12;
  const larg = Math.floor((1200 - gap * (colunas + 1)) / colunas);
  const alt = Math.floor((630 - gap * (linhas + 1)) / linhas);
  const pecas = [];
  for (const [i, m] of modelos.entries()) {
    pecas.push({
      input: await sharp(join(VITRINE, "capturas", `${m.id}.jpg`)).resize(larg, alt, { fit: "cover", position: "top" }).toBuffer(),
      left: gap + (i % colunas) * (larg + gap),
      top: gap + Math.floor(i / colunas) * (alt + gap),
    });
  }
  return sharp({ create: { width: 1200, height: 630, channels: 3, background: "#e9e6df" } })
    .composite(pecas)
    .png({ palette: true, colours: 128, effort: 10 })
    .toBuffer();
}

export async function gerar() {
  const { default: config } = await import(pathToFileURL(join(VITRINE, "vitrine.config.mjs")).href);
  validar(config);
  const modelos = await listarModelos();
  const semCaptura = modelos.filter((m) => !existsSync(join(VITRINE, "capturas", `${m.id}.jpg`)));
  if (semCaptura.length) {
    throw new Error(`sem captura para: ${semCaptura.map((m) => m.id).join(", ")}. Rode antes: npm run og`);
  }
  writeFileSync(join(VITRINE, "index.html"), pagina(config, modelos));
  const og = await montarOg(modelos);
  writeFileSync(join(VITRINE, "og-image.png"), og);
  return { modelos: modelos.length, ogBytes: og.length, config };
}

// Executa só quando chamado direto (o teste importa as funções acima).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = await gerar();
  console.log(`vitrine/index.html com ${r.modelos} cartões; og-image.png ${(r.ogBytes / 1024).toFixed(0)} KB`);
  if (/exemplo/i.test(r.config.dono.nome) || r.config.dono.whatsapp === "5500900000000") {
    console.warn("AVISO: vitrine.config.mjs ainda tem o nome e o WhatsApp de exemplo. Preencha antes de publicar.");
  }
}
