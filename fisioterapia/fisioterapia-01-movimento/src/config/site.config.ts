import type { SiteConfig } from "./types.ts";

// ÚNICO arquivo que se edita para criar o site de um cliente.
// Todos os dados abaixo são FICTÍCIOS (modelo de demonstração).
//
// Regras de publicidade em fisioterapia que este modelo já respeita
// (o profissional ainda deve conferir as normas atuais do COFFITO/CREFITO):
//  - sem fotos de antes e depois, sem promessa de cura, de "sem dor" ou de
//    tempo de recuperação;
//  - sem preços, promoções ou descontos;
//  - sem depoimentos de pacientes, nem de exemplo;
//  - CREFITO visível no cabeçalho e no rodapé (negocio.registroProfissional);
//  - sem fotos de pacientes identificáveis.
// Títulos aceitam *palavra* para destacar uma palavra.

const siteConfig: SiteConfig = {
  meta: {
    title: "Fisioterapeuta João Exemplo | Fisioterapia ortopédica em Cidade Exemplo",
    description:
      "Fisioterapia ortopédica e funcional com avaliação individual e plano de atendimento. Conheça o consultório e chame pelo WhatsApp.",
    lang: "pt-BR",
    noindex: true,
  },

  negocio: {
    nome: "Fisioterapeuta João Exemplo",
    slogan: "Fisioterapia ortopédica e funcional",
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
      { dias: "Segunda a sexta", horas: "7h às 19h" },
      { dias: "Sábado", horas: "8h às 12h" },
    ],
  },

  redes: {
    instagram: "https://instagram.com/seu_perfil_aqui",
    facebook: "",
  },

  tema: {
    cores: {
      primaria: "#0F5C5C",
      secundaria: "#0D5252",
      destaque: "#C2410C",
      fundo: "#F5F8F7",
      superficie: "#FFFFFF",
      suave: "#DDEEEC",
      texto: "#14282B",
      textoSecundario: "#52666A",
      escuro: "#0E2F30",
    },
    fontes: {
      titulo: { familia: "Bricolage Grotesque", pesos: [500, 600, 700], fallback: "sans-serif" },
      texto: { familia: "Instrument Sans", pesos: [400, 500, 600, 700], fallback: "sans-serif" },
    },
    raio: { cartao: 24, botao: 999 },
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
      selo: "Fisioterapia ortopédica e funcional",
      titulo: "Cuidado com o *movimento* do seu corpo",
      subtitulo:
        "Atendimento com hora marcada, avaliação individual e um plano explicado com clareza, em Cidade Exemplo.",
      ctaPrimario: "Conversar no WhatsApp",
      ctaSecundario: { texto: "Ver tratamentos", secao: "areas" },
    },

    sobre: {
      eyebrow: "Sobre",
      titulo: "Um atendimento feito com *atenção* ao seu jeito de se mover",
      introducao: "Fisioterapia com escuta, exame cuidadoso e explicações em linguagem simples.",
      paragrafos: [
        "Sou fisioterapeuta e atendo adultos com queixas musculares e articulares, na rotina de trabalho, no esporte ou depois de um procedimento ortopédico.",
        "Gosto de explicar o que encontrei na avaliação e por que cada conduta foi escolhida, para que você participe das decisões sobre o seu atendimento.",
      ],
      formacao: {
        titulo: "Formação",
        itens: [
          "Graduação em Fisioterapia (instituição de exemplo)",
          "Pós-graduação em Fisioterapia Ortopédica (exemplo)",
          "Cursos de terapia manual e exercício terapêutico (exemplo)",
        ],
      },
      abordagem: {
        titulo: "Como eu trabalho",
        texto:
          "Combino terapia manual, exercícios e orientações para o dia a dia, de acordo com o que a avaliação indicar para cada pessoa.",
      },
    },

    areas: {
      eyebrow: "Tratamentos",
      titulo: "Áreas de *atendimento*",
      introducao: "Queixas musculares e articulares atendidas no consultório.",
      itens: [
        {
          titulo: "Coluna e postura",
          texto: "Avaliação e atendimento de queixas no pescoço e nas costas ligadas à rotina e ao trabalho.",
          icone: "coluna",
        },
        {
          titulo: "Ombro e braço",
          texto: "Atendimento de queixas no ombro, no cotovelo e no punho, em esforços do dia a dia e do esporte.",
          icone: "ombro",
        },
        {
          titulo: "Joelho e quadril",
          texto: "Avaliação de movimento e força para queixas nas articulações do membro inferior.",
          icone: "joelho",
        },
        {
          titulo: "Pés e tornozelo",
          texto: "Atendimento de queixas nos pés e no tornozelo, incluindo as ligadas à corrida e à caminhada.",
          icone: "pe",
        },
        {
          titulo: "Equilíbrio e mobilidade",
          texto: "Exercícios voltados à segurança e à autonomia nos movimentos do dia a dia.",
          icone: "equilibrio",
        },
        {
          titulo: "Pós-operatório ortopédico",
          texto: "Acompanhamento depois de procedimentos ortopédicos, seguindo as orientações da equipe médica.",
          icone: "movimento",
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
          texto: "Conversa sobre a sua queixa e o seu histórico, exame físico e testes de movimento.",
          icone: "prancheta",
        },
        {
          titulo: "Plano de atendimento",
          texto: "O profissional explica o plano, a frequência sugerida e o que você pode fazer em casa.",
          icone: "rota",
        },
        {
          titulo: "Acompanhamento",
          texto: "O plano é revisto ao longo dos atendimentos e ajustado quando for preciso.",
          icone: "calendario",
        },
      ],
      observacao: "O número de atendimentos varia de pessoa para pessoa e é definido na avaliação.",
    },

    estrutura: {
      eyebrow: "Consultório",
      titulo: "Um espaço *organizado* para o atendimento",
      introducao: "Ambientes pensados para o exame, a terapia manual e os exercícios.",
      itens: [
        {
          titulo: "Sala de atendimento",
          texto: "Maca ajustável e iluminação suave para a terapia manual.",
          imagem: {
            src: "/images/sala-atendimento.jpg",
            alt: "Sala de atendimento com maca ajustável, parede verde e janela grande",
            exemplo: true,
          },
        },
        {
          titulo: "Espaço de exercícios",
          texto: "Aparelhos, colchonetes e halteres para os exercícios do plano.",
          imagem: {
            src: "/images/sala-exercicios.jpg",
            alt: "Sala de exercícios com aparelho de musculação, colchonete e halteres",
            exemplo: true,
          },
        },
        {
          titulo: "Sala de avaliação",
          texto: "Ambiente reservado para a conversa e o exame físico.",
          imagem: {
            src: "/images/sala-avaliacao.jpg",
            alt: "Sala de avaliação com maca reclinável, banqueta e carrinho de apoio",
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
            "É uma avaliação: conversamos sobre a sua queixa e o seu histórico, faço o exame físico e explico o plano de atendimento.",
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
          pergunta: "Quantos atendimentos vou precisar?",
          resposta:
            "Varia de pessoa para pessoa. O número é combinado depois da avaliação e revisto durante o acompanhamento.",
        },
        {
          pergunta: "O que levo para o atendimento?",
          resposta:
            "Roupas confortáveis que permitam mover o corpo, exames e laudos anteriores e a lista dos medicamentos que você usa.",
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
      src: "/images/pilates-reformer.jpg",
      alt: "Aparelho de pilates com almofadas de apoio ao lado de uma janela com cortinas claras",
      exemplo: true,
    },
    og: {
      src: "/images/pilates-reformer.jpg",
      alt: "Aparelho de pilates com almofadas de apoio ao lado de uma janela com cortinas claras",
    },
  },
};

export default siteConfig;
