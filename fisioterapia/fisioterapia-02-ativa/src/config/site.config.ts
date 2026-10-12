import type { SiteConfig } from "./types.ts";

// ÚNICO arquivo que se edita para criar o site de um cliente.
// Todos os dados abaixo são FICTÍCIOS (modelo de demonstração).
//
// Regras de publicidade em fisioterapia que este modelo já respeita
// (o profissional ainda deve conferir as normas atuais do COFFITO/CREFITO):
//  - sem fotos de antes e depois, sem promessa de cura, de "sem dor" ou de
//    tempo de recuperação (nem de "volta ao esporte" em prazo certo);
//  - sem preços, promoções ou descontos;
//  - sem depoimentos de pacientes, nem de exemplo;
//  - CREFITO visível no cabeçalho e no rodapé (negocio.registroProfissional);
//  - sem fotos de pacientes identificáveis.
// Títulos aceitam *palavra* para destacar uma palavra.
//
// Cores: `primaria` é o cobalto dos botões e dos destaques sobre fundo claro.
// `destaque` (lima) só entra sobre fundo escuro: nunca como texto sobre claro.

const siteConfig: SiteConfig = {
  meta: {
    title: "Fisioterapeuta João Exemplo | Fisioterapia ortopédica e esportiva em Cidade Exemplo",
    description:
      "Fisioterapia ortopédica e esportiva com avaliação detalhada e plano de atendimento. Conheça o consultório e chame pelo WhatsApp.",
    lang: "pt-BR",
    noindex: true,
  },

  negocio: {
    nome: "Fisioterapeuta João Exemplo",
    slogan: "Fisioterapia ortopédica e esportiva",
    cidade: "Cidade Exemplo",
    estado: "EX",
    registroProfissional: { conselho: "CREFITO", numero: "0/000000-F" },
  },

  contato: {
    whatsapp: "5500900000000",
    mensagemWhatsapp: "Olá! Encontrei seu site e gostaria de saber mais sobre o atendimento de fisioterapia.",
    telefoneExibicao: "(00) 90000-0000",
    email: "contato@exemplo.com",
    endereco: "Rua Exemplo, 123 - Sala 4 - Centro",
    mapaEmbedUrl: "https://www.google.com/maps?q=-15.7801,-47.9292&z=14&output=embed",
    horarios: [
      { dias: "Segunda a sexta", horas: "6h30 às 20h" },
      { dias: "Sábado", horas: "8h às 12h" },
    ],
  },

  redes: {
    instagram: "https://instagram.com/seu_perfil_aqui",
    facebook: "",
  },

  tema: {
    cores: {
      primaria: "#1E4FD8",
      secundaria: "#1A44BF",
      destaque: "#C6F24E",
      fundo: "#F4F6F8",
      superficie: "#FFFFFF",
      suave: "#E3EAFA",
      texto: "#0F1B2D",
      textoSecundario: "#4A5568",
      escuro: "#0E1A2B",
    },
    fontes: {
      titulo: { familia: "Unbounded", pesos: [500, 600, 700], fallback: "sans-serif" },
      texto: { familia: "Figtree", pesos: [400, 500, 600, 700], fallback: "sans-serif" },
      rotulo: { familia: "IBM Plex Mono", pesos: [400, 500, 600], fallback: "monospace" },
    },
    raio: { cartao: 10, botao: 8 },
    intensidadeAnimacao: "normal",
  },

  secoes: [
    { id: "hero", ativo: true },
    { id: "sobre", ativo: true, menu: "Sobre" },
    { id: "areas", ativo: true, menu: "Tratamentos" },
    { id: "comoFunciona", ativo: true, menu: "Como funciona" },
    { id: "estrutura", ativo: true, menu: "Consultório" },
    { id: "faq", ativo: true, menu: "Perguntas" },
    { id: "contato", ativo: true, menu: "Contato" },
  ],

  conteudo: {
    hero: {
      selo: "Ortopedia e esporte",
      titulo: "Movimento com *método* e critério",
      subtitulo:
        "Fisioterapia ortopédica e esportiva com avaliação detalhada, plano claro e acompanhamento próximo, em Cidade Exemplo.",
      ctaPrimario: "Conversar no WhatsApp",
      ctaSecundario: { texto: "Ver tratamentos", secao: "areas" },
    },

    sobre: {
      eyebrow: "Sobre",
      titulo: "Avaliação *técnica* e conversa direta",
      introducao: "Atendimento para quem treina, trabalha ou simplesmente quer se mover com mais segurança.",
      paragrafos: [
        "Sou fisioterapeuta e atendo adultos com queixas musculares e articulares ligadas ao treino, ao trabalho e à rotina, e também depois de procedimentos ortopédicos.",
        "Explico o que encontrei na avaliação e por que cada conduta foi escolhida: você participa das decisões sobre o seu atendimento.",
      ],
      formacao: {
        titulo: "Formação",
        itens: [
          "Graduação em Fisioterapia (instituição de exemplo)",
          "Pós-graduação em Fisioterapia Esportiva (exemplo)",
          "Cursos de análise de movimento e exercício terapêutico (exemplo)",
        ],
      },
      abordagem: {
        titulo: "Como eu trabalho",
        texto:
          "Avaliação do movimento, terapia manual e exercícios progressivos, de acordo com o que a avaliação indicar para cada pessoa.",
      },
    },

    areas: {
      eyebrow: "Tratamentos",
      titulo: "Áreas de *atendimento*",
      introducao: "Queixas musculares e articulares atendidas no consultório.",
      itens: [
        {
          titulo: "Esporte e treino",
          texto: "Avaliação de queixas ligadas à corrida, à musculação e a outras modalidades.",
          icone: "movimento",
        },
        {
          titulo: "Coluna e tronco",
          texto: "Atendimento de queixas no pescoço e nas costas, na rotina e no treino.",
          icone: "coluna",
        },
        {
          titulo: "Ombro e cotovelo",
          texto: "Avaliação de movimento e força para queixas no ombro, no cotovelo e no punho.",
          icone: "ombro",
        },
        {
          titulo: "Joelho e quadril",
          texto: "Atendimento de queixas nas articulações do membro inferior, com foco em força e controle.",
          icone: "joelho",
        },
        {
          titulo: "Tornozelo e pé",
          texto: "Avaliação de queixas no tornozelo e no pé, incluindo as ligadas à pisada.",
          icone: "pe",
        },
        {
          titulo: "Pós-operatório ortopédico",
          texto: "Acompanhamento depois de procedimentos ortopédicos, seguindo as orientações da equipe médica.",
          icone: "rota",
        },
      ],
      observacao: "A indicação de qualquer tratamento depende de avaliação individual.",
    },

    comoFunciona: {
      eyebrow: "Como funciona",
      titulo: "Do primeiro atendimento ao *acompanhamento*",
      introducao: "Três etapas, explicadas com clareza em cada uma.",
      itens: [
        {
          titulo: "Avaliação",
          texto: "Conversa sobre a sua queixa e a sua rotina de treino, exame físico e testes de movimento.",
        },
        {
          titulo: "Plano de atendimento",
          texto: "O profissional explica o plano, a frequência sugerida e os exercícios que você faz em casa ou no treino.",
        },
        {
          titulo: "Acompanhamento",
          texto: "O plano é revisto ao longo dos atendimentos e ajustado quando for preciso.",
        },
      ],
      observacao: "O número de atendimentos varia de pessoa para pessoa e é definido na avaliação.",
    },

    estrutura: {
      eyebrow: "Consultório",
      titulo: "Estrutura para *avaliar* e treinar",
      introducao: "Ambientes pensados para o exame, a terapia manual e os exercícios.",
      itens: [
        {
          titulo: "Sala de atendimento",
          texto: "Maca com regulagem e espaço para a terapia manual e a avaliação.",
          imagem: {
            src: "/images/maca-atendimento.jpg",
            alt: "Sala de atendimento com maca estofada vermelha, piso de madeira e uma porta ao fundo",
            exemplo: true,
          },
        },
        {
          titulo: "Área de treino funcional",
          texto: "Piso emborrachado e equipamentos para os exercícios do plano.",
          imagem: {
            src: "/images/sala-treino.jpg",
            alt: "Sala de treino com piso emborrachado e equipamentos em penumbra",
            exemplo: true,
          },
        },
        {
          titulo: "Halteres e anilhas",
          texto: "Cargas progressivas para o fortalecimento orientado.",
          imagem: {
            src: "/images/halteres.jpg",
            alt: "Fileira de halteres pretos em um suporte",
            exemplo: true,
          },
        },
      ],
      observacao: "Ambientes ilustrativos. Troque pelas fotos do consultório.",
    },

    faq: {
      eyebrow: "Perguntas",
      titulo: "Dúvidas *frequentes*",
      introducao: "Se a sua dúvida não estiver aqui, pergunte pelo WhatsApp.",
      itens: [
        {
          pergunta: "Como é o primeiro atendimento?",
          resposta:
            "É uma avaliação: conversamos sobre a sua queixa e a sua rotina, faço o exame físico e explico o plano de atendimento.",
        },
        {
          pergunta: "Preciso de pedido médico?",
          resposta:
            "Em geral, a avaliação fisioterapêutica não exige pedido médico. Se você tem exames ou laudos, leve para a avaliação.",
        },
        {
          pergunta: "Quais são os valores?",
          resposta:
            "Os valores são informados sob consulta, pelo WhatsApp ou pelo telefone, de acordo com o tipo de atendimento.",
        },
        {
          pergunta: "Posso continuar treinando durante o atendimento?",
          resposta:
            "Isso é definido na avaliação, caso a caso. O profissional orienta o que manter, adaptar ou pausar.",
        },
        {
          pergunta: "O que levo para o atendimento?",
          resposta:
            "Roupas e tênis de treino, exames e laudos anteriores e a lista dos medicamentos que você usa.",
        },
        {
          pergunta: "Vocês atendem por convênio?",
          resposta: "As informações sobre convênios e formas de pagamento são passadas no contato.",
        },
      ],
    },

    contato: {
      eyebrow: "Contato",
      titulo: "Vamos *conversar* sobre o seu atendimento?",
      introducao: "Chame pelo WhatsApp para tirar dúvidas e combinar um horário para a avaliação.",
      texto: "O consultório fica no centro de Cidade Exemplo. Respondemos nos horários de atendimento.",
      ctaWhatsapp: "Conversar no WhatsApp",
    },

    rodape: {
      texto: "As informações deste site têm caráter informativo e não substituem a avaliação com um fisioterapeuta.",
      aviso: "O atendimento é individual e qualquer conduta depende de avaliação presencial.",
    },

    rotulos: {
      pularParaConteudo: "Pular para o conteúdo",
      menuPrincipal: "Menu principal",
      menuAbrir: "Abrir menu",
      menuFechar: "Fechar menu",
      conversarWhatsapp: "Conversar no WhatsApp",
      fotoProfissional: "[FOTO DO FISIOTERAPEUTA]",
      fotoExemplo: "foto de exemplo",
      passo: "Etapa",
      endereco: "Endereço",
      telefone: "Telefone",
      email: "E-mail",
      horarios: "Horários de atendimento",
      redes: "Redes sociais",
      mapa: "Mapa do consultório:",
      direitos: "Todos os direitos reservados.",
    },
  },

  imagens: {
    hero: {
      src: "/images/anilhas-kettlebells.jpg",
      alt: "Prateleira de aço com kettlebells coloridos e bolas de treino sobre piso emborrachado",
      exemplo: true,
    },
    og: {
      src: "/images/anilhas-kettlebells.jpg",
      alt: "Prateleira de aço com kettlebells coloridos e bolas de treino sobre piso emborrachado",
    },
  },
};

export default siteConfig;
