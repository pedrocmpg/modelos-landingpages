import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { escapar, gerar, validar } from "./gerar-vitrine.mjs";
import { RAIZ, listarModelos } from "./modelos.mjs";

const VITRINE = join(RAIZ, "vitrine");

describe("vitrine", async () => {
  const { config } = await gerar();
  const html = readFileSync(join(VITRINE, "index.html"), "utf8");
  const modelos = await listarModelos();

  it("descobre os cinco modelos", () => {
    assert.equal(modelos.length, 5);
  });

  it("é HTML estático: nenhum <script> nem manipulador de evento", () => {
    assert.doesNotMatch(html, /<script/i);
    assert.doesNotMatch(html, /\son[a-z]+=/i);
  });

  it("tem um cartão por modelo, com captura, nome, nicho e link da demonstração", () => {
    assert.equal((html.match(/<article class="cartao">/g) ?? []).length, modelos.length);
    for (const m of modelos) {
      assert.ok(html.includes(`href="${escapar(m.config.meta.url)}"`), `link de ${m.id}`);
      assert.ok(html.includes(`src="capturas/${m.id}.jpg"`), `captura de ${m.id}`);
      assert.ok(existsSync(join(VITRINE, "capturas", `${m.id}.jpg`)), `arquivo da captura de ${m.id}`);
      assert.ok(html.includes(`<h2 class="cartao__nome">${m.estilo}</h2>`), `nome de ${m.id}`);
      assert.ok(html.includes(`<p class="cartao__nicho">${m.nicho}</p>`), `nicho de ${m.id}`);
    }
  });

  it("toda imagem tem alt", () => {
    for (const img of html.match(/<img[^>]*>/g) ?? []) assert.match(img, /\salt="[^"]{8,}"/);
  });

  it("nome e WhatsApp vêm do vitrine.config.mjs", () => {
    assert.ok(html.includes(escapar(config.dono.nome)));
    assert.ok(html.includes(`https://wa.me/${config.dono.whatsapp}?text=`));
    // Cada cartão leva o WhatsApp do config; nenhum outro número aparece.
    const numeros = new Set([...html.matchAll(/wa\.me\/(\d+)/g)].map((m) => m[1]));
    assert.deepEqual([...numeros], [config.dono.whatsapp]);
  });

  it("tem Open Graph e Twitter no HTML, com imagem absoluta", () => {
    const imagem = new URL("og-image.png", config.pagina.url).toString();
    for (const trecho of [
      `<meta property="og:title" content="${escapar(config.pagina.titulo)}" />`,
      `<meta property="og:url" content="${config.pagina.url}" />`,
      `<meta property="og:image" content="${imagem}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:image" content="${imagem}" />`,
    ]) {
      assert.ok(html.includes(trecho), trecho);
    }
  });

  it("noindex segue pagina.noindex", () => {
    assert.equal(html.includes('<meta name="robots" content="noindex, nofollow" />'), config.pagina.noindex);
  });

  it("og-image.png da vitrine é 1200x630 e tem menos de 300 KB", () => {
    const arquivo = join(VITRINE, "og-image.png");
    const bytes = readFileSync(arquivo);
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
    assert.ok(statSync(arquivo).size < 300 * 1024);
  });

  it("rejeita WhatsApp e URL inválidos", () => {
    const base = structuredClone(config);
    assert.throws(() => validar({ ...base, dono: { ...base.dono, whatsapp: "(11) 91234-5678" } }), /whatsapp/);
    assert.throws(() => validar({ ...base, pagina: { ...base.pagina, url: "sem-protocolo" } }), /url/);
    assert.doesNotThrow(() => validar(base));
  });
});
