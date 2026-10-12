import { describe, expect, it } from "vitest";
import altConfig from "../config/site.config.alt";
import siteConfig from "../config/site.config";
import { aplicarAoHtml, renderHeadTags, robotsTxt } from "../config/head";
import { mailtoHref, nomeDoPerfil, preenchido, telHref, whatsappUrl } from "../config/links";
import { fonteProibida, googleFontsHref, temaCss } from "../config/theme";
import type { SiteConfig } from "../config/types";
import { contraste, misturar } from "./contraste";

const configs: [string, SiteConfig][] = [
  ["principal", siteConfig],
  ["alternativo", altConfig],
];

describe("links", () => {
  it("monta o link do WhatsApp com a mensagem codificada", () => {
    expect(whatsappUrl(siteConfig.contato)).toBe(
      `https://wa.me/5500900000000?text=${encodeURIComponent(siteConfig.contato.mensagemWhatsapp)}`,
    );
  });

  it("ignora caracteres não numéricos no número do WhatsApp", () => {
    const url = whatsappUrl({ ...siteConfig.contato, whatsapp: "+55 (00) 90000-0000" });
    expect(url.startsWith("https://wa.me/5500900000000?text=")).toBe(true);
  });

  it("monta tel:, mailto: e o nome do perfil", () => {
    expect(telHref("(00) 90000-0000")).toBe("tel:+5500900000000");
    expect(telHref("+55 (00) 90000-0000")).toBe("tel:+5500900000000");
    expect(mailtoHref("contato@exemplo.com")).toBe("mailto:contato@exemplo.com");
    expect(nomeDoPerfil("https://instagram.com/seu_perfil_aqui/")).toBe("@seu_perfil_aqui");
    expect(nomeDoPerfil("https://www.facebook.com/")).toBe("facebook.com");
  });

  it("trata vazio e espaços como não preenchido", () => {
    expect(preenchido("")).toBe(false);
    expect(preenchido("   ")).toBe(false);
    expect(preenchido(undefined)).toBe(false);
    expect(preenchido("a")).toBe(true);
  });
});

describe("tema", () => {
  it("monta o link do Google Fonts a partir do config principal", () => {
    expect(googleFontsHref(siteConfig.tema)).toBe(
      "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700" +
        "&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700" +
        "&family=Caveat:wght@500;700&display=swap",
    );
  });

  it("não repete famílias iguais e aceita tema sem fonte de destaque", () => {
    const tema = structuredClone(siteConfig.tema);
    tema.fontes.destaque = undefined;
    tema.fontes.texto = { ...tema.fontes.titulo };
    const href = googleFontsHref(tema);
    expect(href.match(/family=/g)).toHaveLength(1);
    expect(temaCss(tema)).toContain('--fonte-destaque:"Fraunces"');
  });

  it("transforma cores, fontes e raios em variáveis CSS", () => {
    const css = temaCss(altConfig.tema);
    expect(css).toContain("--cor-primaria:#ff7a45");
    expect(css).toContain('--fonte-titulo:"Young Serif", Georgia, serif');
    expect(css).toContain("--raio-cartao:12px");
    expect(css).not.toContain("#f0b03a");
  });

  it.each(configs)("config %s não usa fontes proibidas", (_nome, config) => {
    const { titulo, texto, destaque } = config.tema.fontes;
    for (const fonte of [titulo, texto, destaque]) {
      if (fonte) expect(fonteProibida(fonte.familia)).toBe(false);
    }
  });

  it("reconhece as fontes proibidas", () => {
    for (const f of ["Inter", "roboto", "Arial", "Open Sans", "Poppins", "Montserrat"]) {
      expect(fonteProibida(f)).toBe(true);
    }
  });
});

