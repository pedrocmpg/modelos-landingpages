import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App.tsx";
import altConfig from "../config/site.config.alt.ts";
import siteConfig from "../config/site.config.ts";
import { whatsappUrl } from "../config/links.ts";
import { semMarcacao } from "../config/titulo.ts";
import type { SiteConfig } from "../config/types.ts";

// Todas as strings (de qualquer profundidade) de um valor do config.
function textos(valor: unknown, saida: string[] = []): string[] {
  if (typeof valor === "string") saida.push(valor);
  else if (Array.isArray(valor)) valor.forEach((v) => textos(v, saida));
  else if (valor && typeof valor === "object") Object.values(valor).forEach((v) => textos(v, saida));
  return saida;
}

const clone = (c: SiteConfig) => structuredClone(c);
const titulosH2 = () => screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

describe("o app é função do config (config alternativo)", () => {
  it("mostra nome, CRP, telefone e um texto de cada seção do config alternativo", () => {
    const { container } = render(<App config={altConfig} />);
    const c = altConfig.conteudo;
    const registro = altConfig.negocio.registroProfissional;

    // Negócio, CRP (cabeçalho e rodapé) e contato
    expect(screen.getAllByText(altConfig.negocio.nome).length).toBeGreaterThanOrEqual(2);
    const crp = `${registro.conselho} ${registro.numero}`;
    const naPagina = screen.getAllByText(crp);
    expect(naPagina.length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector("header")).toHaveTextContent(crp);
    expect(container.querySelector("footer")).toHaveTextContent(crp);
    expect(screen.getByRole("link", { name: altConfig.contato.telefoneExibicao })).toHaveAttribute(
      "href",
      "tel:+5500911111111",
    );
    expect(screen.getByText(altConfig.contato.endereco)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: altConfig.contato.email! })).toBeInTheDocument();

    // Títulos (com a marcação *destaque* resolvida), na ordem das seções
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(semMarcacao(c.hero.titulo));
    expect(titulosH2()).toEqual([
      semMarcacao(c.sobre.titulo),
      semMarcacao(c.ajuda.titulo),
      semMarcacao(c.comoFunciona.titulo),
      semMarcacao(c.atendimento.titulo),
      semMarcacao(c.faq.titulo),
      semMarcacao(c.contato.titulo),
    ]);
    expect(container.querySelectorAll("h2 em, h1 em").length).toBe(7);

    // Um texto de cada seção
    expect(screen.getByText(c.hero.subtitulo)).toBeInTheDocument();
    expect(screen.getByText(c.hero.selo!)).toBeInTheDocument();
    expect(screen.getByText(c.sobre.paragrafos[0])).toBeInTheDocument();
    expect(screen.getByText(c.sobre.formacao.itens[0])).toBeInTheDocument();
    expect(screen.getByText(c.sobre.abordagem.texto)).toBeInTheDocument();
    expect(screen.getByText(c.ajuda.itens[0].titulo)).toBeInTheDocument();
    expect(screen.getByText(c.ajuda.aviso!)).toBeInTheDocument();
    expect(screen.getByText(c.comoFunciona.itens[0].titulo)).toBeInTheDocument();
    expect(screen.getByText(c.comoFunciona.observacao!)).toBeInTheDocument();
    expect(screen.getByText(c.atendimento.itens[0].titulo)).toBeInTheDocument();
    expect(screen.getByText(c.atendimento.itens[0].detalhes![0])).toBeInTheDocument();
    expect(screen.getByAltText("Sala alternativa de teste vazia")).toBeInTheDocument();
    expect(screen.getByText(c.faq.itens[0].pergunta)).toBeInTheDocument();
    expect(screen.getByText(c.contato.texto!)).toBeInTheDocument();
    expect(screen.getByText(c.rodape.texto!)).toBeInTheDocument();
    expect(screen.getByText(c.rodape.urgencia!)).toBeInTheDocument();

    // Rótulos, redes, mapa e foto da profissional também vêm do config
    expect(screen.getAllByText(`${c.rotulos.passo} 1`).length).toBe(1);
    expect(screen.getAllByText(c.rotulos.fotoExemplo).length).toBeGreaterThan(0);
    expect(screen.getByAltText("Retrato alternativo do profissional de teste")).toBeInTheDocument();
    expect(screen.queryByText(c.rotulos.fotoProfissional)).toBeNull();
    expect(container.querySelector(`a[href="${altConfig.redes.instagram}"]`)).not.toBeNull();
    expect(container.querySelector(`a[href="${altConfig.redes.facebook}"]`)).not.toBeNull();
    expect(container.querySelector("iframe")).toHaveAttribute("src", altConfig.contato.mapaEmbedUrl);
  });

  it("não deixa nada do config principal em lugar nenhum da página", () => {
    const { container } = render(<App config={altConfig} />);
    const html = container.innerHTML;
    const texto = container.textContent ?? "";
    const ids: string[] = siteConfig.secoes.map((x) => x.id);
    const urls = [
      siteConfig.contato.mapaEmbedUrl!,
      siteConfig.redes.instagram!,
      ...textos(siteConfig.imagens).filter((t) => t.startsWith("/images/")),
    ];
    // ids de seção ("comoFunciona") são âncoras, não texto
    const visiveis = [
      siteConfig.negocio.nome,
      siteConfig.negocio.cidade,
      siteConfig.contato.telefoneExibicao,
      siteConfig.contato.email!,
      siteConfig.contato.endereco,
      ...textos(siteConfig.conteudo)
        .map(semMarcacao)
        .filter((t) => t.length >= 10 && !ids.includes(t)),
      ...textos(siteConfig.imagens).filter((t) => t.length >= 10 && !t.startsWith("/images/")),
    ];

    for (const t of visiveis) expect(texto, `"${t}" ficou fixo no código`).not.toContain(t);
    for (const u of [...urls, siteConfig.contato.whatsapp, siteConfig.negocio.registroProfissional.numero]) {
      expect(html, `"${u}" ficou fixo no código`).not.toContain(u);
    }

    // Também fora do #root: título, idioma e tema.
    expect(document.title).toBe(altConfig.meta.title);
    expect(document.title).not.toContain(siteConfig.negocio.nome);
    expect(document.getElementById("tema")?.textContent).toContain(altConfig.tema.cores.primaria);
    expect(document.getElementById("tema")?.textContent).not.toContain(siteConfig.tema.cores.primaria);
  });

  it("o menu segue a ordem e os rótulos do config", () => {
    render(<App config={altConfig} />);
    const menu = screen.getAllByRole("navigation", { name: altConfig.conteudo.rotulos.menuPrincipal })[0];
    const rotulos = within(menu)
      .getAllByRole("link")
      .map((a) => a.textContent);
    expect(rotulos).toEqual([
      ...altConfig.secoes.filter((s) => s.ativo && s.menu).map((s) => s.menu),
      altConfig.conteudo.rotulos.conversarWhatsapp,
    ]);
  });

  it("seção desativada some do corpo e do menu", () => {
    const cfg = clone(altConfig);
    cfg.secoes.find((s) => s.id === "faq")!.ativo = false;
    const { container } = render(<App config={cfg} />);
    expect(screen.queryByText(cfg.conteudo.faq.itens[0].pergunta)).toBeNull();
    expect(container.querySelector("#faq")).toBeNull();
    expect(screen.queryByRole("link", { name: "Dúvidas" })).toBeNull();
  });

  it("botão que leva a uma seção desligada some junto com ela", () => {
    const cfg = clone(altConfig);
    cfg.secoes.find((s) => s.id === "comoFunciona")!.ativo = false;
    render(<App config={cfg} />);
    expect(screen.queryByText(cfg.conteudo.hero.ctaSecundario.texto)).toBeNull();
    expect(screen.queryByText(cfg.conteudo.contato.opcaoComoFunciona.texto)).toBeNull();
    // O WhatsApp continua lá
    expect(screen.getAllByRole("link", { name: cfg.conteudo.contato.opcaoWhatsapp }).length).toBe(1);
  });

  it("campo opcional vazio faz o bloco sumir sem quebrar", () => {
    const cfg = clone(altConfig);
    cfg.contato.email = "";
    cfg.contato.mapaEmbedUrl = "";
    cfg.contato.horarios = [];
    cfg.redes = { instagram: "", facebook: undefined };
    cfg.imagens.profissional = undefined;
    cfg.imagens.hero.exemplo = false;
    cfg.conteudo.hero.selo = undefined;
    cfg.conteudo.hero.citacao = undefined;
    cfg.conteudo.sobre.introducao = undefined;
    cfg.conteudo.ajuda.aviso = undefined;
    cfg.conteudo.ajuda.itens[0].texto = "";
    cfg.conteudo.comoFunciona.observacao = undefined;
    cfg.conteudo.atendimento.observacao = undefined;
    cfg.conteudo.atendimento.itens[0].detalhes = undefined;
    cfg.conteudo.atendimento.itens[1].imagem = undefined;
    cfg.conteudo.contato.texto = undefined;
    cfg.conteudo.rodape = {};
    const { container } = render(<App config={cfg} />);
    const r = cfg.conteudo.rotulos;

    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(screen.queryByText(r.email)).toBeNull();
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.queryByText(r.horarios)).toBeNull();
    expect(screen.queryByText(r.redes)).toBeNull();
    // Sem foto da profissional: placeholder do config
    expect(screen.getByText(r.fotoProfissional)).toBeInTheDocument();
    expect(screen.queryByText(altConfig.conteudo.hero.selo!)).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.ajuda.aviso!)).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.comoFunciona.observacao!)).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.atendimento.itens[0].detalhes![0])).toBeNull();
    expect(screen.queryByAltText("Mesa alternativa de teste vazia")).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.rodape.texto!)).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.rodape.urgencia!)).toBeNull();
    // O resto continua inteiro
    expect(screen.getByText(cfg.contato.endereco)).toBeInTheDocument();
    expect(screen.getByText(cfg.conteudo.faq.itens[0].pergunta)).toBeInTheDocument();
    expect(container.querySelector("footer")).toHaveTextContent("CRP 99/99999");
  });
});

