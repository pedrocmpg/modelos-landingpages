# Pet Shop 01 — Acolhedor

Landing page de pet shop (banho e tosa) em estilo **acolhedor**: creme, marrom e
dourado, com `Fraunces` nos títulos, `DM Sans` no texto e `Caveat` só em pequenas
anotações. Site estático (Vite + React + TypeScript), animações com
[motion](https://motion.dev) e rolagem suave com [Lenis](https://lenis.darkroom.engineering/).

> Todos os dados deste modelo são **fictícios** ("Pet Shop Exemplo",
> (00) 90000-0000, Rua Exemplo, 123). Depoimentos, nota e fotos de exemplo aparecem
> com um selo "exemplo" enquanto a flag `exemplo: true` estiver no config.

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
[`SiteConfig`](src/config/types.ts) (`src/config/types.ts`) mostra no editor o que
cada campo aceita.

Regra do modelo: nenhum texto, número, cor, fonte, link ou imagem fica escrito nos
componentes. Cores e fontes viram variáveis CSS no `:root`, o link do Google Fonts e
o `<head>` (título, descrição, Open Graph, `noindex`) são gerados do config, e o link
do WhatsApp (`wa.me` com a mensagem codificada) também. Trocar uma cor ou fonte no
config muda o site inteiro. Campo opcional vazio faz o bloco sumir sem quebrar o
layout.

O teste [`src/test/app.test.tsx`](src/test/app.test.tsx) prova isso: renderiza o app com
[`site.config.alt.ts`](src/config/site.config.alt.ts) (outro negócio fictício) e
confere que nada do config principal sobrou na página.

### Campos do config

| Campo | Tipo | O que é |
| --- | --- | --- |
| `meta.title` | texto | `<title>` e `og:title`. |
| `meta.description` | texto | Meta description e `og:description`. |
| `meta.lang` | texto | Idioma do site (ex.: `pt-BR`). Também formata os números. |
| `meta.noindex` | `true`/`false` | `true` = demo: `<meta robots noindex, nofollow>`. O `robots.txt` sempre libera os rastreadores (assim o noindex e o cartão de compartilhamento são lidos). Troque para `false` ao entregar. |
| `meta.url` | texto, opcional | URL final do site (usada em `og:url` e para tornar absoluta a imagem do Open Graph). |
| `negocio.nome` | texto | Nome do negócio (cabeçalho, rodapé, Open Graph). |
| `negocio.slogan` | texto | Frase curta no rodapé. |
| `negocio.cidade` / `negocio.estado` | texto | Localização. |
| `negocio.registroProfissional` | `{ conselho, numero }`, opcional | Registro de profissão regulamentada. Aparece no rodapé. |
| `contato.whatsapp` | só dígitos, com 55 | Ex.: `5500900000000`. |
| `contato.mensagemWhatsapp` | texto | Mensagem que já vem escrita no WhatsApp. |
| `contato.telefoneExibicao` | texto | Telefone como aparece na tela (vira link `tel:`). |
| `contato.email` | texto, opcional | Vazio = some. |
| `contato.endereco` | texto | Endereço exibido. |
| `contato.mapaEmbedUrl` | texto, opcional | URL de embed do Google Maps. Vazio = sem mapa (o contato centraliza). |
| `contato.horarios` | lista `{ dias, horas }` | Lista vazia = bloco de horários some. |
| `redes.instagram` / `redes.facebook` | URL, opcionais | Vazio = não aparece (seção de contato e rodapé). |
| `tema.cores.primaria` | cor | Botões e destaques. |
| `tema.cores.secundaria` | cor | Eyebrows, selos, foco. |
| `tema.cores.destaque` | cor | Preços, estrelas, anotações. Precisa de contraste de texto. |
| `tema.cores.fundo` | cor | Fundo da página e dos cartões. |
| `tema.cores.superficie` | cor | Fundo das seções alternadas. |
| `tema.cores.texto` / `tema.cores.textoSecundario` | cor | Texto principal e de apoio. |
| `tema.cores.escuro` | cor | Seções escuras e rodapé. |
| `tema.fontes.titulo` / `.texto` / `.destaque` | `{ familia, pesos, italico?, fallback }` | Família exata do Google Fonts, pesos, itálico e família genérica. `destaque` é opcional (sem ela usa a do título). **Proibidas:** Inter, Roboto, Arial, Open Sans, Poppins, Montserrat (o teste reprova). |
| `tema.raio.cartao` / `tema.raio.botao` | px | Cantos de cartões e botões (`999` = pílula). |
| `tema.intensidadeAnimacao` | `"suave"` ou `"normal"` | `suave` reduz distâncias pela metade e alonga as durações. |
| `secoes[]` | `{ id, ativo, menu? }` | Ordem das seções e se aparecem. `menu` é o texto no menu (sem ele, não entra no menu). Ids: `hero`, `sobre`, `diferenciais`, `servicos`, `comoFunciona`, `galeria`, `depoimentos`, `faq`, `ctaFinal`, `contato`. |
| `conteudo.hero` | `selo?`, `titulo`, `subtitulo`, `ctaPrimario`, `ctaSecundario? { texto, secao }`, `anotacao?` | Topo da página. `anotacao` é o selo manuscrito sobre a foto. |
| `conteudo.sobre` | `eyebrow?`, `titulo`, `introducao?`, `paragrafos[]` | Seção opcional (desligada neste modelo). Usa `imagens.sobre`. |
| `conteudo.diferenciais` | cabeçalho + `itens[] { titulo, texto, icone? }` | Cartões "por que escolher". |
| `conteudo.servicos` | cabeçalho + `itens[] { titulo, texto, icone?, imagem?, preco? }`, `anotacao?`, `observacao?` | `preco` vazio = sem preço. |
| `conteudo.comoFunciona` | cabeçalho + `itens[] { titulo, texto, icone? }` | Passo a passo (desligado neste modelo). |
| `conteudo.galeria` | cabeçalho + `anotacao?` | Textos da galeria. As fotos ficam em `imagens.galeria`. |
| `conteudo.depoimentos` | cabeçalho + `nota? { valor, total, rotulo, exemplo? }` + `itens[] { texto, autor, detalhe?, exemplo? }` | `exemplo: true` mostra o selo "exemplo". Troque pelos reais e remova a flag. |
| `conteudo.faq` | cabeçalho + `itens[] { pergunta, resposta }` | Perguntas e respostas. |
| `conteudo.ctaFinal` | `{ titulo, texto?, botao }` | Chamada final (desligada neste modelo). |
| `conteudo.contato` | cabeçalho + `texto?` | Textos da seção de contato. |
| `conteudo.rodape.texto` | texto, opcional | Linha extra no rodapé (ex.: aviso de demonstração). |
| `conteudo.rotulos` | textos de interface | "Pular para o conteúdo", "Abrir menu", "Agendar", rótulos de endereço/telefone/horários, "exemplo", "Antes"/"Depois"… |
| `imagens.hero` | `{ src, alt }` | Foto do topo. |
| `imagens.sobre` / `imagens.og` | `{ src, alt }`, opcionais | Foto da seção Sobre e imagem de compartilhamento. |
| `imagens.galeria[]` | `{ tipo: "foto", imagem, legenda?, exemplo? }` ou `{ tipo: "antesDepois", antes, depois, legenda?, exemplo? }` | `exemplo: true` marca "foto de exemplo". |

Cabeçalho = `eyebrow?`, `titulo`, `introducao?`. Ícones disponíveis (`icone`):
`coracao`, `brilho`, `escudo`, `gota`, `tesoura`, `pata`, `relogio`, `calendario`,
`mensagem`, `estrela`.

### Imagens

Coloque os arquivos em `public/images/` e aponte o caminho no config
(`"/images/arquivo.jpg"`) com um `alt` que descreva a foto. Recomendado: JPG/WebP com
até 1200 px de largura. As fotos que acompanham o modelo são de exemplo (banco de
imagens Unsplash) e as imagens "antes" foram geradas a partir delas só para a demo;
**troque todas** e remova `exemplo: true`. O favicon é `public/favicon.svg`.

## Qualidade

- Responsivo de 360 a 1440 px, sem rolagem horizontal.
- HTML semântico, `alt` em toda imagem, foco visível, alvos de toque ≥ 44 px.
- Contraste mínimo de 4.5:1 entre as cores do config (testado em `src/test/config.test.ts`
  — se trocar as cores e o teste falhar, ajuste as cores).
- Animações só em `transform`, `opacity` e `clip-path`, cada tipo de elemento com a sua
  entrada e easings próprios. `prefers-reduced-motion` desliga parallax, loops, contadores
  e rolagem suave, deixando só fades curtos.
- Sem JavaScript o navegador mostra um resumo (nome, texto, WhatsApp, telefone, endereço
  e horários) gerado do config.

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

- [ ] Trocar todo o `site.config.ts` (nome, contatos, textos, serviços, preços, FAQ).
- [ ] Trocar as imagens em `public/images/` e os `alt`; remover `exemplo: true`.
- [ ] Depoimentos e nota reais (ou apagar o bloco).
- [ ] Trocar o mapa (`mapaEmbedUrl`) e conferir o link do WhatsApp.
- [ ] Ajustar `public/favicon.svg`.
- [ ] `meta.noindex: false` e `meta.url` com o domínio final.
- [ ] Rodar `npm run build` e `npm test`.
