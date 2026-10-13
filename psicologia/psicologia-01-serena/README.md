# Psicologia 01 — Serena ("luz da manhã")

Landing page para psicóloga(o) clínica(o) em estilo **calmo, claro e com muito respiro**:
fundo areia, sálvia e argila escura; `Instrument Serif` nos títulos (com uma palavra em
itálico), `Hanken Grotesk` no texto e rótulos pequenos em caixa alta. Site estático (Vite +
React + TypeScript), animações com [motion](https://motion.dev) e rolagem suave com
[Lenis](https://lenis.darkroom.engineering/).

> Todos os dados deste modelo são **fictícios** ("Psicóloga Clara Exemplo", CRP 00/00000,
> (00) 90000-0000, Rua Exemplo, 123). As fotos são de ambiente, sem pessoas, e aparecem com o
> selo "foto de exemplo" enquanto `exemplo: true` estiver no config. A foto da profissional
> é um placeholder (`[FOTO DA PROFISSIONAL]`).

## Regras do Conselho Federal de Psicologia (já embutidas)

O modelo foi desenhado para não deixar o cliente escorregar:

- **Sem depoimentos, notas ou avaliações**, nem de exemplo. O tipo `SiteConfig` desta
  versão não tem campo para isso (nem para preços, promoções ou galeria de antes/depois).
- **Sem promessa de resultado, cura ou prazo; sem preços, promoções ou "primeira sessão
  grátis".** Valores aparecem como "sob consulta". Os testes procuram essas palavras no
  config **e** no texto renderizado da página.
- **CRP visível no cabeçalho e no rodapé** (`negocio.registroProfissional`, obrigatório).
- **Sem fotos de pacientes ou de pessoas em sessão.** Fotos de ambiente, sem pessoas, e o
  placeholder `[FOTO DA PROFISSIONAL]` até haver uma foto autorizada.
- **Contato com duas opções de mesmo peso** ("Conversar no WhatsApp" e "Ver como funciona
  o atendimento": mesmo elemento, tamanho e cor). Só landing page, sem agendamento online.
- Rodapé com aviso de caráter informativo e orientação para urgência (CVV 188 / SAMU 192).

> Estas regras são um ponto de partida técnico. A responsabilidade pelo conteúdo final do
> site é da(o) profissional: confira o texto com o Código de Ética e as resoluções do CFP
> antes de publicar.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (site estático)
npm run preview  # serve o dist/
npm test         # Vitest + Testing Library
npm run lint
```

## Como personalizar para um cliente

**Edite só [`src/config/site.config.ts`](src/config/site.config.ts).** O tipo
[`SiteConfig`](src/config/types.ts) mostra no editor o que cada campo aceita.

Nenhum texto, número, cor, fonte, link ou imagem fica escrito nos componentes. Cores e
fontes viram variáveis CSS no `:root`, o link do Google Fonts e o `<head>` (título,
descrição, Open Graph, `noindex`) são gerados do config, e o link do WhatsApp (`wa.me` com
a mensagem codificada) também. Campo opcional vazio faz o bloco sumir sem quebrar o layout.

O teste [`src/test/app.test.tsx`](src/test/app.test.tsx) prova isso: renderiza o app com
[`site.config.alt.ts`](src/config/site.config.alt.ts) (outro profissional fictício, todas as
seções ligadas) e confere que nada do config principal sobrou na página.

**Destaque em títulos:** cercar uma palavra com asteriscos a deixa em itálico:
`"Um espaço *sem pressa* para você se escutar"`. Use no máximo uma palavra-chave por título.

### Campos do config

| Campo | Tipo | O que é |
| --- | --- | --- |
| `meta.title` | texto | `<title>` (aba do navegador e Google). |
| `meta.description` | texto | Meta description (Google). |
| `meta.lang` | texto | Idioma do site (ex.: `pt-BR`). |
| `meta.noindex` | `true`/`false` | `true` = demo: `<meta robots noindex, nofollow>`. O `robots.txt` sempre libera os rastreadores (assim o noindex e o cartão de compartilhamento são lidos). Troque para `false` ao entregar. |
| `meta.url` | texto | URL pública final, com `https://` e barra final. Base de `og:url`, do `canonical` e da imagem do cartão. URL inválida **falha o build**. |
| `meta.ogTitle` | texto | Título do cartão de compartilhamento (`og:title`, `twitter:title`). |
| `meta.ogDescription` | texto | Descrição do cartão (`og:description`, `twitter:description`). |
| `meta.ogImage` | caminho | Imagem do cartão, 1200x630: caminho a partir de `public/` (ex.: `/og-image.png`) ou URL absoluta. |
| `meta.ogImageAlt` | texto | Texto alternativo da imagem do cartão. |
| `meta.siteName` | texto | Nome do site no cartão (`og:site_name`). Normalmente o nome do negócio. |
| `meta.locale` | texto | Idioma do cartão no formato do Open Graph (`og:locale`), ex.: `pt_BR`. |
| `meta.themeColor` | `#RRGGBB` | Cor da barra do navegador no celular (`theme-color`). Normalmente a cor de fundo. |
| `negocio.nome` | texto | Nome da profissional (cabeçalho, rodapé, Open Graph). |
| `negocio.slogan` | texto | Frase curta no rodapé. |
| `negocio.cidade` / `negocio.estado` | texto | Localização. |
| `negocio.registroProfissional` | `{ conselho, numero }` **obrigatório** | Ex.: `{ conselho: "CRP", numero: "06/12345" }`. Aparece no cabeçalho e no rodapé. |
| `contato.whatsapp` | só dígitos, com 55 | Ex.: `5500900000000`. |
| `contato.mensagemWhatsapp` | texto | Mensagem que já vem escrita no WhatsApp. |
| `contato.telefoneExibicao` | texto | Telefone como aparece na tela (vira link `tel:`). |
| `contato.email` | texto, opcional | Vazio = some. |
| `contato.endereco` | texto | Endereço exibido. |
| `contato.mapaEmbedUrl` | texto, opcional | URL de embed do Google Maps. Vazio = sem mapa. |
| `contato.horarios` | lista `{ dias, horas }` | Lista vazia = bloco de horários some. |
| `redes.instagram` / `redes.facebook` | URL, opcionais | Vazio = não aparece. |
| `tema.cores.primaria` | cor | Cor da marca: formas, linha e detalhes (não precisa de contraste de texto). |
| `tema.cores.secundaria` | cor | Eyebrows, links e foco. Precisa de contraste 4.5:1 sobre fundo, superfície e suave. |
| `tema.cores.destaque` | cor | Botões (texto na cor `superficie` por cima) e textos em destaque. |
| `tema.cores.fundo` / `superficie` / `suave` | cor | Fundo da página / cartões / faixas e formas claras. |
| `tema.cores.texto` / `textoSecundario` | cor | Texto principal e de apoio. |
| `tema.cores.escuro` | cor | Fundo do rodapé. |
| `tema.fontes.titulo` / `.texto` / `.destaque` | `{ familia, pesos, italico?, fallback }` | Família exata do Google Fonts. `destaque` é opcional (sem ela usa a do título). **Proibidas:** Inter, Roboto, Arial, Open Sans, Poppins, Montserrat (o teste reprova). Para o `*destaque*` dos títulos, `titulo.italico` deve ser `true`. |
| `tema.raio.cartao` / `tema.raio.botao` | px | Cantos de cartões e botões (`999` = pílula). |
| `tema.intensidadeAnimacao` | `"suave"` ou `"normal"` | `suave` reduz distâncias pela metade, alonga durações e desliga os loops (a "respiração" do hero). |
| `secoes[]` | `{ id, ativo, menu? }` | Ordem das seções e se aparecem. `menu` é o texto no menu. Ids: `hero`, `sobre`, `ajuda`, `comoFunciona`, `atendimento`, `faq`, `contato`. |
| `conteudo.hero` | `selo?`, `titulo`, `subtitulo`, `ctaPrimario`, `ctaSecundario { texto, secao }`, `citacao?` | Topo. `ctaPrimario` abre o WhatsApp; `ctaSecundario` leva a uma seção (some se a seção estiver desligada). |
| `conteudo.sobre` | cabeçalho + `paragrafos[]`, `formacao { titulo, itens[] }`, `abordagem { titulo, texto }` | Formação e abordagem. Usa `imagens.profissional` (ou o placeholder). |
| `conteudo.ajuda` | cabeçalho + `itens[] { titulo, texto? }`, `aviso?` | "Como posso ajudar": temas, **sem diagnóstico**. |
| `conteudo.comoFunciona` | cabeçalho + `itens[] { titulo, texto, icone? }` (3 passos), `observacao?` | Primeiro contato. |
| `conteudo.atendimento` | cabeçalho + `itens[] { titulo, texto, icone?, imagem?, detalhes? }`, `observacao?` | Presencial e online. |
| `conteudo.faq` | cabeçalho + `itens[] { pergunta, resposta }` | Valores: "sob consulta". |
| `conteudo.contato` | cabeçalho + `texto?`, `opcaoWhatsapp`, `opcaoComoFunciona { texto, secao }` | As duas opções têm o mesmo peso. |
| `conteudo.rodape` | `texto?`, `urgencia?` | Aviso informativo e orientação para urgência. |
| `conteudo.rotulos` | textos de interface | "Pular para o conteúdo", menu, "Conversar no WhatsApp", `fotoProfissional` (placeholder), "foto de exemplo", "Passo", endereço/telefone/horários... |
| `imagens.hero` | `{ src, alt, exemplo? }` | Foto de ambiente do topo (sem pessoas). |
| `imagens.profissional` | `{ src, alt, exemplo? }`, opcional | Foto da profissional. Vazio = placeholder `[FOTO DA PROFISSIONAL]`. |

Cabeçalho = `eyebrow?`, `titulo`, `introducao?`. Ícones (`icone`): `folha`, `coracao`,
`mensagem`, `calendario`, `relogio`, `escudo`, `casa`, `video`.

### Cartão de compartilhamento (Open Graph e Twitter)

Ao colar o link no WhatsApp, Instagram, LinkedIn ou X, o cartão sai das tags `og:*` e
`twitter:*`. Elas são **geradas no build** pelo plugin do `vite.config.ts` (`transformIndexHtml`)
a partir de `meta.*` e já estão no `index.html` entregue: nada é inserido por JavaScript no
navegador (um teste confere o HTML do build e que o JS entregue não tem essas tags).

- **Imagem:** `public/og-image.png`, PNG 1200x630 abaixo de 300 KB (um teste confere o arquivo
  e a cópia em `dist/`). Nos modelos deste repositório ela é uma captura do hero com o título
  "Modelo de site para [nicho] — exemplo" e o selo "Exemplo", gerada por **`npm run og`**
  (`scripts/gerar-og.mjs`: builda, abre no Chrome via Playwright, espera as animações, desenha a
  faixa só na captura e comprime). Rode de novo sempre que o hero mudar.
- **Ícones:** `favicon.svg`, `favicon-32.png` e `apple-touch-icon.png` (180x180) são **gerados no
  build** a partir de `tema.cores.primaria`; não existe arquivo de ícone para editar. Trocou a
  cor primária, o próximo build já sai com os ícones novos.

#### Trocar para um cliente

1. `meta.url`: o endereço final do site, com `https://` e barra final (ex.:
   `https://www.clientelegal.com.br/`). Ele vira `og:url`, `canonical` e a base da URL absoluta
   da imagem; se for inválido o build falha.
2. `meta.ogTitle`, `meta.ogDescription`, `meta.ogImageAlt`, `meta.siteName`: os textos do cliente
   (o título e a descrição de exemplo não podem sobrar).
3. Imagem do cartão: o jeito mais seguro é colocar em `public/og-image.png` uma imagem do próprio
   negócio, 1200x630, PNG ou JPEG (nunca SVG nem GIF) e abaixo de 300 KB, e ajustar
   `meta.ogImage` se mudar o nome. Se preferir gerar pelo script, tire o selo
   (`const SELO = ""` em `scripts/gerar-og.mjs`) e rode `npm run og` com o site já com os dados
   do cliente. O teste de build reprova imagem fora de 1200x630 ou acima de 300 KB.
4. `meta.themeColor` (cor da barra no celular) e `tema.cores.primaria` (ícones).
5. `meta.noindex: false` quando o site for ao ar.
- **`meta.noindex`** controla só o `<meta robots noindex, nofollow>`. O `robots.txt` sempre
  libera os rastreadores, senão WhatsApp, LinkedIn e Meta não leriam o cartão.
- O cache dos cartões é do próprio WhatsApp/Meta: depois de trocar a imagem, use o depurador
  de compartilhamento da Meta ou mude o nome do arquivo.

### Imagens

Coloque os arquivos em `public/images/` e aponte o caminho no config (`"/images/arquivo.jpg"`)
com um `alt` que descreva a cena (sem descrever pessoas). Recomendado: JPG/WebP com até
1200 px de largura. As fotos que acompanham o modelo são de exemplo (banco de imagens
Unsplash, licença Unsplash): **troque todas** e remova `exemplo: true`.

## O que o modelo anima

- Títulos entram **palavra por palavra, de um leve desfoque para nítido** (0,9 a 1,2 s).
  É a única exceção à regra "só transform/opacity": o desfoque só roda em títulos curtos
  e no hero. Com movimento reduzido vira um fade simples.
- Cartões entram com fade e 12 px de subida, com intervalo de 120 ms entre eles.
- No hero, a forma orgânica "respira" (escala 1 → 1,04 → 1, ciclo de 8 s).
- Uma linha fina em SVG, "desenhada à mão", liga as seções e se desenha conforme a rolagem.
- Formas suaves no fundo andam no máximo 20 px com a rolagem (parallax).
- `prefers-reduced-motion`: sem parallax, sem loops, linha já desenhada, só fades curtos.
  `intensidadeAnimacao: "suave"` também desliga os loops.

## Qualidade

- Responsivo de 360 a 1440 px, sem rolagem horizontal.
- HTML semântico, `alt` em toda imagem, foco visível, alvos de toque ≥ 44 px.
- Contraste mínimo de 4.5:1 entre as cores do config (testado em `src/test/config.test.ts`;
  se trocar as cores e o teste falhar, ajuste as cores).
- Sem JavaScript o navegador mostra um resumo (nome, CRP, texto, WhatsApp, telefone,
  endereço e horários) gerado do config.

## Publicação

`npm run build` gera a pasta `dist/` (site estático). Para sites de clientes use
**Cloudflare Pages** ou **Netlify**. **Não use o plano gratuito da Vercel** em sites de
clientes: ele é só para uso não comercial.

### Cloudflare Pages

1. Suba o projeto do cliente para um repositório (GitHub/GitLab).
2. Em *Workers & Pages → Create → Pages → Connect to Git*, escolha o repositório.
3. Framework preset: **Vite** (ou *None*). Build command: `npm run build`. Output
   directory: `dist`. Se o projeto estiver numa subpasta (como neste repositório de
   modelos), informe a pasta em *Root directory*.
4. Deploy. Depois, em *Custom domains*, adicione o domínio do cliente e siga o DNS.

### Netlify

1. *Add new site → Import an existing project* e conecte o repositório.
2. Build command: `npm run build`. Publish directory: `dist` (em subpasta, defina o
   *Base directory*).
3. Deploy. Em *Domain management → Add a domain* aponte o domínio do cliente.

### Antes de entregar

- [ ] Trocar todo o `site.config.ts` (nome, **CRP real**, contatos, textos, formação, FAQ).
- [ ] Revisar os textos com o Código de Ética do CFP (sem promessa, preço ou depoimento).
- [ ] Trocar as fotos de ambiente e os `alt`; colocar a foto da profissional **só com
      autorização dela(e)** (ou manter o placeholder); remover `exemplo: true`.
- [ ] Trocar o mapa (`mapaEmbedUrl`) e conferir o link do WhatsApp no celular.
- [ ] Conferir os ícones (gerados da cor primária no build: `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`).
- [ ] `meta.noindex: false`, `meta.url` com o domínio final (com barra final) e `meta.ogTitle`,
  `meta.ogDescription`, `meta.ogImageAlt` do cliente; `public/og-image.png` trocada por uma
  imagem 1200x630 (< 300 KB) do negócio.
- [ ] Rodar `npm run build` e `npm test`.
