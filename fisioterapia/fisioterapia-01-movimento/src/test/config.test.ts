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
    expect(partesDoTitulo("Cuidado com o *movimento* do corpo")).toEqual([
      { texto: "Cuidado com o ", destaque: false },
      { texto: "movimento", destaque: true },
      { texto: " do corpo", destaque: false },
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
      "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700" +
        "&family=Instrument+Sans:wght@400;500;600;700&display=swap",
    );
  });

  it("inclui a fonte de rótulos quando existe e não repete famílias iguais", () => {
    expect(googleFontsHref(altConfig.tema)).toContain("family=DM+Mono:wght@400;500");
    const tema = structuredClone(altConfig.tema);
    tema.fontes.rotulo = undefined;
    tema.fontes.texto = { ...tema.fontes.titulo };
    expect(googleFontsHref(tema).match(/family=/g)).toHaveLength(1);
    expect(temaCss(tema)).toContain('--fonte-rotulo:"Young Serif"');
  });

  it("transforma cores, fontes e raios em variáveis CSS", () => {
    const css = temaCss(altConfig.tema);
    expect(css).toContain("--cor-primaria:#6B3FA0");
    expect(css).toContain("--cor-suave:#EADFF5");
    expect(css).toContain('--fonte-titulo:"Young Serif", Georgia, serif');
    expect(css).toContain('--fonte-rotulo:"DM Mono", ui-monospace, monospace');
    expect(css).toContain("--raio-cartao:10px");
    expect(css).not.toContain("#0F5C5C");
  });

  it.each(configs)("config %s não usa fontes proibidas", (_nome, config) => {
    const { titulo, texto, rotulo } = config.tema.fontes;
    for (const fonte of [titulo, texto, rotulo]) {
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
    expect(head).toContain("<title>Fisioterapeuta Marcos Teste | Fisioterapia em Vila Modelo</title>");
    expect(head).toContain('property="og:title"');
    expect(head).toContain('property="og:description"');
    expect(head).toContain('property="og:url" content="https://teste.example/"');
    expect(head).toContain('property="og:image" content="https://teste.example/images/og-teste.jpg"');
    expect(head).toContain('name="twitter:card" content="summary_large_image"');
  });

  it("escapa HTML dos textos do config", () => {
    const cfg = structuredClone(siteConfig);
    cfg.meta.title = 'A "B" <script>';
    expect(renderHeadTags(cfg)).toContain("A &quot;B&quot; &lt;script&gt;");
  });

  it("aplica lang, head e noscript (com o CREFITO) ao index.html", () => {
    const html = aplicarAoHtml(
      '<html lang="xx"><head><!--SITE_HEAD--></head><body><!--SITE_NOSCRIPT--></body></html>',
      altConfig,
    );
    expect(html).toContain('<html lang="pt-BR"');
    expect(html).toContain("Fisioterapeuta Marcos Teste");
    expect(html).toContain("<noscript>");
    expect(html).toContain("CREFITO 9/999999-F");
    expect(html).toContain("5500911111111");
    expect(html).not.toContain("João Exemplo");
    expect(html).not.toContain("*");
    expect(html).not.toContain("<!--SITE_");
  });
});

describe("dados fictícios", () => {
  it("o config principal usa apenas os dados fictícios do padrão", () => {
    expect(siteConfig.negocio.nome).toBe("Fisioterapeuta João Exemplo");
    expect(siteConfig.negocio.registroProfissional).toEqual({ conselho: "CREFITO", numero: "0/000000-F" });
    expect(siteConfig.contato.telefoneExibicao).toBe("(00) 90000-0000");
    expect(siteConfig.contato.whatsapp).toBe("5500900000000");
    expect(siteConfig.contato.email).toBe("contato@exemplo.com");
  });

  it.each(configs)("config %s não tem telefone com DDD real", (_nome, config) => {
    const texto = JSON.stringify(config);
    for (const m of texto.matchAll(/\((\d{2})\)\s?\d{4,5}-\d{4}/g)) expect(m[1]).toBe("00");
    for (const m of texto.matchAll(/"55(\d{2})\d{8,9}"/g)) expect(m[1]).toBe("00");
  });

  it.each(configs)("config %s: o CREFITO tem número fictício", (_nome, config) => {
    const { numero } = config.negocio.registroProfissional;
    expect(numero === "0/000000-F" || numero === "9/999999-F").toBe(true);
  });
});