describe("head e robots", () => {
  it("noindex true: meta robots e robots.txt bloqueiam tudo", () => {
    expect(siteConfig.meta.noindex).toBe(true);
    expect(renderHeadTags(siteConfig)).toContain('<meta name="robots" content="noindex, nofollow" />');
    expect(robotsTxt(siteConfig)).toContain("Disallow: /");
  });

  it("noindex false: sem meta robots e robots.txt liberando", () => {
    expect(renderHeadTags(altConfig)).not.toContain('name="robots"');
    expect(robotsTxt(altConfig)).toContain("Allow: /");
    expect(robotsTxt(altConfig)).not.toContain("Disallow");
  });

  it("gera título, descrição e Open Graph do config", () => {
    const head = renderHeadTags(altConfig);
    expect(head).toContain("<title>Casa dos Bichos Teste | Estética animal em Vila Modelo</title>");
    expect(head).toContain('property="og:title"');
    expect(head).toContain('property="og:description"');
    expect(head).toContain('property="og:url" content="https://teste.example/"');
    expect(head).toContain('property="og:image" content="https://teste.example/images/pet-1-puppy.jpg"');
    expect(head).toContain('name="twitter:card" content="summary_large_image"');
  });

  it("escapa HTML dos textos do config", () => {
    const cfg = structuredClone(siteConfig);
    cfg.meta.title = 'A "B" <script>';
    expect(renderHeadTags(cfg)).toContain("A &quot;B&quot; &lt;script&gt;");
  });

  it("aplica lang, head e noscript ao index.html", () => {
    const html = aplicarAoHtml(
      '<html lang="xx"><head><!--SITE_HEAD--></head><body><!--SITE_NOSCRIPT--></body></html>',
      altConfig,
    );
    expect(html).toContain('<html lang="pt-BR"');
    expect(html).toContain("Casa dos Bichos Teste");
    expect(html).toContain("<noscript>");
    expect(html).toContain("5500911111111");
    expect(html).not.toContain("Pet Shop Exemplo");
    expect(html).not.toContain("<!--SITE_");
  });
});

describe("dados fictícios", () => {
  it("o config principal usa apenas os dados fictícios do padrão", () => {
    expect(siteConfig.negocio.nome).toBe("Pet Shop Exemplo");
    expect(siteConfig.contato.telefoneExibicao).toBe("(00) 90000-0000");
    expect(siteConfig.contato.whatsapp).toBe("5500900000000");
    expect(siteConfig.contato.endereco).toBe("Rua Exemplo, 123 - Centro");
    expect(siteConfig.contato.email).toBe("contato@exemplo.com");
  });

  it.each(configs)("config %s não tem telefone com DDD real", (_nome, config) => {
    const texto = JSON.stringify(config);
    for (const m of texto.matchAll(/\((\d{2})\)\s?\d{4,5}-\d{4}/g)) {
      expect(m[1]).toBe("00");
    }
    for (const m of texto.matchAll(/"55(\d{2})\d{8,9}"/g)) {
      expect(m[1]).toBe("00");
    }
  });

  it("depoimentos de exemplo carregam a flag exemplo", () => {
    for (const d of siteConfig.conteudo.depoimentos.itens) expect(d.exemplo).toBe(true);
    expect(siteConfig.conteudo.depoimentos.nota?.exemplo).toBe(true);
  });

  it("fotos de exemplo da galeria estão marcadas", () => {
    for (const item of siteConfig.imagens.galeria) expect(item.exemplo).toBe(true);
  });
});

describe("estrutura do config", () => {
  it.each(configs)("config %s: ids de seção únicos e conteúdo presente nas ativas", (_nome, config) => {
    const ids = config.secoes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of config.secoes.filter((x) => x.ativo)) {
      if (s.id === "hero") continue;
      expect(config.conteudo[s.id], `conteudo.${s.id}`).toBeDefined();
    }
  });

  it.each(configs)("config %s: toda imagem tem alt", (_nome, config) => {
    const { hero, sobre, og, galeria } = config.imagens;
    const todas = [hero, sobre, og].filter((i) => i !== undefined);
    for (const g of galeria) {
      if (g.tipo === "foto") todas.push(g.imagem);
      else todas.push(g.antes, g.depois);
    }
    for (const img of todas) expect(img.alt.trim().length).toBeGreaterThan(5);
  });
});

describe("contraste das cores (mínimo 4.5:1)", () => {
  it.each(configs)("config %s", (_nome, { tema }) => {
    const c = tema.cores;
    const textoAtenuadoSobreEscuro = misturar(c.fundo, c.escuro, 78);
    const pares: [string, string, string][] = [
      ["texto / fundo", c.texto, c.fundo],
      ["texto / superfície", c.texto, c.superficie],
      ["texto secundário / fundo", c.textoSecundario, c.fundo],
      ["texto secundário / superfície", c.textoSecundario, c.superficie],
      ["secundária / fundo (eyebrow)", c.secundaria, c.fundo],
      ["secundária / superfície (eyebrow)", c.secundaria, c.superficie],
      ["destaque / fundo (preço, anotação)", c.destaque, c.fundo],
      ["destaque / superfície", c.destaque, c.superficie],
      ["texto / primária (botão)", c.texto, c.primaria],
      ["fundo / secundária (selo)", c.fundo, c.secundaria],
      ["fundo / escuro (seção escura)", c.fundo, c.escuro],
      ["primária / escuro (destaque no escuro)", c.primaria, c.escuro],
      ["texto atenuado / escuro", textoAtenuadoSobreEscuro, c.escuro],
    ];
    for (const [nome, a, b] of pares) {
      expect(contraste(a, b), nome).toBeGreaterThanOrEqual(4.5);
    }
  });
});
