// Contrato do arquivo de configuração. Todo modelo de landing page deste
// repositório segue este mesmo tipo: o cliente novo é feito editando APENAS
// `site.config.ts`. Componentes não têm texto, número, cor, fonte, link ou
// imagem escritos neles.

export type SecaoId =
  | "hero"
  | "sobre"
  | "diferenciais"
  | "servicos"
  | "comoFunciona"
  | "galeria"
  | "depoimentos"
  | "faq"
  | "ctaFinal"
  | "contato";

export type IconeId =
  | "coracao"
  | "brilho"
  | "escudo"
  | "gota"
  | "tesoura"
  | "pata"
  | "relogio"
  | "calendario"
  | "mensagem"
  | "estrela";

export interface Imagem {
  /** Caminho a partir de public/, ex.: "/images/hero.jpg". */
  src: string;
  alt: string;
}

export interface Meta {
  title: string;
  description: string;
  /** Idioma do documento, ex.: "pt-BR". */
  lang: string;
  /** true = <meta robots noindex, nofollow> (demo). O robots.txt sempre libera os rastreadores. */
  noindex: boolean;
  /** URL pública final do site, com https:// e barra final. Base de og:url e da imagem. */
  url: string;
  /** Título do cartão de compartilhamento (og:title e twitter:title). */
  ogTitle: string;
  /** Descrição do cartão de compartilhamento (og:description e twitter:description). */
  ogDescription: string;
  /** Imagem do cartão, 1200x630: caminho a partir de public/ (ex.: "/og-image.png") ou URL absoluta. */
  ogImage: string;
  /** Texto alternativo da imagem do cartão. */
  ogImageAlt: string;
}

export interface Negocio {
  nome: string;
  slogan: string;
  cidade: string;
  estado: string;
  /** Só para profissões regulamentadas (psicologia, fisioterapia, ...). */
  registroProfissional?: { conselho: string; numero: string };
}

export interface Horario {
  dias: string;
  horas: string;
}

export interface Contato {
  /** Só dígitos, com 55 na frente. Ex.: "5500900000000". */
  whatsapp: string;
  mensagemWhatsapp: string;
  telefoneExibicao: string;
  email?: string;
  endereco: string;
  /** URL de embed do Google Maps. Vazio = sem mapa. */
  mapaEmbedUrl?: string;
  /** Lista vazia = bloco de horários some. */
  horarios: Horario[];
}

export interface Redes {
  /** URL completa do perfil. Vazio = não aparece. */
  instagram?: string;
  facebook?: string;
}

export interface Cores {
  /** Botões e destaques principais. */
  primaria: string;
  /** Selos, eyebrows, foco. */
  secundaria: string;
  /** Textos de destaque pequenos (preços, anotações). Precisa de contraste. */
  destaque: string;
  /** Fundo da página e dos cartões. */
  fundo: string;
  /** Fundo das seções alternadas. */
  superficie: string;
  texto: string;
  textoSecundario: string;
  /** Fundo das seções escuras e do rodapé. */
  escuro: string;
}

export interface Fonte {
  /** Nome exato da família no Google Fonts. */
  familia: string;
  pesos: number[];
  italico?: boolean;
  /** Família genérica usada enquanto a fonte carrega. */
  fallback: "serif" | "sans-serif" | "cursive" | "monospace";
}

export interface Tema {
  cores: Cores;
  fontes: {
    titulo: Fonte;
    texto: Fonte;
    /** Só para pequenas anotações. Sem ela, usa a fonte do título. */
    destaque?: Fonte;
  };
  /** Raio dos cantos em px. botao: 999 = pílula. */
  raio: { cartao: number; botao: number };
  intensidadeAnimacao: "suave" | "normal";
}

export interface SecaoConfig {
  id: SecaoId;
  ativo: boolean;
  /** Texto do link no menu. Sem isso, a seção não aparece no menu. */
  menu?: string;
}

export interface Cabecalho {
  eyebrow?: string;
  titulo: string;
  introducao?: string;
}

export interface Hero {
  selo?: string;
  titulo: string;
  subtitulo: string;
  ctaPrimario: string;
  ctaSecundario?: { texto: string; secao: SecaoId };
  /** Anotação curta (fonte de destaque) sobre a foto. */
  anotacao?: string;
}

export interface Diferencial {
  titulo: string;
  texto: string;
  icone?: IconeId;
}

export interface Servico {
  titulo: string;
  texto: string;
  icone?: IconeId;
  imagem?: Imagem;
  /** Opcional. Vazio = não mostra preço. */
  preco?: string;
}

export interface Passo {
  titulo: string;
  texto: string;
  icone?: IconeId;
}

export interface Depoimento {
  texto: string;
  autor: string;
  detalhe?: string;
  /** true = mostra o selo "exemplo" enquanto o depoimento não for real. */
  exemplo?: boolean;
}

export interface Nota {
  valor: number;
  total: number;
  /** Ex.: "avaliações no Google". */
  rotulo: string;
  exemplo?: boolean;
}

export interface Pergunta {
  pergunta: string;
  resposta: string;
}

export interface Rotulos {
  pularParaConteudo: string;
  menuPrincipal: string;
  menuAbrir: string;
  menuFechar: string;
  /** Botão curto do cabeçalho. */
  agendar: string;
  /** Botão longo (barra do celular, botão flutuante, contato). */
  agendarWhatsapp: string;
  exemplo: string;
  fotoExemplo: string;
  endereco: string;
  telefone: string;
  email: string;
  horarios: string;
  redes: string;
  antes: string;
  depois: string;
  deslizarAntesDepois: string;
  mapa: string;
  direitos: string;
}

export interface Conteudo {
  hero: Hero;
  sobre?: Cabecalho & { paragrafos: string[] };
  diferenciais: Cabecalho & { itens: Diferencial[] };
  servicos: Cabecalho & {
    itens: Servico[];
    anotacao?: string;
    observacao?: string;
  };
  comoFunciona?: Cabecalho & { itens: Passo[] };
  galeria: Cabecalho & { anotacao?: string };
  depoimentos: Cabecalho & { nota?: Nota; itens: Depoimento[] };
  faq: Cabecalho & { itens: Pergunta[] };
  ctaFinal?: { titulo: string; texto?: string; botao: string };
  contato: Cabecalho & { texto?: string };
  rodape: { texto?: string };
  rotulos: Rotulos;
}

export type ItemGaleria =
  | { tipo: "foto"; imagem: Imagem; legenda?: string; exemplo?: boolean }
  | {
      tipo: "antesDepois";
      antes: Imagem;
      depois: Imagem;
      legenda?: string;
      exemplo?: boolean;
    };

export interface Imagens {
  hero: Imagem;
  sobre?: Imagem;
  galeria: ItemGaleria[];
}

export interface SiteConfig {
  meta: Meta;
  negocio: Negocio;
  contato: Contato;
  redes: Redes;
  tema: Tema;
  secoes: SecaoConfig[];
  conteudo: Conteudo;
  imagens: Imagens;
}