// Regras de publicidade em fisioterapia, verificadas no config inteiro.
describe("regras de conteúdo (COFFITO/CREFITO)", () => {
  const proibidos: [string, RegExp][] = [
    ["preço em reais", /R\$|\breais\b/i],
    ["gratuidade ou promoção", /gr[aá]tis|gratuit[oa]|promo[cç][aã]o|promo[cç][oõ]es|desconto|cortesia|sem custo/i],
    ["promessa de cura ou resultado", /\bcura\b|\bcurar\b|garant(ia|imos|ido|e)\b|\bresultados?\b|comprovad[oa]|\beficaz|milagr/i],
    ["promessa de ausência de dor", /sem dor|livre de dor|dor zero|fim da dor|adeus (à )?dor|acabe com|elimin(a|e|ar) a dor/i],
    ["tempo de recuperação", /recupera[cç][aã]o|recuperar|r[aá]pid[oa]|imediat[oa]|\bem \d+ (dias|semanas|meses|sess[oõ]es)\b/i],
    ["depoimento ou avaliação de pacientes", /depoimento|avalia[cç][oõ]es|estrelas|nota \d/i],
    ["antes e depois", /antes e depois|antes\/depois/i],
    ["autopromoção sensacionalista", /\bmelhor(es)?\b|n[uú]mero 1|\bl[ií]der\b|o [uú]nico|refer[eê]ncia em/i],
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
    const { hero, profissional, og } = config.imagens;
    const ambientes = config.conteudo.estrutura.itens.map((i) => i.imagem);
    for (const img of [hero, og, ...ambientes]) {
      if (img) expect(img.alt, img.src).not.toMatch(/\b(pessoas?|mulher|homem|crian[cç]as?|rosto|paciente)\b/i);
    }
    expect(profissional === undefined || profissional.alt.length > 5).toBe(true);
  });

  it("o tipo não tem onde colocar depoimento, preço, promoção ou antes e depois", () => {
    const chaves = Object.keys(siteConfig.conteudo);
    for (const proibida of ["depoimentos", "servicos", "galeria", "ctaFinal", "precos", "antesDepois"]) {
      expect(chaves).not.toContain(proibida);
    }
    expect(JSON.stringify(siteConfig)).not.toMatch(/"(preco|nota|depoimentos?|antes|depois)"/);
  });

  it.each(configs)("config %s: CREFITO no config e como funciona em 3 etapas", (_nome, config) => {
    expect(config.negocio.registroProfissional.conselho).toBe("CREFITO");
    expect(config.conteudo.comoFunciona.itens).toHaveLength(3);
  });

  it("o FAQ do config principal trata de valores como 'sob consulta'", () => {
    const resposta = siteConfig.conteudo.faq.itens.find((i) => /valor/i.test(i.pergunta))?.resposta;
    expect(resposta).toMatch(/sob consulta/);
  });

  it("a foto do profissional é um placeholder no modelo", () => {
    expect(siteConfig.imagens.profissional).toBeUndefined();
    expect(siteConfig.conteudo.rotulos.fotoProfissional).toBe("[FOTO DO FISIOTERAPEUTA]");
  });
});

describe("estrutura do config", () => {
  it.each(configs)("config %s: ids de seção únicos e todas as seções do modelo presentes", (_nome, config) => {
    const ids = config.secoes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(["hero", "sobre", "areas", "comoFunciona", "estrutura", "faq", "contato"]);
  });

  it.each(configs)("config %s: o botão do hero aponta para uma seção ativa", (_nome, config) => {
    const ativas = config.secoes.filter((s) => s.ativo).map((s) => s.id);
    expect(ativas).toContain(config.conteudo.hero.ctaSecundario.secao);
  });

  it("o botão secundário do hero é 'Ver tratamentos' e leva às áreas", () => {
    expect(siteConfig.conteudo.hero.ctaSecundario).toEqual({ texto: "Ver tratamentos", secao: "areas" });
  });

  it.each(configs)("config %s: toda imagem tem alt", (_nome, config) => {
    const { hero, profissional, og } = config.imagens;
    const todas = [hero, profissional, og].filter((i) => i !== undefined);
    for (const item of config.conteudo.estrutura.itens) todas.push(item.imagem);
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
      ["primária / fundo (botão de contorno)", c.primaria, c.fundo],
      ["destaque / fundo (palavra em destaque)", c.destaque, c.fundo],
      ["destaque / superfície", c.destaque, c.superficie],
      ["superfície / destaque (texto do botão)", c.superficie, c.destaque],
      ["fundo / escuro (textos sobre o escuro)", c.fundo, c.escuro],
      ["suave / escuro (rótulos e destaques sobre o escuro)", c.suave, c.escuro],
      ["texto atenuado / escuro", atenuadoSobreEscuro, c.escuro],
    ];
    for (const [nome, a, b] of pares) {
      expect(contraste(a, b), nome).toBeGreaterThanOrEqual(4.5);
    }
  });
});
