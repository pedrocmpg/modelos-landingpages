# Psicologia 02 — Acolher ("fim de tarde")

Landing page para psicóloga(o) clínica(o) em estilo **acolhedor, quente e editorial**: fundo
areia, verde-musgo e terracota, layout assimétrico de revista, foto principal em arco (janela)
e um leve grão no fundo. `Gloock` nos títulos, `Onest` no texto e `Newsreader` em itálico como
destaque em frases curtas e na citação de abertura. Site estático (Vite + React + TypeScript),
animações com [motion](https://motion.dev) e rolagem suave com
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

**Destaque em títulos:** cercar um trecho curto com asteriscos o deixa em itálico, na fonte de
destaque (`Newsreader`): `"Um lugar para *chegar* do jeito que você está"`.

### Campos do config

| Campo | Tipo | O que é |
| --- | --- | --- |
| `meta.title` | texto | `<title>` e `og:title`. |
| `meta.description` | texto | Meta description e `og:description`. |
| `meta.lang` | texto | Idioma do site (ex.: `pt-BR`). |
| `meta.noindex` | `true`/`false` | `true` = demo: `<meta robots noindex, nofollow>`. O `robots.txt` sempre libera os rastreadores (assim o noindex e o cartão de compartilhamento são lidos). Troque para `false` ao entregar. |
| `meta.url` | texto, opcional | URL final (usada em `og:url` e para tornar absoluta a imagem do Open Graph). |
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
| `tema.cores.primaria` | cor | Cor da marca: numerais dos passos, anel do hero, botão flutuante. |
| `tema.cores.secundaria` | cor | Eyebrows, links e foco. Precisa de contraste 4.5:1 sobre fundo, superfície e suave. |
| `tema.cores.destaque` | cor | Botões (texto na cor `superficie` por cima) e textos em destaque. |
| `tema.cores.fundo` / `superficie` / `suave` | cor | Fundo da página / cartões / faixas e formas claras. |
| `tema.cores.texto` / `textoSecundario` | cor | Texto principal e de apoio. |
| `tema.cores.escuro` | cor | Fundo da seção escura (temas, "como posso ajudar") e do rodapé. |
| `tema.fontes.titulo` / `.texto` / `.destaque` | `{ familia, pesos, italico?, fallback }` | Família exata do Google Fonts. `destaque` é opcional (sem ela usa a do título). **Proibidas:** Inter, Roboto, Arial, Open Sans, Poppins, Montserrat (o teste reprova). O `*destaque*` dos títulos e a citação do hero usam a fonte `destaque` (com `italico: true`). |
| `tema.raio.cartao` / `tema.raio.botao` | px | Cantos de cartões e botões (`999` = pílula). |
| `tema.intensidadeAnimacao` | `"suave"` ou `"normal"` | `suave` reduz distâncias pela metade e alonga as durações. |
| `secoes[]` | `{ id, ativo, menu? }` | Ordem das seções e se aparecem. `menu` é o texto no menu. Ids: `hero`, `sobre`, `ajuda`, `comoFunciona`, `atendimento`, `faq`, `contato`. |
| `conteudo.hero` | `selo?`, `titulo`, `subtitulo`, `ctaPrimario`, `ctaSecundario { texto, secao }`, `citacao?` | Topo. `ctaPrimario` abre o WhatsApp; `ctaSecundario` leva a uma seção (some se a seção estiver desligada). `citacao` é a frase de abertura em itálico (fonte `destaque`). |
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
| `imagens.og` | `{ src, alt }`, opcional | Imagem de compartilhamento. |

Cabeçalho = `eyebrow?`, `titulo`, `introducao?`. Ícones (`icone`): `folha`, `coracao`,
`mensagem`, `calendario`, `relogio`, `escudo`, `casa`, `video`.

### Imagens

Coloque os arquivos em `public/images/` e aponte o caminho no config (`"/images/arquivo.jpg"`)
com um `alt` que descreva a cena (sem descrever pessoas). Recomendado: JPG/WebP com até
1200 px de largura. As fotos que acompanham o modelo são de exemplo (banco de imagens
Unsplash, licença Unsplash): **troque todas** e remova `exemplo: true`.

## O que o modelo anima

- **Títulos** revelados por máscara: cada linha sobe de dentro de um contêiner com
  `overflow: hidden` (transição de CSS em `transform`, escalonada por linha; o número de
  linhas é medido no navegador e refeito ao redimensionar ou quando a fonte carrega).
- **Foto em arco** revela de baixo para cima (`clip-path`) com zoom-out lento de 1,1 para 1.
- **Temas (seção escura):** cada item ganha opacidade total quando passa pelo centro da tela,
  ligado à rolagem (só `opacity`). Fora do centro o item fica esmaecido de propósito; com
  movimento reduzido todos ficam com opacidade total.
- **Barra fina de progresso de leitura** no topo (`scaleX`).
- **Botão de WhatsApp flutuante**, discreto, só aparece depois que o hero sai da tela.
- Cartões entram com fade e 20 px de subida, escalonados.
- `prefers-reduced-motion`: sem máscara (só fades curtos), sem barra de progresso, sem
  Lenis, temas com opacidade total.

## Qualidade

- Só `transform`, `opacity` e `clip-path` animam (a máscara dos títulos é `transform`).
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
- [ ] Ajustar `public/favicon.svg`.
- [ ] `meta.noindex: false` e `meta.url` com o domínio final.
- [ ] Rodar `npm run build` e `npm test`.
