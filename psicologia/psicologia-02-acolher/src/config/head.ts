// Tudo que vai no <head> / fora do React, gerado a partir do config:
// título, descrição, robots, Open Graph, fontes, variáveis do tema,
// robots.txt e o resumo exibido quando o JavaScript não roda.

import { mailtoHref, preenchido, telHref, whatsappUrl } from "./links.ts";
import { googleFontsHref, temaCss } from "./theme.ts";
import { semMarcacao } from "./titulo.ts";
import type { SiteConfig } from "./types.ts";

export function escapeHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** "pt-BR" -> "pt_BR" (formato do og:locale). */
function ogLocale(lang: string): string {
  return lang.replace("-", "_");
}

function urlAbsoluta(caminho: string, base?: string): string | undefined {
  if (!base) return undefined;
  try {
    return new URL(caminho, base).toString();
  } catch {
    return undefined;
  }
}

export function renderHeadTags(config: SiteConfig): string {
  const { meta, negocio, tema, imagens } = config;
  const e = escapeHtml;
  const tags: string[] = [
    `<title>${e(meta.title)}</title>`,
    `<meta name="description" content="${e(meta.description)}" />`,
    `<meta name="theme-color" content="${e(tema.cores.fundo)}" />`,
  ];

  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  }

  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${e(negocio.nome)}" />`,
    `<meta property="og:title" content="${e(meta.title)}" />`,
    `<meta property="og:description" content="${e(meta.description)}" />`,
    `<meta property="og:locale" content="${e(ogLocale(meta.lang))}" />`,
  );

  if (meta.url) {
    tags.push(`<meta property="og:url" content="${e(meta.url)}" />`);
  }

  const imagemOg = imagens.og ? urlAbsoluta(imagens.og.src, meta.url) : undefined;
  if (imagens.og && imagemOg) {
    tags.push(
      `<meta property="og:image" content="${e(imagemOg)}" />`,
      `<meta property="og:image:alt" content="${e(imagens.og.alt)}" />`,
    );
  }
  tags.push(
    `<meta name="twitter:card" content="${imagemOg ? "summary_large_image" : "summary"}" />`,
  );

  tags.push(
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<link rel="stylesheet" href="${e(googleFontsHref(tema))}" />`,
    `<style id="tema">${temaCss(tema)}</style>`,
  );

  return tags.join("\n    ");
}

/** Conteúdo mínimo para quem está sem JavaScript. */
export function renderNoscript(config: SiteConfig): string {
  const { negocio, contato, conteudo } = config;
  const e = escapeHtml;
  const registro = negocio.registroProfissional;
  const horarios = contato.horarios
    .map((h) => `<li>${e(h.dias)}: ${e(h.horas)}</li>`)
    .join("");

  const partes = [
    `<h1>${e(negocio.nome)}</h1>`,
    `<p>${e(registro.conselho)} ${e(registro.numero)}</p>`,
    `<p>${e(semMarcacao(conteudo.hero.titulo))}</p>`,
    `<p>${e(conteudo.hero.subtitulo)}</p>`,
    `<p><a href="${e(whatsappUrl(contato))}">${e(conteudo.rotulos.conversarWhatsapp)}</a></p>`,
    `<p>${e(conteudo.rotulos.telefone)}: <a href="${e(telHref(contato.telefoneExibicao))}">${e(contato.telefoneExibicao)}</a></p>`,
  ];
  if (preenchido(contato.email)) {
    partes.push(
      `<p>${e(conteudo.rotulos.email)}: <a href="${e(mailtoHref(contato.email))}">${e(contato.email)}</a></p>`,
    );
  }
  partes.push(`<p>${e(conteudo.rotulos.endereco)}: ${e(contato.endereco)}</p>`);
  if (horarios) partes.push(`<ul>${horarios}</ul>`);

  return `<noscript><main style="max-width:640px;margin:0 auto;padding:40px 20px;font-family:var(--fonte-texto);color:var(--cor-texto);line-height:1.6">${partes.join("")}</main></noscript>`;
}

export function robotsTxt(config: SiteConfig): string {
  return config.meta.noindex
    ? "# Site de demonstração: bloqueia todos os buscadores.\nUser-agent: *\nDisallow: /\n"
    : "User-agent: *\nAllow: /\n";
}

/** Aplica o resultado de renderHeadTags/renderNoscript ao index.html. */
export function aplicarAoHtml(html: string, config: SiteConfig): string {
  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${escapeHtml(config.meta.lang)}"`)
    .replace("<!--SITE_HEAD-->", renderHeadTags(config))
    .replace("<!--SITE_NOSCRIPT-->", renderNoscript(config));
}
