# Modelos de landing page

Modelos de landing page para pequenos negócios. Cada **nicho** tem uma pasta e cada
**modelo** é uma subpasta com um projeto independente (Vite + React + TypeScript):
`package.json` próprio e nenhum import de outra pasta. Para cada cliente, copie a pasta
do modelo, edite **um único arquivo de configuração** (`src/config/site.config.ts`) e
publique.

## Modelos

| Nicho | Modelo | Estilo | Demo |
| --- | --- | --- | --- |
| Pet shop | [`pet-shop/pet-shop-01-acolhedor`](pet-shop/pet-shop-01-acolhedor) | Acolhedor: creme, marrom e dourado; Fraunces + DM Sans + Caveat | [demo](https://modelo-pet-shop-01-acolhedor.vercel.app) |
| Psicologia | [`psicologia/psicologia-01-serena`](psicologia/psicologia-01-serena) | Serena ("luz da manhã"): areia, sálvia e argila; Instrument Serif + Hanken Grotesk | [demo](https://modelo-psicologia-01-serena.vercel.app) |
| Psicologia | [`psicologia/psicologia-02-acolher`](psicologia/psicologia-02-acolher) | Acolher ("fim de tarde"): areia, musgo e terracota, layout de revista; Gloock + Onest + Newsreader | [demo](https://modelo-psicologia-02-acolher.vercel.app) |
| Fisioterapia | [`fisioterapia/fisioterapia-01-movimento`](fisioterapia/fisioterapia-01-movimento) | Movimento ("reabilitação calma"): verde-petróleo e terracota, linhas de coluna e trajetória em SVG; Bricolage Grotesque + Instrument Sans | [demo](https://modelo-fisioterapia-01-movimento.vercel.app) |
| Fisioterapia | [`fisioterapia/fisioterapia-02-ativa`](fisioterapia/fisioterapia-02-ativa) | Ativa ("ortopedia e esporte"): cobalto e lima sobre escuro, grade marcada, faixa contínua; Unbounded + Figtree + IBM Plex Mono | [demo](https://modelo-fisioterapia-02-ativa.vercel.app) |

As demos ficam na Vercel (plano Hobby, só para demonstração, com `noindex`). Sites de clientes
vão para Cloudflare Pages ou Netlify.

## Criar o site de um cliente

1. Copie a pasta do modelo para fora deste repositório (ou para um novo repositório do
   cliente), sem `node_modules/` e `dist/`:
   ```bash
   cp -r pet-shop/pet-shop-01-acolhedor ../cliente-exemplo
   cd ../cliente-exemplo
   ```
2. Instale e rode:
   ```bash
   npm install
   npm run dev
   ```
3. Edite **só** `src/config/site.config.ts`: negócio, contato, cores, fontes, seções
   (ordem e visibilidade), textos e imagens. A tabela de todos os campos está no README
   do modelo.
4. Coloque as fotos do cliente em `public/images/` e aponte os caminhos no config.
5. Troque os dados fictícios, os depoimentos/fotos de exemplo (`exemplo: true`) e o mapa.
6. Rode `npm test` (confere contraste das cores, fontes proibidas e que nada ficou fixo
   no código) e `npm run build`.
7. Publique a pasta `dist/` no Cloudflare Pages ou no Netlify (instruções no README do
   modelo). **Não use o plano gratuito da Vercel em sites de clientes** (é só para uso
   não comercial).

## Checklist de entrega

- [ ] **Config trocado**: nome, slogan, WhatsApp (só dígitos, com 55), telefone, e-mail,
  endereço, horários, redes, textos, serviços/preços, FAQ. Nenhum dado "Exemplo" sobrando.
- [ ] **Imagens trocadas** em `public/images/` com `alt` descritivo; selos "exemplo"
  removidos (`exemplo: true` → apagar). Favicon (`public/favicon.svg`) trocado.
- [ ] **Depoimentos e nota reais** (ou bloco removido; em psicologia não há depoimentos) e
  mapa do endereço certo.
- [ ] **`noindex` removido**: `meta.noindex: false` (tira o `<meta robots>`; o `robots.txt` já libera os rastreadores) e
  `meta.url` com o domínio final.
- [ ] **Domínio** apontado no provedor de hospedagem (DNS) e HTTPS ativo.
- [ ] **Deploy** feito com `npm run build` → `dist/`, link do WhatsApp testado no celular.

## Padrão de todos os modelos

- Configuração em `src/config/site.config.ts`, tipada em `src/config/types.ts`
  (`SiteConfig`). Componentes só têm estrutura, estilo e animação.
- Dados fictícios obrigatórios nos modelos: telefone (00) 90000-0000, WhatsApp
  `5500900000000`, `contato@exemplo.com` e endereço "Rua Exemplo, 123 ..." (pet shop:
  "Pet Shop Exemplo"; psicologia: "Psicóloga Clara Exemplo", CRP 00/00000; fisioterapia:
  "Fisioterapeuta João Exemplo", CREFITO 0/000000-F).
- Cada nicho pode estender o `SiteConfig` (campos novos, documentados no README do modelo).
  Em **psicologia** o tipo não tem depoimentos, preços nem galeria de antes/depois, por
  causa das regras do Conselho Federal de Psicologia; o CRP é obrigatório e os testes
  procuram termos proibidos no config e no texto renderizado. Em **fisioterapia** vale o
  mesmo desenho (sem depoimentos, preços, promoções, antes e depois nem promessa de cura,
  de "sem dor" ou de tempo de recuperação), com CREFITO obrigatório; o profissional confere as
  regras de publicidade do COFFITO/CREFITO antes de publicar.
- Responsivo de 360 a 1440 px, HTML semântico, foco visível, alvos de toque ≥ 44 px,
  contraste ≥ 4.5:1.
- Animação com `motion` e `lenis`, só `transform`/`opacity`/`clip-path`, respeitando
  `prefers-reduced-motion`. Exceções documentadas: desfoque dos títulos (psicologia 01) e
  `stroke-dashoffset` das linhas SVG do hero (fisioterapia 01).
- Fontes proibidas: Inter, Roboto, Arial, Open Sans, Poppins, Montserrat.