describe("config principal (psicologia)", () => {
  it("mostra só os dados fictícios, as 7 seções e o CRP no cabeçalho e no rodapé", () => {
    const { container } = render(<App config={siteConfig} />);
    expect(screen.getAllByText("Psicóloga Clara Exemplo").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("(00) 90000-0000")).toBeInTheDocument();
    expect(screen.getByText("Rua Exemplo, 123 - Sala 4 - Centro")).toBeInTheDocument();
    expect(container.querySelector("header")).toHaveTextContent("CRP 00/00000");
    expect(container.querySelector("footer")).toHaveTextContent("CRP 00/00000");
    for (const id of ["hero", "sobre", "ajuda", "comoFunciona", "atendimento", "faq", "contato"]) {
      expect(container.querySelector(`#${id}`), id).not.toBeNull();
    }
  });

  it("o primeiro contato tem 3 passos", () => {
    const { container } = render(<App config={siteConfig} />);
    expect(container.querySelectorAll("#comoFunciona .passo")).toHaveLength(3);
  });

  it("o contato tem duas opções de mesmo peso (mesmo elemento, mesma classe)", () => {
    const { container } = render(<App config={siteConfig} />);
    const botoes = container.querySelectorAll<HTMLAnchorElement>("#contato .opcoes a");
    expect(botoes).toHaveLength(2);
    expect(botoes[0].textContent).toBe("Conversar no WhatsApp");
    expect(botoes[1].textContent).toBe("Ver como funciona o atendimento");
    expect(botoes[0].className).toBe(botoes[1].className);
    expect(botoes[0]).toHaveAttribute("href", whatsappUrl(siteConfig.contato));
    expect(botoes[1]).toHaveAttribute("href", "#comoFunciona");
    // O hero tem o mesmo par
    const hero = container.querySelectorAll<HTMLAnchorElement>("#hero .opcoes a");
    expect(hero).toHaveLength(2);
    expect(hero[0].className).toBe(hero[1].className);
  });

  it("a foto da profissional é o placeholder [FOTO DA PROFISSIONAL]", () => {
    render(<App config={siteConfig} />);
    expect(screen.getByRole("img", { name: "[FOTO DA PROFISSIONAL]" })).toBeInTheDocument();
  });

  it("fotos de exemplo levam o selo e toda imagem tem alt", () => {
    const { container } = render(<App config={siteConfig} />);
    const comExemplo = 1 + siteConfig.conteudo.atendimento.itens.filter((i) => i.imagem?.exemplo).length;
    expect(container.querySelectorAll(".selo-exemplo")).toHaveLength(comExemplo);
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBeGreaterThan(0);
    imgs.forEach((img) => expect(img.getAttribute("alt")?.length).toBeGreaterThan(5));
  });

  it("o botão do WhatsApp usa o número e a mensagem do config", () => {
    render(<App config={siteConfig} />);
    const links = screen.getAllByRole("link", { name: /Conversar no WhatsApp/ });
    expect(links.length).toBeGreaterThanOrEqual(3); // cabeçalho, hero, contato
    for (const a of links) expect(a).toHaveAttribute("href", whatsappUrl(siteConfig.contato));
    expect(links[0].getAttribute("href")).toContain("wa.me/5500900000000");
  });
});

