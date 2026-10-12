import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import siteConfig from "../config/site.config";

// A imagem do cartão de compartilhamento é gerada por ferramentas/gerar-og.mjs
// (captura do hero + título do cartão). Aqui só se confere o arquivo entregue.
// O vitest roda na pasta do modelo, então process.cwd() é a raiz dele.
const arquivo = join(process.cwd(), "public", siteConfig.meta.ogImage);

describe("imagem do cartão de compartilhamento (og-image.png)", () => {
  it("meta.ogImage aponta para um arquivo que existe em public/", () => {
    expect(siteConfig.meta.ogImage).toMatch(/^\/[^/].*\.png$/);
    expect(statSync(arquivo).isFile()).toBe(true);
  });

  it("é um PNG de 1200x630", () => {
    const bytes = readFileSync(arquivo);
    expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    // O cabeçalho IHDR guarda largura e altura nos bytes 16-23.
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
  });

  it("tem menos de 300 KB", () => {
    expect(statSync(arquivo).size).toBeLessThan(300 * 1024);
  });
});
