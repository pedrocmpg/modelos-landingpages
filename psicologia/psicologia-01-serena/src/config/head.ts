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

/** Largura e altura do cartão de compartilhamento (padrão de og:image). */
export const OG_LARGURA = 1200;
export const OG_ALTURA = 630;

/** Resolve a imagem do cartão contra meta.url. Falha alto em vez de omitir a tag. */
function urlAbsoluta(caminho: string, base: string): string {
  try {
    return new URL(caminho, base).toString();
  } catch {
    throw new Error(
      `meta.url ("${base}") ou meta.ogImage ("${caminho}") inválido: use uma URL completa, ex.: https://exemplo.com.br/`,
    );
  }
}

export function renderHeadTags(config: SiteConfig): string {
  const { meta, tema } = config;
  const e = escapeHtml;
  const tags: string[] = [
    `<title>${e(meta.title)}</title>`,
    `<meta name="description" content="${e(meta.description)}" />`,
    `<meta name="theme-color" content="${e(meta.themeColor)}" />`,
    `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`,
  ];

  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`);
  }

  const imagem = urlAbsoluta(meta.ogImage, meta.url);
  tags.push(
    `<link rel="canonical" href="${e(meta.url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${e(meta.siteName)}" />`,
    `<meta property="og:title" content="${e(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${e(meta.ogDescription)}" />`,
    `<meta property="og:locale" content="${e(meta.locale)}" />`,
    `<meta property="og:url" content="${e(meta.url)}" />`,
    `<meta property="og:image" content="${e(imagem)}" />`,
    `<meta property="og:image:width" content="${OG_LARGURA}" />`,
    `<meta property="og:image:height" content="${OG_ALTURA}" />`,
    `<meta property="og:image:alt" content="${e(meta.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${e(meta.ogTitle)}" />`,
    `<meta name="twitter:description" content="${e(meta.ogDescription)}" />`,
    `<meta name="twitter:image" content="${e(imagem)}" />`,
    `<meta name="twitter:image:alt" content="${e(meta.ogImageAlt)}" />`,
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

/**
 * Sempre libera os rastreadores: quem bloqueia a indexação é o <meta robots>
 * (meta.noindex). Com Disallow, os robôs nem leriam o noindex nem o cartão
 * Open Graph que o WhatsApp, o LinkedIn e a Meta buscam ao colar o link.
 */
export function robotsTxt(_config: SiteConfig): string {
  return "User-agent: *\nAllow: /\n";
}

/** Aplica o resultado de renderHeadTags/renderNoscript ao index.html. */
export function aplicarAoHtml(html: string, config: SiteConfig): string {
  return html
    .replace(/<html lang="[^"]*"/, `<html lang="${escapeHtml(config.meta.lang)}"`)
    .replace("<!--SITE_HEAD-->", renderHeadTags(config))
    .replace("<!--SITE_NOSCRIPT-->", renderNoscript(config));
}