// O que o Conselho Federal de Psicologia não permite, procurado no texto que o
// visitante realmente lê (não só no config).
describe("regras de conteúdo (CFP) na página renderizada", () => {
  const proibidos: [string, RegExp][] = [
    ["preço", /R\$|\breais\b/i],
    ["gratuidade ou promoção", /gr[aá]tis|gratuit[oa]|promo[cç][aã]o|desconto|cortesia/i],
    ["promessa de cura ou resultado", /\bcura\b|\bcurar\b|garant(ia|imos|ido|e)\b|\bresultados?\b|comprovad[oa]/i],
    ["depoimento ou avaliação", /depoimento|avalia[cç][oõ]es|estrelas|nota \d/i],
    ["paciente como personagem", /\bpacientes?\b/i],
  ];

  it.each([
    ["principal", siteConfig],
    ["alternativo", altConfig],
  ] as [string, SiteConfig][])("config %s", (_nome, config) => {
    const { container } = render(<App config={config} />);
    const texto = container.textContent ?? "";
    for (const [nome, regex] of proibidos) expect(texto, nome).not.toMatch(regex);
    expect(container.querySelector("blockquote")).toBeNull();
    expect(container.querySelector("#depoimentos, #servicos, #galeria")).toBeNull();
  });

  it("o único lugar que fala de valores diz 'sob consulta'", () => {
    const { container } = render(<App config={siteConfig} />);
    const texto = container.textContent ?? "";
    expect(texto.match(/valores?/gi)?.length).toBeGreaterThan(0);
    expect(texto).toContain("sob consulta");
  });
});
