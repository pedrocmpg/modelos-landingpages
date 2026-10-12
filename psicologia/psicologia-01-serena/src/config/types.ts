// Contrato do arquivo de configuração. Todo modelo de landing page deste
// repositório segue o mesmo desenho: o cliente novo é feito editando APENAS
// `site.config.ts`. Componentes não têm texto, número, cor, fonte, link ou
// imagem escritos neles.
//
// Este tipo é a versão "psicologia" do padrão. Em relação ao pet shop:
//  - o tipo NÃO TEM depoimentos, notas, avaliações, preços, promoções nem
//    galeria de antes/depois: o Conselho Federal de Psicologia não permite.
//    Não existe campo onde colocar isso;
//  - `negocio.registroProfissional` (CRP) é obrigatório e aparece no cabeçalho
//    e no rodapé;
//  - seções novas: `ajuda` (temas) e `atendimento` (presencial e online);
//  - o contato tem duas opções de mesmo peso (WhatsApp / como funciona);
//  - `tema.cores.suave` (tom claro para faixas e formas);
//  - títulos aceitam `*palavra*` para destacar uma palavra em itálico.

export type SecaoId =
  | "hero"
  | "sobre"
  | "ajuda"
  | "comoFunciona"
  | "atendimento"
  | "faq"
  | "contato";

export type IconeId =
  | "folha"
  | "coracao"
  | "mensagem"
  | "calendario"
  | "relogio"
  | "escudo"
  | "casa"
  | "video";

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
  /** Nome da profissional, como aparece no cabeçalho. */
  nome: string;
  slogan: string;
  cidade: string;
  estado: string;
  /** Obrigatório em psicologia: aparece no cabeçalho e no rodapé. */
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
  /** Cor da marca: formas, linhas e detalhes (não precisa de contraste de texto). */
  primaria: string;
  /** Eyebrows, links e foco. Precisa de contraste de texto (4.5:1). */
  secundaria: string;
  /** Botões (texto branco por cima) e destaques. */
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
    /** Frases curtas e citação em destaque. Sem ela, usa a fonte do título. */
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

/** Títulos aceitam `*palavra*` para destacar (itálico). */
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
  /** Segundo botão, de mesmo peso: leva a uma seção. */
  ctaSecundario: AcaoParaSecao;
  /** Frase curta de abertura, em fonte de destaque. */
  citacao?: string;
}

export interface Sobre extends Cabecalho {
  paragrafos: string[];
  formacao: { titulo: string; itens: string[] };
  abordagem: { titulo: string; texto: string };
}

export interface TemaAjuda {
  titulo: string;
  texto?: string;
}

export interface Passo {
  titulo: string;
  texto: string;
  icone?: IconeId;
}

export interface Modalidade {
  titulo: string;
  texto: string;
  icone?: IconeId;
  imagem?: Imagem;
  /** Lista curta (ex.: endereço, plataforma, duração). */
  detalhes?: string[];
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
  /** Botão do WhatsApp (cabeçalho, hero, contato, botão flutuante). */
  conversarWhatsapp: string;
  /** Texto do placeholder quando não há foto da profissional. */
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
  /** Temas que a profissional atende. Sem diagnóstico. */
  ajuda: Cabecalho & { itens: TemaAjuda[]; aviso?: string };
  /** Primeiro contato: três passos. */
  comoFunciona: Cabecalho & { itens: Passo[]; observacao?: string };
  /** Presencial e online. */
  atendimento: Cabecalho & { itens: Modalidade[]; observacao?: string };
  /** Sem preço: valores "sob consulta". */
  faq: Cabecalho & { itens: Pergunta[] };
  contato: Cabecalho & {
    texto?: string;
    /** As duas opções têm o mesmo peso visual. */
    opcaoWhatsapp: string;
    opcaoComoFunciona: AcaoParaSecao;
  };
  rodape: {
    /** Aviso de caráter informativo. */
    texto?: string;
    /** Orientação para urgência. */
    urgencia?: string;
  };
  rotulos: Rotulos;
}

export interface Imagens {
  /** Foto de ambiente, sem pessoas. */
  hero: Imagem;
  /** Foto da profissional. Vazio = placeholder "[FOTO DA PROFISSIONAL]". */
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
