import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App.tsx";
import altConfig from "../config/site.config.alt.ts";
import siteConfig from "../config/site.config.ts";
import { whatsappUrl } from "../config/links.ts";
import type { SiteConfig } from "../config/types.ts";

// Todas as strings (de qualquer profundidade) de um valor do config.
function textos(valor: unknown, saida: string[] = []): string[] {
  if (typeof valor === "string") saida.push(valor);
  else if (Array.isArray(valor)) valor.forEach((v) => textos(v, saida));
  else if (valor && typeof valor === "object") Object.values(valor).forEach((v) => textos(v, saida));
  return saida;
}

const clone = (c: SiteConfig) => structuredClone(c);

describe("o app é função do config (config alternativo)", () => {
  it("mostra nome, telefone e um texto de cada seção do config alternativo", () => {
    const { container } = render(<App config={altConfig} />);
    const c = altConfig.conteudo;

    // Negócio e contato
    expect(screen.getAllByText(altConfig.negocio.nome).length).toBeGreaterThan(0);
    const telefone = screen.getByRole("link", { name: altConfig.contato.telefoneExibicao });
    expect(telefone).toHaveAttribute("href", "tel:+5500911111111");
    expect(screen.getAllByRole("link", { name: /Marcar pelo WhatsApp/ })[0]).toHaveAttribute(
      "href",
      whatsappUrl(altConfig.contato),
    );
    expect(screen.getByText(altConfig.contato.endereco)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: altConfig.contato.email! })).toBeInTheDocument();

    // Um texto de cada seção
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(c.hero.titulo);
    expect(screen.getByText(c.sobre!.paragrafos[0])).toBeInTheDocument();
    expect(screen.getByText(c.diferenciais.itens[0].titulo)).toBeInTheDocument();
    expect(screen.getByText(c.servicos.itens[0].titulo)).toBeInTheDocument();
    expect(screen.getByText(c.servicos.itens[0].preco!)).toBeInTheDocument();
    expect(screen.getByText(c.comoFunciona!.itens[0].titulo)).toBeInTheDocument();
    expect(screen.getByText(c.galeria.titulo)).toBeInTheDocument();
    expect(screen.getByAltText("Depois de teste")).toBeInTheDocument();
    expect(screen.getByText(c.depoimentos.itens[0].texto)).toBeInTheDocument();
    expect(screen.getByText(c.faq.itens[0].pergunta)).toBeInTheDocument();
    expect(screen.getByText(c.ctaFinal!.titulo)).toBeInTheDocument();
    expect(screen.getByText(c.contato.texto!)).toBeInTheDocument();
    expect(screen.getByText(c.rodape.texto!)).toBeInTheDocument();
    expect(screen.getByText(`${altConfig.negocio.registroProfissional!.conselho} ${altConfig.negocio.registroProfissional!.numero}`)).toBeInTheDocument();

    // Rótulos e redes também vêm do config
    expect(screen.getAllByText(c.rotulos.exemplo).length).toBeGreaterThan(0);
    expect(container.querySelector(`a[href="${altConfig.redes.instagram}"]`)).not.toBeNull();
    expect(container.querySelector(`a[href="${altConfig.redes.facebook}"]`)).not.toBeNull();
    expect(container.querySelector("iframe")).toHaveAttribute("src", altConfig.contato.mapaEmbedUrl);
  });

  it("não deixa nada do config principal em lugar nenhum da página", () => {
    const { container } = render(<App config={altConfig} />);
    const html = container.innerHTML;
    const ids: string[] = siteConfig.secoes.map((x) => x.id);
    const principal = [
      siteConfig.negocio.nome,
      siteConfig.negocio.cidade,
      siteConfig.contato.telefoneExibicao,
      siteConfig.contato.whatsapp,
      siteConfig.contato.email!,
      siteConfig.contato.endereco,
      siteConfig.contato.mapaEmbedUrl!,
      siteConfig.redes.instagram!,
      // todo texto de conteúdo do config principal
      // (ids de seção como "depoimentos" são âncoras, não texto)
      ...textos(siteConfig.conteudo).filter((t) => t.length >= 10 && !ids.includes(t) && !t.startsWith("/images/")),
      ...textos(siteConfig.imagens).filter((t) => t.length >= 10 && !t.startsWith("/images/")),
    ];
    for (const texto of principal) {
      expect(html, `"${texto}" ficou fixo no código`).not.toContain(texto);
    }
    // Também fora do #root: título, idioma e tema.
    expect(document.title).toBe(altConfig.meta.title);
    expect(document.title).not.toContain(siteConfig.negocio.nome);
    expect(document.getElementById("tema")?.textContent).toContain(altConfig.tema.cores.primaria);
    expect(document.getElementById("tema")?.textContent).not.toContain(siteConfig.tema.cores.primaria);
  });

  it("o menu e o rodapé seguem a ordem e os rótulos do config", () => {
    render(<App config={altConfig} />);
    const menu = screen.getAllByRole("navigation", { name: altConfig.conteudo.rotulos.menuPrincipal })[0];
    const rotulos = within(menu)
      .getAllByRole("link")
      .map((a) => a.textContent);
    expect(rotulos).toEqual([
      ...altConfig.secoes.filter((s) => s.ativo && s.menu).map((s) => s.menu),
      altConfig.conteudo.rotulos.agendar,
    ]);
  });

  it("seção desativada some do corpo e do menu", () => {
    const cfg = clone(altConfig);
    cfg.secoes.find((s) => s.id === "faq")!.ativo = false;
    const { container } = render(<App config={cfg} />);
    expect(screen.queryByText(cfg.conteudo.faq.itens[0].pergunta)).toBeNull();
    expect(container.querySelector("#faq")).toBeNull();
    expect(screen.queryByRole("link", { name: "FAQ" })).toBeNull();
  });

  it("campo opcional vazio faz o bloco sumir sem quebrar", () => {
    const cfg = clone(altConfig);
    cfg.contato.email = "";
    cfg.contato.mapaEmbedUrl = "";
    cfg.contato.horarios = [];
    cfg.redes = { instagram: "", facebook: undefined };
    cfg.negocio.registroProfissional = undefined;
    cfg.conteudo.depoimentos.nota = undefined;
    cfg.conteudo.hero.ctaSecundario = undefined;
    cfg.conteudo.hero.selo = undefined;
    cfg.conteudo.hero.anotacao = undefined;
    cfg.conteudo.servicos.itens[0].preco = "";
    cfg.conteudo.servicos.observacao = undefined;
    cfg.conteudo.rodape.texto = undefined;
    const { container } = render(<App config={cfg} />);
    const r = cfg.conteudo.rotulos;

    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
    expect(screen.queryByText(r.email)).toBeNull();
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.queryByText(r.horarios)).toBeNull();
    expect(screen.queryByText(r.redes)).toBeNull();
    expect(screen.queryByText("CRMV-TS 0000")).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.depoimentos.nota!.rotulo, { exact: false })).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.hero.ctaSecundario!.texto)).toBeNull();
    expect(screen.queryByText(altConfig.conteudo.servicos.itens[0].preco!)).toBeNull();
    // O resto continua inteiro
    expect(screen.getByText(cfg.contato.endereco)).toBeInTheDocument();
    expect(screen.getByText(cfg.conteudo.faq.itens[0].pergunta)).toBeInTheDocument();
  });
});

