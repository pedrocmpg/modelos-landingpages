# Golden Pet Shop — Landing Page (demo)

Landing page de demonstração para o Golden Pet Shop, pet shop de banho e
tosa no bairro São Roque, Bento Gonçalves, RS. Site estático (sem
backend, sem banco de dados), construído com Vite + React + TypeScript,
com animações via [motion](https://motion.dev) (Framer Motion) e
rolagem suave via [Lenis](https://lenis.darkroom.engineering/).

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Build de produção + preview:

```bash
npm run build
npm run preview
```

## Editando o conteúdo

Todo o texto e dado do site (nome, telefone, WhatsApp, horário,
endereço, serviços, depoimentos, fotos dos pets) fica em
[`src/content.ts`](src/content.ts). Trocar esses valores não exige
mexer em nenhum componente.

### Trocando as fotos

As fotos do hero e da galeria "Clientes de quatro patas" hoje usam
fotos de exemplo de golden retrievers do banco público Unsplash (uso
livre, sem necessidade de atribuição) — só para a demo não ficar com
caixas vazias. **São placeholders, não fotos do cliente.** Para trocar
por fotos reais do Golden Pet Shop:

1. Adicione os arquivos em `public/pets/` (ex.: `public/pets/rex.jpg`).
2. Em [`src/content.ts`](src/content.ts), troque o campo `image`/`src`
   de `hero` ou `petGallery` para o novo caminho (ex.: `/pets/rex.jpg`)
   e ajuste o `alt` para descrever a foto real.

A animação de cortina/zoom em `PhotoPlaceholder.tsx` funciona igual
com qualquer imagem — não precisa mexer no componente.

## O que ainda falta preencher

Pontos marcados com colchetes no código e na tela — preencher antes de
entregar ao cliente:

- **Fotos reais** do pet shop e dos pets — atualmente são fotos de
  banco de imagens (Unsplash), ver seção acima.
- **Terceiro serviço** (`[OUTRO SERVIÇO]` em `src/content.ts`) — nome, descrição e se deve entrar valores.
- **Depoimentos reais** dos 3 clientes (trecho de avaliação do Google + nome).
- **Instagram** do Golden Pet Shop (`business.instagram` em `src/content.ts`).

## Ajustando a intensidade das animações

- Easings e durações principais ficam no topo de `src/index.css`
  (`--ease-enter`, `--ease-long`) e são repetidos inline nos componentes
  de animação (`src/components/Reveal.tsx`, `SectionTitle.tsx`,
  `Hero.tsx`, `WhyTheyReturn.tsx`).
- O efeito de cartas empilhadas ("Por que os tutores voltam") só roda
  em telas ≥ 900px — abaixo disso vira uma cascata simples. Ajuste o
  breakpoint ou o efeito em `src/components/WhyTheyReturn.tsx`.
- `prefers-reduced-motion` desativa parallax, loops, contadores animados
  e o efeito de cartas — deixando só fades curtos e o conteúdo sempre
  visível. Teste ativando essa preferência no sistema operacional.

## Publicação (demo gratuita)

Este é um site de demonstração: `index.html` tem
`<meta name="robots" content="noindex, nofollow">` e `public/robots.txt`
bloqueia todos os robôs de busca. **Remover os dois** quando o site for
aprovado e entregue de verdade ao cliente.

### Deploy na Vercel

1. Crie uma conta em [vercel.com](https://vercel.com) (dá para logar
   com GitHub).
2. Suba este repositório para o GitHub (`git push`).
3. Na Vercel, clique em **Add New → Project**, importe o repositório.
4. Framework preset: **Vite**. Build command: `npm run build`. Output
   directory: `dist`. (A Vercel costuma detectar isso sozinha.)
5. Deploy. Você recebe uma URL gratuita tipo
   `golden-pet-shop.vercel.app`.

**Apontar para o domínio do cliente depois:** no projeto da Vercel, vá
em **Settings → Domains**, adicione o domínio do cliente (ex.:
`goldenpetshop.com.br`) e siga as instruções de DNS (geralmente um
registro `A` ou `CNAME` apontando para a Vercel). Depois disso, remova
o bloqueio de `robots.txt`/`noindex` acima.

### Deploy na Netlify (alternativa)

1. Crie uma conta em [netlify.com](https://netlify.com).
2. **Add new site → Import an existing project**, conecte o
   repositório do GitHub.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy. Você recebe uma URL gratuita tipo
   `golden-pet-shop.netlify.app`.
5. Para o domínio do cliente: **Site settings → Domain management →
   Add custom domain**, e siga as instruções de DNS da Netlify.

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [motion](https://motion.dev/) (Framer Motion) para animações de entrada, stagger e scroll
- [Lenis](https://lenis.darkroom.engineering/) para rolagem suave
- CSS puro para hovers, loops e responsividade
