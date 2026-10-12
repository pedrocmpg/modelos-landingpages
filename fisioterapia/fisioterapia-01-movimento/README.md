# Fisioterapia 01 — Movimento ("reabilitação calma")

Landing page para fisioterapeuta em estilo **calmo, claro e organizado**: fundo verde-gelo,
verde-petróleo e terracota; `Bricolage Grotesque` nos títulos e `Instrument Sans` no texto.
Linhas orgânicas em SVG lembram uma coluna e a trajetória de um movimento. Site estático
(Vite + React + TypeScript), animações com [motion](https://motion.dev) e rolagem suave com
[Lenis](https://lenis.darkroom.engineering/). Só landing page, sem backend: o contato é
pelo WhatsApp.

> Todos os dados deste modelo são **fictícios** ("Fisioterapeuta João Exemplo",
> CREFITO 0/000000-F, (00) 90000-0000, Rua Exemplo, 123). As fotos são de ambiente, sem
> pessoas, e aparecem com o selo "foto de exemplo" enquanto `exemplo: true` estiver no
> config. A foto do profissional é um placeholder (`[FOTO DO FISIOTERAPEUTA]`).

## Regras de publicidade em fisioterapia (já embutidas)

> **Antes de publicar, o(a) profissional confere as regras de publicidade do COFFITO e do
> CREFITO da sua região** (código de ética e resoluções vigentes). As regras abaixo são um
> ponto de partida técnico; a responsabilidade pelo conteúdo final é de quem publica.

O modelo foi desenhado para não deixar o cliente escorregar:

- **Sem fotos de antes e depois, sem promessa de cura, de "sem dor" ou de tempo de
  recuperação.** O tipo `SiteConfig` não tem campo para galeria de antes/depois.
- **Sem preços, promoções ou descontos.** Valores aparecem como "sob consulta".
- **Sem depoimentos de pacientes**, nem de exemplo. Não existe campo para isso.
- **CREFITO visível no cabeçalho e no rodapé** (`negocio.registroProfissional`, obrigatório).
- **Sem fotos de pacientes identificáveis.** Fotos de ambiente, sem pessoas, e o
  placeholder `[FOTO DO FISIOTERAPEUTA]` até haver uma foto autorizada.
- Textos sem superlativos ("o melhor", "líder", "único") nem a palavra "paciente" como
  personagem do site.

Os testes procuram essas palavras no config **e** no texto renderizado da página. Se o
cliente escrever algo que cai nessas regras, o teste reprova.

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
[`site.config.alt.ts`](src/config/site.config.alt.ts) (outro profissional fictício, outras
cores e fontes) e confere que nada do config principal sobrou na página.

**Destaque em títulos:** cercar uma palavra com asteriscos a deixa na cor de destaque:
`"Cuidado com o *movimento* do seu corpo"`. Use no máximo uma palavra-chave por título.

### O que é novo em relação ao pet shop (campos adicionados ao `SiteConfig`)

- `negocio.registroProfissional { conselho, numero }`: obrigatório (CREFITO).
- `tema.cores.suave`: tom claro para faixas e formas.
- `tema.fontes.rotulo` (opcional): fonte de rótulos e números. Sem ela usa a do texto.
- Seções `areas`, `comoFunciona` e `estrutura`; sem `depoimentos`, `servicos` nem `galeria`.
- `conteudo.rodape { texto?, aviso? }` e `rotulos.fotoProfissional` / `rotulos.fotoExemplo`.
- `Imagem.exemplo?`: mostra o selo "foto de exemplo".

### Campos do config

| Campo | Tipo | O que é |
| --- | --- | --- |
| `meta.title` | texto | `<title>` e `og:title`. |
| `meta.description` | texto | Meta description e `og:description`. |
| `meta.lang` | texto | Idioma do site (ex.: `pt-BR`). |
| `meta.noindex` | `true`/`false` | `true` = demo: `<meta robots noindex>` e `robots.txt` bloqueando tudo. Troque para `false` ao entregar. |
| `meta.url` | texto, opcional | URL final (usada em `og:url` e para tornar absoluta a imagem do Open Graph). |
| `negocio.nome` | texto | Nome do profissional (cabeçalho, rodapé, Open Graph). |
| `negocio.slogan` | texto | Frase curta no rodapé. |
| `negocio.cidade` / `negocio.estado` | texto | Localização. |
| `negocio.registroProfissional` | `{ conselho, numero }` **obrigatório** | Ex.: `{ conselho: "CREFITO", numero: "3/123456-F" }`. Aparece no cabeçalho e no rodapé. |
| `contato.whatsapp` | só dígitos, com 55 | Ex.: `5500900000000`. |
| `contato.mensagemWhatsapp` | texto | Mensagem que já vem escrita no WhatsApp. |
| `contato.telefoneExibicao` | texto | Telefone como aparece na tela (vira link `tel:`). |
| `contato.email` | texto, opcional | Vazio = some. |
| `contato.endereco` | texto | Endereço exibido. |
| `contato.mapaEmbedUrl` | texto, opcional | URL de embed do Google Maps. Vazio = sem mapa. |
| `contato.horarios` | lista `{ dias, horas }` | Lista vazia = bloco de horários some. |
| `redes.instagram` / `redes.facebook` | URL, opcionais | Vazio = não aparece. |
| `tema.cores.primaria` | cor | Linhas, ícones e botão de contorno. Precisa de 4.5:1 sobre o fundo. |
| `tema.cores.secundaria` | cor | Eyebrows, links e foco. Precisa de 4.5:1 sobre fundo, superfície e suave. |
| `tema.cores.destaque` | cor | Botões (texto na cor `superficie` por cima) e palavra em destaque dos títulos. |
| `tema.cores.fundo` / `superficie` / `suave` | cor | Fundo da página / cartões / faixas claras. |
| `tema.cores.texto` / `textoSecundario` | cor | Texto principal e de apoio. |
| `tema.cores.escuro` | cor | Fundo das seções escuras e do rodapé. |
| `tema.fontes.titulo` / `.texto` / `.rotulo` | `{ familia, pesos, italico?, fallback }` | Família exata do Google Fonts. `rotulo` é opcional. **Proibidas:** Inter, Roboto, Arial, Open Sans, Poppins, Montserrat (o teste reprova). |
| `tema.raio.cartao` / `tema.raio.botao` | px | Cantos de cartões e botões (`999` = pílula). |
| `tema.intensidadeAnimacao` | `"suave"` ou `"normal"` | `suave` reduz distâncias pela metade e alonga as durações. |
| `secoes[]` | `{ id, ativo, menu? }` | Ordem das seções e se aparecem. `menu` é o texto no menu. Ids: `hero`, `sobre`, `areas`, `comoFunciona`, `estrutura`, `faq`, `contato`. |
| `conteudo.hero` | `selo?`, `titulo`, `subtitulo`, `ctaPrimario`, `ctaSecundario { texto, secao }` | Topo. `ctaPrimario` abre o WhatsApp; `ctaSecundario` ("Ver tratamentos") leva a uma seção (some se ela estiver desligada). |
| `conteudo.sobre` | cabeçalho + `paragrafos[]`, `formacao { titulo, itens[] }`, `abordagem { titulo, texto }` | Usa `imagens.profissional` (ou o placeholder). |
| `conteudo.areas` | cabeçalho + `itens[] { titulo, texto, icone? }`, `observacao?` | Áreas de atendimento. Sem promessa de resultado. |
| `conteudo.comoFunciona` | cabeçalho + `itens[] { titulo, texto, icone? }` (3 etapas), `observacao?` | Avaliação, plano e acompanhamento. |
| `conteudo.estrutura` | cabeçalho + `itens[] { titulo, texto, imagem }`, `observacao?` | Ambientes do consultório (fotos sem pessoas). |
| `conteudo.faq` | cabeçalho + `itens[] { pergunta, resposta }` | Valores: "sob consulta". |
| `conteudo.contato` | cabeçalho + `texto?`, `ctaWhatsapp` | Botão do WhatsApp, dados, horários, redes e mapa. |
| `conteudo.rodape` | `texto?`, `aviso?` | Aviso informativo e lembrete de avaliação individual. |
| `conteudo.rotulos` | textos de interface | "Pular para o conteúdo", menu, "Conversar no WhatsApp", `fotoProfissional` (placeholder), "foto de exemplo", "Etapa", endereço/telefone/horários... |
| `imagens.hero` | `{ src, alt, exemplo? }` | Foto de ambiente do topo (sem pessoas). |
| `imagens.profissional` | `{ src, alt, exemplo? }`, opcional | Foto do profissional. Vazio = placeholder `[FOTO DO FISIOTERAPEUTA]`. |
| `imagens.og` | `{ src, alt }`, opcional | Imagem de compartilhamento. |

Cabeçalho = `eyebrow?`, `titulo`, `introducao?`. Ícones (`icone`): `coluna`, `ombro`,
`joelho`, `pe`, `equilibrio`, `movimento`, `prancheta`, `rota`, `calendario`, `escudo`.

### Imagens

Coloque os arquivos em `public/images/` e aponte o caminho no config (`"/images/arquivo.jpg"`)
com um `alt` que descreva a cena (sem descrever pessoas). Recomendado: JPG/WebP com até
1400 px de largura. As fotos que acompanham o modelo são de exemplo (banco de imagens
Unsplash, licença Unsplash): **troque todas** e remova `exemplo: true`.

## O que o modelo anima

- **As linhas do hero se desenham ao carregar** (coluna estilizada e trajetória), com
  `stroke-dashoffset`.
- **Uma trajetória em SVG atravessa a página** e se desenha conforme a rolagem.
- **Cartões de áreas** entram em cascata, vindos de baixo, com uma leve rotação (3°) que se
  corrige.
- **Fotos se revelam como uma cortina** (`clip-path`) com um leve zoom-out.
- Títulos e blocos entram com fade e subida curta; o fio que liga as 3 etapas se estica.
- Só `transform`, `opacity` e `clip-path` animam, com **uma exceção**: `stroke-dashoffset`
  nas linhas SVG (técnica de "desenhar" o traço), em poucas linhas.
- `prefers-reduced-motion`: linhas já desenhadas, sem rotação nem subida, só fades curtos.

## Qualidade

- Responsivo de 360 a 1440 px, sem rolagem horizontal.
- HTML semântico, `alt` em toda imagem, foco visível, alvos de toque ≥ 44 px.
- Contraste mínimo de 4.5:1 entre as cores do config (testado em `src/test/config.test.ts`;
  se trocar as cores e o teste falhar, ajuste as cores).
- Sem JavaScript o navegador mostra um resumo (nome, CREFITO, texto, WhatsApp, telefone,
  endereço e horários) gerado do config.

## Publicação

`npm run build` gera a pasta `dist/` (site estático). Para sites de clientes use
**Cloudflare Pages** ou **Netlify**. **Não use o plano gratuito da Vercel** em sites de
clientes: ele é só para uso não comercial (serve para demonstração).

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

- [ ] **O(A) profissional conferiu as regras de publicidade do COFFITO/CREFITO.**
- [ ] Trocar todo o `site.config.ts` (nome, **CREFITO real**, contatos, textos, formação, FAQ).
- [ ] Revisar os textos: sem promessa, preço, desconto, antes e depois ou depoimento.
- [ ] Trocar as fotos de ambiente e os `alt`; colocar a foto do profissional **só com
      autorização dele(a)** (ou manter o placeholder); remover `exemplo: true`.
- [ ] Trocar o mapa (`mapaEmbedUrl`) e conferir o link do WhatsApp no celular.
- [ ] Ajustar `public/favicon.svg`.
- [ ] `meta.noindex: false` e `meta.url` com o domínio final.
- [ ] Rodar `npm run build` e `npm test`.
