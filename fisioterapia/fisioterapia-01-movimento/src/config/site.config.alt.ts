import type { SiteConfig } from "./types.ts";

// Config ALTERNATIVO, só para testes: outro profissional, outro CREFITO,
// outras cores e fontes, outras seções ligadas/desligadas e campos opcionais
// preenchidos. O teste do app prova que a página inteira vem do config:
// nada do config principal pode sobrar na tela.

const altConfig: SiteConfig = {
  meta: {
    title: "Fisioterapeuta Marcos Teste | Fisioterapia em Vila Modelo",
    description: "Texto alternativo de descrição para o teste do modelo de fisioterapia.",
    lang: "pt-BR",
    noindex: false,
    url: "https://teste.example/",
  },

  negocio: {
    nome: "Fisioterapeuta Marcos Teste",
    slogan: "Atendimento alternativo de teste",
    cidade: "Vila Modelo",
    estado: "TS",
    registroProfissional: { conselho: "CREFITO", numero: "9/999999-F" },
  },

  contato: {
    whatsapp: "5500911111111",
    mensagemWhatsapp: "Olá, esta é a mensagem alternativa de teste.",
    telefoneExibicao: "(00) 91111-1111",
    email: "alternativo@teste.example",
    endereco: "Avenida Alternativa, 456 - Bloco B",
    mapaEmbedUrl: "https://www.google.com/maps?q=-23.55,-46.63&z=14&output=embed",
    horarios: [{ dias: "Terça a quinta", horas: "10h às 16h" }],
  },

  redes: {
    instagram: "https://instagram.com/perfil_alternativo",
    facebook: "https://facebook.com/perfil.alternativo",
  },

  tema: {
    cores: {
      primaria: "#6B3FA0",
      secundaria: "#5B2E91",
      destaque: "#A3340F",
      fundo: "#FAF7FC",
      superficie: "#FFFFFF",
      suave: "#EADFF5",
      texto: "#1F1530",
      textoSecundario: "#5A4C70",
      escuro: "#241238",
    },
    fontes: {
      titulo: { familia: "Young Serif", pesos: [400], fallback: "serif" },
      texto: { familia: "Work Sans", pesos: [400, 500, 600], fallback: "sans-serif" },
      rotulo: { familia: "DM Mono", pesos: [400, 500], fallback: "monospace" },
    },
    raio: { cartao: 10, botao: 8 },
    intensidadeAnimacao: "suave",
  },

  secoes: [
    { id: "hero", ativo: true },
    { id: "sobre", ativo: true, menu: "Quem sou" },
    { id: "areas", ativo: true, menu: "Áreas" },
    { id: "comoFunciona", ativo: true, menu: "Etapas" },
    { id: "estrutura", ativo: true, menu: "Espaço" },
    { id: "faq", ativo: true, menu: "Dúvidas" },
    { id: "contato", ativo: true, menu: "Falar conosco" },
  ],

  conteudo: {
    hero: {
      selo: "Selo alternativo do hero",
      titulo: "Título *alternativo* do topo da página",
      subtitulo: "Subtítulo alternativo do topo, só para o teste.",
      ctaPrimario: "Chamar no zap",
      ctaSecundario: { texto: "Conhecer as áreas", secao: "areas" },
    },

    sobre: {
      eyebrow: "Quem sou",
      titulo: "Apresentação *alternativa* do profissional",
      introducao: "Introdução alternativa da apresentação.",
      paragrafos: [
        "Primeiro parágrafo alternativo da apresentação.",
        "Segundo parágrafo alternativo da apresentação.",
      ],
      formacao: {
        titulo: "Trajetória alternativa",
        itens: ["Formação alternativa A", "Formação alternativa B"],
      },
      abordagem: {
        titulo: "Método alternativo",
        texto: "Texto alternativo sobre o método de trabalho.",
      },
    },

    areas: {
      eyebrow: "Áreas",
      titulo: "Áreas *alternativas* de atuação",
      introducao: "Introdução alternativa das áreas.",
      itens: [
        { titulo: "Área alternativa Um", texto: "Texto alternativo da primeira área.", icone: "ombro" },
        { titulo: "Área alternativa Dois", texto: "Texto alternativo da segunda área.", icone: "pe" },
        { titulo: "Área alternativa Três", texto: "Texto alternativo da terceira área." },
        { titulo: "Área alternativa Quatro", texto: "Texto alternativo da quarta área.", icone: "equilibrio" },
      ],
      observacao: "Observação alternativa das áreas.",
    },

    comoFunciona: {
      eyebrow: "Etapas",
      titulo: "Etapas *alternativas* do processo",
      introducao: "Introdução alternativa das etapas.",
      itens: [
        { titulo: "Etapa alternativa Um", texto: "Texto alternativo da primeira etapa.", icone: "prancheta" },
        { titulo: "Etapa alternativa Dois", texto: "Texto alternativo da segunda etapa.", icone: "rota" },
        { titulo: "Etapa alternativa Três", texto: "Texto alternativo da terceira etapa." },
      ],
      observacao: "Observação alternativa das etapas.",
    },

    estrutura: {
      eyebrow: "Espaço",
      titulo: "Espaço *alternativo* de atendimento",
      introducao: "Introdução alternativa do espaço.",
      itens: [
        {
          titulo: "Ambiente alternativo Um",
          texto: "Texto alternativo do primeiro ambiente.",
          imagem: { src: "/images/sala-avaliacao.jpg", alt: "Sala alternativa de teste com maca", exemplo: true },
        },
        {
          titulo: "Ambiente alternativo Dois",
          texto: "Texto alternativo do segundo ambiente.",
          imagem: { src: "/images/sala-exercicios.jpg", alt: "Salão alternativo de teste com aparelhos" },
        },
      ],
      observacao: "Observação alternativa do espaço.",
    },

    faq: {
      eyebrow: "Dúvidas",
      titulo: "Perguntas *alternativas* e respostas",
      introducao: "Introdução alternativa das dúvidas.",
      itens: [
        { pergunta: "Pergunta alternativa um?", resposta: "Resposta alternativa um." },
        { pergunta: "Pergunta alternativa dois?", resposta: "Resposta alternativa dois." },
      ],
    },

    contato: {
      eyebrow: "Falar conosco",
      titulo: "Chamada *alternativa* para o contato",
      introducao: "Introdução alternativa do contato.",
      texto: "Texto alternativo de apoio ao contato.",
      ctaWhatsapp: "Abrir conversa alternativa",
    },

    rodape: {
      texto: "Aviso informativo alternativo do rodapé.",
      aviso: "Lembrete alternativo de avaliação individual.",
    },

    rotulos: {
      pularParaConteudo: "Ir direto ao conteúdo",
      menuPrincipal: "Navegação alternativa",
      menuAbrir: "Abrir navegação",
      menuFechar: "Fechar navegação",
      conversarWhatsapp: "Chamar no zap",
      fotoProfissional: "[FOTO ALTERNATIVA]",
      fotoExemplo: "imagem ilustrativa",
      passo: "Fase",
      endereco: "Onde fica",
      telefone: "Fone",
      email: "Correio",
      horarios: "Quando atendemos",
      redes: "Perfis",
      mapa: "Mapa alternativo:",
      direitos: "Direitos alternativos.",
    },
  },

  imagens: {
    hero: {
      src: "/images/sala-atendimento.jpg",
      alt: "Sala alternativa de teste vazia",
      exemplo: true,
    },
    profissional: {
      src: "/images/sala-avaliacao.jpg",
      alt: "Retrato alternativo do profissional de teste",
    },
    og: { src: "/images/og-teste.jpg", alt: "Imagem alternativa de compartilhamento" },
  },
};

export default altConfig;
