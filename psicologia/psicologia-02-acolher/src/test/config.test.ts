import { describe, expect, it } from "vitest";
import altConfig from "../config/site.config.alt";
import siteConfig from "../config/site.config";
import { aplicarAoHtml, renderHeadTags, robotsTxt } from "../config/head";
import { mailtoHref, nomeDoPerfil, preenchido, telHref, whatsappUrl } from "../config/links";
import { fonteProibida, googleFontsHref, temaCss } from "../config/theme";
import { partesDoTitulo, semMarcacao } from "../config/titulo";
import type { SiteConfig } from "../config/types";
import { contraste, misturar } from "./contraste";

const configs: [string, SiteConfig][] = [
  ["principal", siteConfig],
  ["alternativo", altConfig],
];

// Todas as strings (de qualquer profundidade) de um valor do config.
function textos(valor: unknown, saida: string[] = []): string[] {
  if (typeof valor === "string") saida.push(valor);
  else if (Array.isArray(valor)) valor.forEach((v) => textos(v, saida));
  else if (valor && typeof valor === "object") Object.values(valor).forEach((v) => textos(v, saida));
  return saida;
}

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

describe("títulos com *destaque*", () => {
  it("separa as partes destacadas", () => {
    expect(partesDoTitulo("Um espaço *sem pressa* para você")).toEqual([
      { texto: "Um espaço ", destaque: false },
      { texto: "sem pressa", destaque: true },
      { texto: " para você", destaque: false },
    ]);
  });

  it("sem marcação devolve o título inteiro", () => {
    expect(partesDoTitulo("Título simples")).toEqual([{ texto: "Título simples", destaque: false }]);
    expect(semMarcacao("Vamos *conversar*?")).toBe("Vamos conversar?");
    expect(semMarcacao("Asterisco * solto")).toBe("Asterisco * solto");
  });
});

