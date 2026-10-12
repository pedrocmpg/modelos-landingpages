import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import siteConfig from "../config/site.config";

// Builda o modelo de verdade (vite build, num diretório temporário) e lê o que foi entregue:
// o index.html tal como o servidor o envia, sem executar JavaScript (DOMParser não roda
// <script>). As tags Open Graph e Twitter têm de estar lá, vindas de meta.* no build.

const raiz = process.cwd();
let saida = "";
let html = "";
let doc: Document;

function metaPorPropriedade(chave: "property" | "name", valor: string): string | null {
  return doc.head.querySelector(`meta[${chave}="${valor}"]`)?.getAttribute("content") ?? null;
}

beforeAll(async () => {
  saida = mkdtempSync(join(tmpdir(), "og-build-"));
  await build({
    root: raiz,
    logLevel: "silent",
    build: { outDir: saida, emptyOutDir: true },
  });
  html = readFileSync(join(saida, "index.html"), "utf8");
  doc = new DOMParser().parseFromString(html, "text/html");
}, 120_000);

afterAll(() => {
  if (saida) rmSync(saida, { recursive: true, force: true });
});

describe("HTML do build (sem JavaScript)", () => {
  const { meta } = siteConfig;
  const imagem = new URL(meta.ogImage, meta.url).toString();

  it("traz as tags Open Graph no <head>, com os valores de meta.*", () => {
    expect(metaPorPropriedade("property", "og:type")).toBe("website");
    expect(metaPorPropriedade("property", "og:title")).toBe(meta.ogTitle);
    expect(metaPorPropriedade("property", "og:description")).toBe(meta.ogDescription);
    expect(metaPorPropriedade("property", "og:url")).toBe(meta.url);
    expect(metaPorPropriedade("property", "og:image")).toBe(imagem);
    expect(metaPorPropriedade("property", "og:image:width")).toBe("1200");
    expect(metaPorPropriedade("property", "og:image:height")).toBe("630");
    expect(metaPorPropriedade("property", "og:image:alt")).toBe(meta.ogImageAlt);
    expect(metaPorPropriedade("property", "og:locale")).toBe("pt_BR");
  });

  it("traz as tags do Twitter no <head>", () => {
    expect(metaPorPropriedade("name", "twitter:card")).toBe("summary_large_image");
    expect(metaPorPropriedade("name", "twitter:title")).toBe(meta.ogTitle);
    expect(metaPorPropriedade("name", "twitter:description")).toBe(meta.ogDescription);
    expect(metaPorPropriedade("name", "twitter:image")).toBe(imagem);
    expect(metaPorPropriedade("name", "twitter:image:alt")).toBe(meta.ogImageAlt);
  });

  it("a URL absoluta da imagem do cartão aponta para um arquivo que o build publicou", () => {
    const caminho = new URL(imagem).pathname;
    expect(statSync(join(saida, caminho)).isFile()).toBe(true);
  });

  it("<meta robots noindex> segue meta.noindex e o robots.txt libera os rastreadores", () => {
    const robotsMeta = metaPorPropriedade("name", "robots");
    if (meta.noindex) expect(robotsMeta).toBe("noindex, nofollow");
    else expect(robotsMeta).toBeNull();
    const robotsTxt = readFileSync(join(saida, "robots.txt"), "utf8");
    expect(robotsTxt).toContain("User-agent: *");
    expect(robotsTxt).toContain("Allow: /");
    expect(robotsTxt).not.toMatch(/Disallow/i);
  });

  it("não sobrou marcador do plugin no HTML", () => {
    expect(html).not.toContain("<!--SITE_");
  });
});

describe("nenhuma tag de compartilhamento é inserida por JavaScript", () => {
  it("o JavaScript entregue ao navegador não contém og:, twitter: nem cria <meta>", () => {
    const pasta = join(saida, "assets");
    const scripts = readdirSync(pasta).filter((nome) => nome.endsWith(".js"));
    expect(scripts.length).toBeGreaterThan(0);
    for (const nome of scripts) {
      const codigo = readFileSync(join(pasta, nome), "utf8");
      expect(codigo, nome).not.toMatch(/og:(title|description|image|url|type)|twitter:(card|title|image)/);
      expect(codigo, nome).not.toMatch(/createElement\(["']meta["']\)/);
    }
  });
});
