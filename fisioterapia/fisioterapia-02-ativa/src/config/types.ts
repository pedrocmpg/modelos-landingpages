// Contrato do arquivo de configuração. Todo modelo de landing page deste
// repositório segue o mesmo desenho: o cliente novo é feito editando APENAS
// `site.config.ts`. Componentes não têm texto, número, cor, fonte, link ou
// imagem escritos neles.
//
// Este tipo é a versão "fisioterapia" do padrão. Em relação ao pet shop:
//  - o tipo NÃO TEM depoimentos, notas, avaliações, preços, promoções nem
//    galeria de antes/depois: a publicidade em fisioterapia (COFFITO/CREFITO)
//    não admite promessa de resultado, sensacionalismo nem comparação.
//    Não existe campo onde colocar isso;
//  - `negocio.registroProfissional` (CREFITO) é obrigatório e aparece no
//    cabeçalho e no rodapé;
//  - seções: `areas` (áreas de atendimento), `comoFunciona` (avaliação, plano,
//    acompanhamento) e `estrutura` (ambientes do consultório);
//  - `tema.cores.suave` (tom claro para faixas e formas) e
//    `tema.fontes.rotulo` (fonte opcional de rótulos e números);
//  - títulos aceitam `*palavra*` para destacar uma palavra.

export type SecaoId =
  | "hero"
  | "sobre"
  | "areas"
  | "comoFunciona"
  | "estrutura"
  | "faq"
  | "contato";

export type IconeId =
  | "coluna"
  | "ombro"
  | "joelho"
  | "pe"
  | "equilibrio"
  | "movimento"
  | "prancheta"
  | "rota"
  | "calendario"
  | "escudo";

export interface Imagem {
  /** Caminho a partir de public/, ex.: "/images/ambiente.jpg". */
  src: string;
  alt: string;
  /** true = mostra "foto de exemplo" enquanto a foto não for a real. */
  exemplo?: boolean;
}

export interface Meta {
  title: string;
  description: string;
  /** Idioma do documento, ex.: "pt-BR". */
  lang: string;
  /** true = <meta robots noindex> + robots.txt bloqueando tudo (demo). */
  noindex: boolean;
  /** URL pública final do site (opcional; usada em og:url). */
  url?: string;
}

export interface Negocio {
  /** Nome do profissional, como aparece no cabeçalho. */
  nome: string;
  slogan: string;
  cidade: string;
  estado: string;
  /** Obrigatório em fisioterapia: aparece no cabeçalho e no rodapé. */
  registroProfissional: { conselho: string; numero: string };
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
  /** Cor da marca: botões, palavra em destaque dos títulos sobre fundo claro e detalhes. */
  primaria: string;
  /** Eyebrows, links e foco. Precisa de contraste de texto (4.5:1). */
  secundaria: string;
  /** Cor de destaque. Neste modelo (Ativa) é o lima: só sobre fundo escuro, nunca como texto sobre claro. */
  destaque: string;
  /** Fundo da página. */
  fundo: string;
  /** Fundo dos cartões. */
  superficie: string;
  /** Tom claro da marca: faixas alternadas e formas. */
  suave: string;
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
    /** Rótulos pequenos e números. Sem ela, usa a fonte do texto. */
    rotulo?: Fonte;
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

/** Títulos aceitam `*palavra*` para destacar uma palavra. */
export interface Cabecalho {
  eyebrow?: string;
  titulo: string;
  introducao?: string;
}

export interface AcaoParaSecao {
  texto: string;
  secao: SecaoId;
}

export interface Hero {
  selo?: string;
  titulo: string;
  subtitulo: string;
  /** Botão do WhatsApp. */
  ctaPrimario: string;
  /** Segundo botão ("Ver tratamentos"): leva a uma seção. */
  ctaSecundario: AcaoParaSecao;
}

export interface Sobre extends Cabecalho {
  paragrafos: string[];
  formacao: { titulo: string; itens: string[] };
  abordagem: { titulo: string; texto: string };
}

export interface Area {
  titulo: string;
  texto: string;
  icone?: IconeId;
}

export interface Passo {
  titulo: string;
  texto: string;
  icone?: IconeId;
}

export interface Ambiente {
  titulo: string;
  texto: string;
  imagem: Imagem;
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
  /** Botão do WhatsApp (cabeçalho, hero, contato). */
  conversarWhatsapp: string;
  /** Texto do placeholder quando não há foto do profissional. */
  fotoProfissional: string;
  fotoExemplo: string;
  passo: string;
  endereco: string;
  telefone: string;
  email: string;
  horarios: string;
  redes: string;
  mapa: string;
  direitos: string;
}

export interface Conteudo {
  hero: Hero;
  sobre: Sobre;
  /** Áreas de atendimento. Sem promessa de resultado. */
  areas: Cabecalho & { itens: Area[]; observacao?: string };
  /** Avaliação, plano e acompanhamento: três passos. */
  comoFunciona: Cabecalho & { itens: Passo[]; observacao?: string };
  /** Ambientes do consultório (fotos de ambiente, sem pessoas). */
  estrutura: Cabecalho & { itens: Ambiente[]; observacao?: string };
  /** Sem preço: valores "sob consulta". */
  faq: Cabecalho & { itens: Pergunta[] };
  contato: Cabecalho & {
    texto?: string;
    /** Texto do botão do WhatsApp. */
    ctaWhatsapp: string;
  };
  rodape: {
    /** Aviso de caráter informativo. */
    texto?: string;
    /** Lembrete de que a avaliação é individual. */
    aviso?: string;
  };
  rotulos: Rotulos;
}

export interface Imagens {
  /** Foto de ambiente do topo, sem pessoas. */
  hero: Imagem;
  /** Foto do profissional. Vazio = placeholder "[FOTO DO FISIOTERAPEUTA]". */
  profissional?: Imagem;
  /** Imagem de compartilhamento (Open Graph). */
  og?: Imagem;
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