describe("tema", () => {
  it("monta o link do Google Fonts a partir do config principal", () => {
    expect(googleFontsHref(siteConfig.tema)).toBe(
      "https://fonts.googleapis.com/css2?family=Gloock:wght@400" +
        "&family=Onest:wght@400;500;600;700" +
        "&family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&display=swap",
    );
  });

  it("não repete famílias iguais e aceita tema sem fonte de destaque", () => {
    const tema = structuredClone(altConfig.tema);
    tema.fontes.destaque = undefined;
    tema.fontes.texto = { ...tema.fontes.titulo };
    expect(googleFontsHref(tema).match(/family=/g)).toHaveLength(1);
    expect(temaCss(tema)).toContain('--fonte-destaque:"Young Serif"');
  });

  it("transforma cores, fontes e raios em variáveis CSS", () => {
    const css = temaCss(altConfig.tema);
    expect(css).toContain("--cor-primaria:#2F6F73");
    expect(css).toContain("--cor-suave:#D3E4E2");
    expect(css).toContain('--fonte-titulo:"Young Serif", Georgia, serif');
    expect(css).toContain("--raio-cartao:12px");
    expect(css).not.toContain("#3E4B3A");
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
  it("noindex true: o <meta robots> bloqueia a indexação e o robots.txt libera os rastreadores", () => {
    expect(siteConfig.meta.noindex).toBe(true);
    expect(renderHeadTags(siteConfig)).toContain('<meta name="robots" content="noindex, nofollow" />');
    expect(robotsTxt(siteConfig)).toBe("User-agent: *\nAllow: /\n");
  });

  it("noindex false: sem <meta robots>", () => {
    expect(altConfig.meta.noindex).toBe(false);
    expect(renderHeadTags(altConfig)).not.toContain('name="robots"');
  });

  it.each(configs)("config %s: robots.txt libera todos os rastreadores, com noindex ligado ou não", (_nome, config) => {
    const robots = robotsTxt(config);
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).not.toMatch(/Disallow/i);
  });

  it("gera título, descrição e Open Graph do config", () => {
    const head = renderHeadTags(altConfig);
    expect(head).toContain("<title>Psicólogo Bruno Teste | Consultório em Vila Modelo</title>");
    expect(head).toContain('property="og:title" content="Título alternativo do cartão (teste)"');
    expect(head).toContain('property="og:description" content="Descrição alternativa do cartão de compartilhamento (teste)."');
    expect(head).toContain('property="og:url" content="https://teste.example/"');
    expect(head).toContain('property="og:image" content="https://teste.example/images/og-teste.jpg"');
    expect(head).toContain('name="twitter:card" content="summary_large_image"');
  });

  it.each(configs)("config %s: Open Graph e Twitter completos, vindos de meta", (_nome, config) => {
    const head = renderHeadTags(config);
    const { meta } = config;
    const imagem = new URL(meta.ogImage, meta.url).toString();
    const esperadas = [
      '<meta property="og:type" content="website" />',
      `<meta property="og:title" content="${meta.ogTitle}" />`,
      `<meta property="og:description" content="${meta.ogDescription}" />`,
      `<meta property="og:url" content="${meta.url}" />`,
      `<meta property="og:image" content="${imagem}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      `<meta property="og:image:alt" content="${meta.ogImageAlt}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${meta.ogTitle}" />`,
      `<meta name="twitter:description" content="${meta.ogDescription}" />`,
      `<meta name="twitter:image" content="${imagem}" />`,
      `<meta name="twitter:image:alt" content="${meta.ogImageAlt}" />`,
      `<link rel="canonical" href="${meta.url}" />`,
    ];
    for (const tag of esperadas) expect(head).toContain(tag);
  });

  it("o cartão do config principal segue o padrão \"Modelo de site para [nicho] — exemplo\"", () => {
    const { meta } = siteConfig;
    expect(meta.ogTitle).toMatch(/^Modelo de site para .+ — exemplo$/);
    expect(meta.url).toMatch(/^https:\/\/[^/]+\/$/);
    expect(meta.ogImage).toBe("/og-image.png");
    expect(meta.ogDescription).toContain("dados fictícios");
  });

  it("meta.url ou meta.ogImage inválidos falham o build em vez de omitir as tags", () => {
    const cfg = structuredClone(siteConfig);
    cfg.meta.url = "isto-nao-e-uma-url";
    expect(() => renderHeadTags(cfg)).toThrow(/meta\.url/);
  });

  it("escapa HTML dos textos do config", () => {
    const cfg = structuredClone(siteConfig);
    cfg.meta.title = 'A "B" <script>';
    expect(renderHeadTags(cfg)).toContain("A &quot;B&quot; &lt;script&gt;");
  });

  it("aplica lang, head e noscript (com o CRP) ao index.html", () => {
    const html = aplicarAoHtml(
      '<html lang="xx"><head><!--SITE_HEAD--></head><body><!--SITE_NOSCRIPT--></body></html>',
      altConfig,
    );
    expect(html).toContain('<html lang="pt-BR"');
    expect(html).toContain("Psicólogo Bruno Teste");
    expect(html).toContain("<noscript>");
    expect(html).toContain("CRP 99/99999");
    expect(html).toContain("5500911111111");
    expect(html).not.toContain("Clara Exemplo");
    expect(html).not.toContain("*");
    expect(html).not.toContain("<!--SITE_");
  });
});

describe("dados fictícios", () => {
  it("o config principal usa apenas os dados fictícios do padrão", () => {
    expect(siteConfig.negocio.nome).toBe("Psicóloga Clara Exemplo");
    expect(siteConfig.negocio.registroProfissional).toEqual({ conselho: "CRP", numero: "00/00000" });
    expect(siteConfig.contato.telefoneExibicao).toBe("(00) 90000-0000");
    expect(siteConfig.contato.whatsapp).toBe("5500900000000");
    expect(siteConfig.contato.email).toBe("contato@exemplo.com");
  });

  it.each(configs)("config %s não tem telefone com DDD real", (_nome, config) => {
    const texto = JSON.stringify(config);
    for (const m of texto.matchAll(/\((\d{2})\)\s?\d{4,5}-\d{4}/g)) expect(m[1]).toBe("00");
    for (const m of texto.matchAll(/"55(\d{2})\d{8,9}"/g)) expect(m[1]).toBe("00");
  });

  it.each(configs)("config %s: o CRP tem número fictício", (_nome, config) => {
    const { numero } = config.negocio.registroProfissional;
    expect(numero === "00/00000" || numero === "99/99999").toBe(true);
  });
});

// Regras do Conselho Federal de Psicologia, verificadas no config inteiro.
describe("regras de conteúdo (CFP)", () => {
  const proibidos: [string, RegExp][] = [
    ["preço em reais", /R\$|\breais\b/i],
    ["gratuidade ou promoção", /gr[aá]tis|gratuit[oa]|promo[cç][aã]o|promo[cç][oõ]es|desconto|cortesia|sem custo/i],
    ["promessa de cura ou resultado", /\bcura\b|\bcurar\b|garant(ia|imos|ido|e)\b|\bresultados?\b|comprovad[oa]|\beficaz|milagr/i],
    ["prazo de resultado", /\bem \d+ (dias|semanas|meses|sess[oõ]es)\b/i],
    ["depoimento ou avaliação", /depoimento|avalia[cç][aã]o de|avalia[cç][oõ]es|estrelas|nota \d/i],
    ["antes e depois", /antes e depois/i],
    ["paciente como personagem do site", /\bpacientes?\b/i],
  ];

  it.each(configs)("config %s não tem nada que as regras proíbem", (_nome, config) => {
    for (const t of textos(config)) {
      for (const [nome, regex] of proibidos) {
        expect(t, `${nome}: "${t}"`).not.toMatch(regex);
      }
    }
  });

  it.each(configs)("config %s: textos de imagem não descrevem pessoas", (_nome, config) => {
    const { hero, profissional } = config.imagens;
    const atendimento = config.conteudo.atendimento.itens.flatMap((i) => (i.imagem ? [i.imagem] : []));
    for (const img of [hero, { src: config.meta.ogImage, alt: config.meta.ogImageAlt }, ...atendimento]) {
      if (img) expect(img.alt, img.src).not.toMatch(/\b(pessoas?|mulher|homem|crian[cç]as?|rosto|paciente)\b/i);
    }
    expect(profissional === undefined || profissional.alt.length > 5).toBe(true);
  });

  it("o tipo não tem onde colocar depoimento, preço ou galeria", () => {
    const chaves = Object.keys(siteConfig.conteudo);
    for (const proibida of ["depoimentos", "servicos", "galeria", "ctaFinal"]) {
      expect(chaves).not.toContain(proibida);
    }
    expect(JSON.stringify(siteConfig)).not.toMatch(/"(preco|nota|depoimentos?)"/);
  });

  it.each(configs)("config %s: CRP no config e primeiro contato em 3 passos", (_nome, config) => {
    expect(config.negocio.registroProfissional.conselho).toBe("CRP");
    expect(config.conteudo.comoFunciona.itens).toHaveLength(3);
  });

  it("o FAQ do config principal trata de valores como 'sob consulta'", () => {
    const resposta = siteConfig.conteudo.faq.itens.find((i) => /valor/i.test(i.pergunta))?.resposta;
    expect(resposta).toMatch(/sob consulta/);
  });

  it("a foto da profissional é um placeholder no modelo", () => {
    expect(siteConfig.imagens.profissional).toBeUndefined();
    expect(siteConfig.conteudo.rotulos.fotoProfissional).toBe("[FOTO DA PROFISSIONAL]");
  });
});

describe("estrutura do config", () => {
  it.each(configs)("config %s: ids de seção únicos e todas as seções do modelo presentes", (_nome, config) => {
    const ids = config.secoes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(["hero", "sobre", "ajuda", "comoFunciona", "atendimento", "faq", "contato"]);
  });

  it.each(configs)("config %s: botões que levam a uma seção apontam para seção ativa", (_nome, config) => {
    const ativas = config.secoes.filter((s) => s.ativo).map((s) => s.id);
    const { hero, contato } = config.conteudo;
    expect(ativas).toContain(hero.ctaSecundario.secao);
    expect(ativas).toContain(contato.opcaoComoFunciona.secao);
  });

  it.each(configs)("config %s: toda imagem tem alt", (_nome, config) => {
    const { hero, profissional } = config.imagens;
    const todas = [hero, profissional, { src: config.meta.ogImage, alt: config.meta.ogImageAlt }].filter((i) => i !== undefined);
    for (const item of config.conteudo.atendimento.itens) if (item.imagem) todas.push(item.imagem);
    for (const img of todas) expect(img.alt.trim().length).toBeGreaterThan(5);
  });
});

describe("contraste das cores (mínimo 4.5:1)", () => {
  it.each(configs)("config %s", (_nome, { tema }) => {
    const c = tema.cores;
    const atenuadoSobreEscuro = misturar(c.fundo, c.escuro, 78);
    const pares: [string, string, string][] = [
      ["texto / fundo", c.texto, c.fundo],
      ["texto / superfície", c.texto, c.superficie],
      ["texto / suave", c.texto, c.suave],
      ["texto secundário / fundo", c.textoSecundario, c.fundo],
      ["texto secundário / superfície", c.textoSecundario, c.superficie],
      ["texto secundário / suave", c.textoSecundario, c.suave],
      ["secundária / fundo (eyebrow, link)", c.secundaria, c.fundo],
      ["secundária / superfície", c.secundaria, c.superficie],
      ["secundária / suave", c.secundaria, c.suave],
      ["destaque / fundo (texto em destaque)", c.destaque, c.fundo],
      ["destaque / superfície", c.destaque, c.superficie],
      ["superfície / destaque (texto do botão)", c.superficie, c.destaque],
      ["fundo / escuro (rodapé)", c.fundo, c.escuro],
      ["suave / escuro (links do rodapé)", c.suave, c.escuro],
      ["texto atenuado / escuro", atenuadoSobreEscuro, c.escuro],
    ];
    for (const [nome, a, b] of pares) {
      expect(contraste(a, b), nome).toBeGreaterThanOrEqual(4.5);
    }
  });
});