describe("config principal", () => {
  it("marca depoimentos, nota e fotos de exemplo com o selo", () => {
    const { container } = render(<App config={siteConfig} />);
    const selos = container.querySelectorAll(".selo-exemplo");
    const rotulos = Array.from(selos).map((s) => s.textContent);
    // 3 depoimentos + nota (hero e seção) + fotos de exemplo da galeria
    expect(rotulos.filter((t) => t === siteConfig.conteudo.rotulos.exemplo).length).toBeGreaterThanOrEqual(5);
    expect(rotulos.filter((t) => t === siteConfig.conteudo.rotulos.fotoExemplo)).toHaveLength(
      siteConfig.imagens.galeria.length,
    );
  });

  it("mostra só os dados fictícios e só as seções ativas", () => {
    const { container } = render(<App config={siteConfig} />);
    expect(screen.getAllByText("Pet Shop Exemplo").length).toBeGreaterThan(0);
    expect(screen.getByText("(00) 90000-0000")).toBeInTheDocument();
    expect(screen.getByText("Rua Exemplo, 123 - Centro")).toBeInTheDocument();
    expect(container.querySelector("#sobre")).toBeNull();
    expect(container.querySelector("#comoFunciona")).toBeNull();
    expect(container.querySelector("#ctaFinal")).toBeNull();
    expect(container.querySelector("#servicos")).not.toBeNull();
    expect(container.querySelector("#faq")).not.toBeNull();
  });

  it("toda imagem renderizada tem alt", () => {
    const { container } = render(<App config={siteConfig} />);
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBeGreaterThan(0);
    imgs.forEach((img) => expect(img.getAttribute("alt")?.length).toBeGreaterThan(5));
  });

  it("a barra do celular e o link do WhatsApp usam a mensagem do config", () => {
    render(<App config={siteConfig} />);
    const links = screen.getAllByRole("link", { name: /Agendar pelo WhatsApp/ });
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const a of links) expect(a).toHaveAttribute("href", whatsappUrl(siteConfig.contato));
    expect(links[0].getAttribute("href")).toContain("wa.me/5500900000000");
  });
});

describe("carteirinha e manifesto (config alternativo)", () => {
  const c = altConfig.conteudo;

  it("a carteirinha monta o pedido do WhatsApp com as opções escolhidas", async () => {
    render(<App config={altConfig} />);
    const botao = screen.getByRole("link", { name: c.carteirinha!.botao });
    // Sem escolha: só a mensagem padrão do config.
    expect(botao).toHaveAttribute("href", whatsappUrl(altConfig.contato));
    expect(screen.getByText(c.carteirinha!.resumoVazio)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("radio", { name: "Mini teste" }));
    await userEvent.click(screen.getByRole("radio", { name: "Opção B teste" }));

    const mensagem = [
      altConfig.contato.mensagemWhatsapp,
      "Tamanho de teste: Mini teste",
      "Tratamento de teste: Opção B teste",
    ].join("\n");
    expect(botao).toHaveAttribute("href", whatsappUrl({ ...altConfig.contato, mensagemWhatsapp: mensagem }));
    expect(screen.queryByText(c.carteirinha!.resumoVazio)).toBeNull();
    expect(screen.getByText("Tamanho de teste: Mini teste · Tratamento de teste: Opção B teste")).toBeInTheDocument();
  });

  it("o manifesto tem a frase inteira como título para leitor de tela", () => {
    render(<App config={altConfig} />);
    expect(screen.getByRole("heading", { level: 2, name: c.manifesto!.frase })).toBeInTheDocument();
    expect(screen.getByText(c.manifesto!.assinatura!)).toBeInTheDocument();
  });

  it("seção nova desativada ou sem conteúdo some sem quebrar", () => {
    const cfg = clone(altConfig);
    cfg.conteudo.manifesto = undefined;
    cfg.conteudo.carteirinha = undefined;
    const { container } = render(<App config={cfg} />);
    expect(container.querySelector("#manifesto")).toBeNull();
    expect(container.querySelector("#carteirinha")).toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
