# Modelos de landing page

Modelos de landing page para pequenos negócios. Cada **nicho** tem uma pasta e cada
**modelo** é uma subpasta com um projeto independente (Vite + React + TypeScript):
`package.json` próprio e nenhum import de outra pasta. Para cada cliente, copie a pasta
do modelo, edite **um único arquivo de configuração** (`src/config/site.config.ts`) e
publique.

## Modelos

| Nicho | Modelo | Estilo | Demo |
| --- | --- | --- | --- |
| Pet shop | [`pet-shop/pet-shop-01-acolhedor`](pet-shop/pet-shop-01-acolhedor) | Acolhedor: creme, marrom e dourado; Fraunces + DM Sans + Caveat | (ainda não publicado) |
| Psicologia | [`psicologia/`](psicologia) | — | em breve |
| Fisioterapia | [`fisioterapia/`](fisioterapia) | — | em breve |

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
5. Troque os dados fictícios, os depoimentos de exemplo (`exemplo: true`) e o mapa.
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
- [ ] **Depoimentos e nota reais** (ou bloco removido) e mapa do endereço certo.
- [ ] **`noindex` removido**: `meta.noindex: false` (isso também libera o `robots.txt`) e
  `meta.url` com o domínio final.
- [ ] **Domínio** apontado no provedor de hospedagem (DNS) e HTTPS ativo.
- [ ] **Deploy** feito com `npm run build` → `dist/`, link do WhatsApp testado no celular.

## Padrão de todos os modelos

- Configuração em `src/config/site.config.ts`, tipada em `src/config/types.ts`
  (`SiteConfig`). Componentes só têm estrutura, estilo e animação.
- Dados fictícios obrigatórios nos modelos: "Pet Shop Exemplo", (00) 90000-0000,
  WhatsApp `5500900000000`, "Rua Exemplo, 123 - Centro", `contato@exemplo.com`.
- Responsivo de 360 a 1440 px, HTML semântico, foco visível, alvos de toque ≥ 44 px,
  contraste ≥ 4.5:1.
- Animação com `motion` e `lenis`, só `transform`/`opacity`/`clip-path`, respeitando
  `prefers-reduced-motion`.
- Fontes proibidas: Inter, Roboto, Arial, Open Sans, Poppins, Montserrat.
