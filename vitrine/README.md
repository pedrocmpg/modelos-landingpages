# Vitrine dos modelos

Página estática (HTML + CSS, **sem JavaScript**) com um cartão por modelo: captura do hero,
nicho, nome do estilo, link da demonstração e um botão de WhatsApp. É a página para mandar a
um cliente que quer ver o que existe.

## Preencher (uma vez)

Edite só o [vitrine.config.mjs](vitrine.config.mjs):

| Campo | O que é |
| --- | --- |
| `dono.nome` | Seu nome, como aparece no topo e no `og:site_name`. |
| `dono.whatsapp` | Só dígitos, com 55 + DDD (ex.: `5511912345678`). O gerador recusa outro formato. |
| `dono.mensagem` | Texto pré-pronto do botão de WhatsApp; cada cartão acrescenta o nome do modelo. |
| `pagina.url` | URL pública da vitrine, com barra final (base de `og:url` e `og:image`). |
| `pagina.noindex` | `true` = `<meta robots noindex, nofollow>`. |

Os valores que vêm no repositório (`Seu Nome Exemplo`, `5500900000000`) são fictícios; o gerador
avisa enquanto não forem trocados.

## Gerar

Na pasta [../ferramentas](../ferramentas) (uma vez: `npm install`):

```bash
npm run og        # builda cada modelo, gera public/og-image.png de cada um e as capturas daqui
npm run vitrine   # escreve vitrine/index.html e vitrine/og-image.png
npm test          # confere cartões, WhatsApp do config, Open Graph, "sem script"
```

`node gerar-og.mjs --so-vitrine` refaz só as capturas desta pasta, sem mexer nos
`og-image.png` dos modelos.

Cartões, nomes, nichos, descrições e links saem do config de cada modelo (`meta.url`,
`meta.ogDescription`), então um modelo novo em `nicho/nicho-NN-estilo/` entra sozinho na
próxima geração.

## Publicar

A pasta `vitrine/` inteira (`index.html`, `og-image.png`, `capturas/`) é o site: qualquer
hospedagem estática serve. Os links apontam para as demonstrações de cada modelo.
