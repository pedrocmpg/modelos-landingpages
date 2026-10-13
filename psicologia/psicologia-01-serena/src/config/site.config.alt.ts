import type { SiteConfig } from "./types.ts";

// Config alternativo, só para testes: outro profissional fictício, com todas as
// seções ligadas, outras cores, fontes e rótulos. O teste renderiza o app com
// este arquivo e prova que nada do config principal ficou escrito no código.

const altConfig: SiteConfig = {
  meta: {
    title: "Psicólogo Bruno Teste | Consultório em Vila Modelo",
    description: "Texto alternativo de descrição para conferir o título e o Open Graph.",
    lang: "pt-BR",
    noindex: false,
    url: "https://teste.example/",
    ogTitle: "Título alternativo do cartão (teste)",
    ogDescription: "Descrição alternativa do cartão de compartilhamento (teste).",
    ogImage: "/images/og-teste.jpg",
    ogImageAlt: "Imagem alternativa de compartilhamento",
    siteName: "Psicólogo Bruno Teste",
    locale: "pt_PT",
    themeColor: "#FFF4E0",
  },

  negocio: {
    nome: "Psicólogo Bruno Teste",
    slogan: "Clínica psicológica de adultos em Vila Modelo",
    cidade: "Vila Modelo",
    estado: "TS",
    registroProfissional: { conselho: "CRP", numero: "99/99999" },
  },

  contato: {
    whatsapp: "5500911111111",
    mensagemWhatsapp: "Oi, vi o site do Bruno e queria saber mais.",
    telefoneExibicao: "(00) 91111-1111",
    email: "bruno@teste.example",
    endereco: "Avenida Teste, 999 - Bairro Alt",
    mapaEmbedUrl: "https://www.google.com/maps?q=-23.55,-46.63&z=14&output=embed",
    horarios: [{ dias: "Terça e quarta", horas: "14h às 20h" }],
  },

  redes: {
    instagram: "https://instagram.com/perfil_teste_alt",
    facebook: "https://facebook.com/perfil.teste.alt",
  },

  tema: {
    cores: {
      primaria: "#2F6F73",
      secundaria: "#1F5A5E",
      destaque: "#8A2F4F",
      fundo: "#EEF3F2",
      superficie: "#FFFFFF",
      suave: "#D3E4E2",
      texto: "#14282A",
      textoSecundario: "#3D5557",
      escuro: "#14282A",
    },
    fontes: {
      titulo: { familia: "Young Serif", pesos: [400], fallback: "serif" },
      texto: { familia: "Figtree", pesos: [400, 600], fallback: "sans-serif" },
      destaque: { familia: "Lora", pesos: [400], italico: true, fallback: "serif" },
    },
    raio: { cartao: 12, botao: 12 },
    intensidadeAnimacao: "suave",
  },

  secoes: [
    { id: "hero", ativo: true },
    { id: "sobre", ativo: true, menu: "Quem sou" },
    { id: "ajuda", ativo: true, menu: "Temas" },
    { id: "comoFunciona", ativo: true, menu: "Começando" },
    { id: "atendimento", ativo: true, menu: "Modalidades" },
    { id: "faq", ativo: true, menu: "Dúvidas" },
    { id: "contato", ativo: true, menu: "Fale comigo" },
  ],

  conteudo: {
    hero: {
      selo: "Consultório e telepsicologia",
      titulo: "Escuta *cuidadosa* para o seu momento",
      subtitulo: "Texto alternativo do subtítulo da página inicial, com outra redação.",
      ctaPrimario: "Falar pelo zap",
      ctaSecundario: { texto: "Entender as etapas", secao: "comoFunciona" },
      citacao: "Frase alternativa de abertura, escrita só para o teste.",
    },

    sobre: {
      eyebrow: "Apresentação",
      titulo: "Conheça o *Bruno*",
      introducao: "Introdução alternativa da seção de apresentação.",
      paragrafos: [
        "Primeiro parágrafo alternativo sobre a trajetória do profissional de teste.",
        "Segundo parágrafo alternativo, também só para o teste de conteúdo.",
      ],
      formacao: {
        titulo: "Estudos",
        itens: ["Bacharelado alternativo em Psicologia", "Curso alternativo de aperfeiçoamento"],
      },
      abordagem: {
        titulo: "Modo de trabalho",
        texto: "Texto alternativo explicando o modo de trabalho do profissional de teste.",
      },
    },

    ajuda: {
      eyebrow: "Temas de trabalho",
      titulo: "Do que *conversamos*",
      introducao: "Introdução alternativa da lista de temas atendidos.",
      itens: [
        { titulo: "Tema alternativo um", texto: "Descrição alternativa do primeiro tema." },
        { titulo: "Tema alternativo dois", texto: "Descrição alternativa do segundo tema." },
        { titulo: "Tema alternativo três" },
      ],
      aviso: "Aviso alternativo: lista de temas não é diagnóstico.",
    },

    comoFunciona: {
      eyebrow: "Começando",
      titulo: "As *etapas* do começo",
      introducao: "Introdução alternativa dos passos.",
      itens: [
        { titulo: "Etapa alternativa A", texto: "Texto alternativo da primeira etapa.", icone: "mensagem" },
        { titulo: "Etapa alternativa B", texto: "Texto alternativo da segunda etapa.", icone: "relogio" },
        { titulo: "Etapa alternativa C", texto: "Texto alternativo da terceira etapa.", icone: "escudo" },
      ],
      observacao: "Observação alternativa sobre a ausência de agendamento no site.",
    },

    atendimento: {
      eyebrow: "Modalidades",
      titulo: "Consultório ou *vídeo*",
      introducao: "Introdução alternativa das modalidades de atendimento.",
      itens: [
        {
          titulo: "No consultório",
          texto: "Texto alternativo da modalidade presencial.",
          icone: "casa",
          imagem: { src: "/images/ambiente-teste-a.jpg", alt: "Sala alternativa de teste vazia", exemplo: true },
          detalhes: ["Detalhe alternativo presencial"],
        },
        {
          titulo: "Por vídeo",
          texto: "Texto alternativo da modalidade online.",
          icone: "video",
          imagem: { src: "/images/ambiente-teste-b.jpg", alt: "Mesa alternativa de teste vazia" },
        },
      ],
      observacao: "Observação alternativa sobre sigilo nas duas modalidades.",
    },

    faq: {
      eyebrow: "Dúvidas",
      titulo: "Perguntas *alternativas*",
      itens: [
        { pergunta: "Pergunta alternativa número um?", resposta: "Resposta alternativa número um." },
        { pergunta: "Pergunta alternativa número dois?", resposta: "Resposta alternativa número dois." },
      ],
    },

    contato: {
      eyebrow: "Fale comigo",
      titulo: "Vamos *começar*?",
      introducao: "Introdução alternativa do contato.",
      texto: "Texto alternativo do contato, com outro aviso sobre urgência.",
      opcaoWhatsapp: "Abrir conversa no WhatsApp",
      opcaoComoFunciona: { texto: "Ler sobre as etapas", secao: "comoFunciona" },
    },

    rodape: {
      texto: "Texto alternativo do rodapé, de caráter informativo.",
      urgencia: "Orientação alternativa para situações de urgência.",
    },

    rotulos: {
      pularParaConteudo: "Saltar para o texto",
      menuPrincipal: "Navegação principal",
      menuAbrir: "Mostrar menu",
      menuFechar: "Esconder menu",
      conversarWhatsapp: "Falar pelo zap",
      fotoProfissional: "[IMAGEM DO PROFISSIONAL]",
      fotoExemplo: "imagem ilustrativa",
      passo: "Etapa",
      endereco: "Onde fica",
      telefone: "Telefone fixo",
      email: "Correio eletrônico",
      horarios: "Dias de atendimento",
      redes: "Perfis",
      mapa: "Localização:",
      direitos: "Direitos reservados.",
    },
  },

  imagens: {
    hero: { src: "/images/hero-teste.jpg", alt: "Imagem alternativa de teste do topo", exemplo: true },
    profissional: { src: "/images/profissional-teste.jpg", alt: "Retrato alternativo do profissional de teste" },
  },
};

export default altConfig;
