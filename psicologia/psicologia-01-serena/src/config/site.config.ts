import type { SiteConfig } from "./types.ts";

// ÚNICO arquivo que se edita para criar o site de um cliente.
// Todos os dados abaixo são FICTÍCIOS (modelo de demonstração).
//
// Regras do Conselho Federal de Psicologia que este modelo já respeita:
//  - sem depoimentos, avaliações, preços, promoções ou promessa de resultado;
//  - CRP visível no cabeçalho e no rodapé (negocio.registroProfissional);
//  - sem fotos de pacientes ou de pessoas em sessão.
// Títulos aceitam *palavra* para destacar uma palavra em itálico.

const siteConfig: SiteConfig = {
  meta: {
    title: "Psicóloga Clara Exemplo | Psicoterapia presencial e online",
    description:
      "Atendimento psicológico para adultos, presencial e online, com escuta cuidadosa e sigilo. Conheça o trabalho e veja como funciona o primeiro contato.",
    lang: "pt-BR",
    noindex: true,
    // Cartão de compartilhamento (WhatsApp, Instagram, LinkedIn, X). Gerado no build.
    url: "https://modelo-psicologia-serena.vercel.app/",
    ogTitle: "Modelo de site para psicologia — exemplo",
    ogDescription:
      "Exemplo de landing page para psicologia (estilo Serena), com dados fictícios. É um modelo de demonstração, não um site real.",
    ogImage: "/og-image.png",
    ogImageAlt: "Início do modelo de site para psicologia (estilo Serena), com o título do cartão: Modelo de site para psicologia — exemplo",
    siteName: "Psicóloga Clara Exemplo",
    locale: "pt_BR",
    themeColor: "#F7F4EE",
  },

  negocio: {
    nome: "Psicóloga Clara Exemplo",
    slogan: "Psicoterapia para adultos, presencial e online",
    cidade: "Cidade Exemplo",
    estado: "EX",
    registroProfissional: { conselho: "CRP", numero: "00/00000" },
  },

  contato: {
    whatsapp: "5500900000000",
    mensagemWhatsapp:
      "Olá! Encontrei seu site e gostaria de conversar sobre o atendimento psicológico.",
    telefoneExibicao: "(00) 90000-0000",
    email: "contato@exemplo.com",
    endereco: "Rua Exemplo, 123 - Sala 4 - Centro",
    mapaEmbedUrl: "https://www.google.com/maps?q=-15.7801,-47.9292&z=14&output=embed",
    horarios: [
      { dias: "Segunda a quinta", horas: "9h às 19h" },
      { dias: "Sexta", horas: "9h às 13h" },
    ],
  },

  redes: {
    instagram: "https://instagram.com/seu_perfil_aqui",
    facebook: "",
  },

  tema: {
    cores: {
      primaria: "#5E7A6B",
      secundaria: "#4C6858",
      destaque: "#9C5A44",
      fundo: "#F7F4EE",
      superficie: "#FFFFFF",
      suave: "#E3EBE4",
      texto: "#2E2A26",
      textoSecundario: "#6B635A",
      escuro: "#2F3B34",
    },
    fontes: {
      titulo: { familia: "Instrument Serif", pesos: [400], italico: true, fallback: "serif" },
      texto: { familia: "Hanken Grotesk", pesos: [400, 500, 600, 700], fallback: "sans-serif" },
    },
    raio: { cartao: 32, botao: 999 },
    intensidadeAnimacao: "normal",
  },

  secoes: [
    { id: "hero", ativo: true },
    { id: "sobre", ativo: true, menu: "Sobre" },
    { id: "ajuda", ativo: true, menu: "Como posso ajudar" },
    { id: "comoFunciona", ativo: true, menu: "Primeiro contato" },
    { id: "atendimento", ativo: true, menu: "Atendimento" },
    { id: "faq", ativo: true, menu: "Perguntas" },
    { id: "contato", ativo: true, menu: "Contato" },
  ],

  conteudo: {
    hero: {
      selo: "Atendimento presencial e online",
      titulo: "Um espaço *sem pressa* para você se escutar",
      subtitulo:
        "Sou psicóloga e atendo adultos em sessões individuais, no consultório ou por vídeo. Você pode começar com uma conversa simples pelo WhatsApp.",
      ctaPrimario: "Conversar no WhatsApp",
      ctaSecundario: { texto: "Ver como funciona o atendimento", secao: "comoFunciona" },
      citacao: "Nem tudo precisa ser resolvido hoje. Dá para começar pelo que pesa agora.",
    },

    sobre: {
      eyebrow: "Sobre",
      titulo: "Quem vai *te receber*",
      paragrafos: [
        "Sou Clara Exemplo, psicóloga com atuação em clínica com adultos. Para mim, o consultório é um lugar para falar com calma, sem julgamento e com sigilo.",
        "Meu trabalho é acompanhar cada pessoa no ritmo dela, a partir do que ela decide trazer para a sessão.",
      ],
      formacao: {
        titulo: "Formação",
        itens: [
          "Graduação em Psicologia, Universidade Exemplo",
          "Especialização em Psicologia Clínica, Instituto Exemplo",
          "Formação continuada em psicoterapia, Centro de Estudos Exemplo",
        ],
      },
      abordagem: {
        titulo: "Abordagem",
        texto:
          "Trabalho com psicoterapia de base humanista, em sessões individuais de 50 minutos. A escuta é o ponto de partida: nós dois definimos, aos poucos, o que faz sentido conversar.",
      },
    },

    ajuda: {
      eyebrow: "Como posso ajudar",
      titulo: "Assuntos que *as pessoas trazem*",
      introducao:
        "Estes são alguns temas comuns no consultório. Não é uma lista fechada: cada pessoa chega com a sua própria história.",
      itens: [
        {
          titulo: "Ansiedade e preocupação",
          texto: "Quando a cabeça não desacelera e o corpo sente o peso do dia.",
        },
        {
          titulo: "Cansaço e rotina de trabalho",
          texto: "Sobrecarga, cobranças e a dificuldade de descansar de verdade.",
        },
        {
          titulo: "Relacionamentos",
          texto: "Conflitos, distâncias e o jeito de se relacionar com família, amigos e parceiros.",
        },
        {
          titulo: "Luto e perdas",
          texto: "Um espaço para falar de quem ou do que partiu, no seu tempo.",
        },
        {
          titulo: "Mudanças de vida",
          texto: "Novas fases, decisões difíceis e recomeços que pedem escuta.",
        },
        {
          titulo: "Autoconhecimento",
          texto: "Entender melhor seus próprios caminhos, escolhas e limites.",
        },
      ],
      aviso:
        "Esta lista não é um diagnóstico nem substitui uma avaliação feita em atendimento psicológico.",
    },

    comoFunciona: {
      eyebrow: "Primeiro contato",
      titulo: "Como funciona o *primeiro contato*",
      introducao: "Três passos simples, no seu ritmo.",
      itens: [
        {
          titulo: "Você escreve",
          texto:
            "Envie uma mensagem pelo WhatsApp contando, em poucas palavras, o que o traz até aqui e se prefere presencial ou online.",
          icone: "mensagem",
        },
        {
          titulo: "Combinamos o horário",
          texto:
            "Respondo nos horários de atendimento e escolhemos juntos o melhor dia e a modalidade. Dúvidas sobre valores são esclarecidas diretamente, sob consulta.",
          icone: "calendario",
        },
        {
          titulo: "Primeira sessão",
          texto:
            "Na primeira sessão nos conhecemos, você conta o que quiser e entendemos juntos como o acompanhamento pode seguir.",
          icone: "folha",
        },
      ],
      observacao: "Este site não faz agendamento online: a conversa começa pelo WhatsApp.",
    },

    atendimento: {
      eyebrow: "Onde e como",
      titulo: "Atendimento *presencial e online*",
      introducao:
        "As duas formas têm o mesmo cuidado e o mesmo sigilo. Você escolhe a que combina com a sua rotina.",
      itens: [
        {
          titulo: "Presencial",
          texto: "No consultório, em um ambiente tranquilo e reservado.",
          icone: "casa",
          imagem: {
            src: "/images/ambiente-poltrona-clara.jpg",
            alt: "Poltrona clara ao lado de uma janela com cortina",
            exemplo: true,
          },
          detalhes: ["Sessões individuais de 50 minutos", "Sala reservada, com acessibilidade"],
        },
        {
          titulo: "Online",
          texto: "Por videochamada, de onde você estiver, com a mesma privacidade.",
          icone: "video",
          imagem: {
            src: "/images/ambiente-notebook-planta.jpg",
            alt: "Notebook sobre uma mesa clara ao lado de um pequeno vaso de planta",
            exemplo: true,
          },
          detalhes: ["Basta um lugar reservado e uma boa conexão", "O link chega antes da sessão"],
        },
      ],
      observacao: "Em qualquer modalidade, o sigilo profissional é regra.",
    },

    faq: {
      eyebrow: "Perguntas frequentes",
      titulo: "Dúvidas *comuns*",
      itens: [
        {
          pergunta: "Qual é o valor da sessão?",
          resposta:
            "Os valores são informados diretamente, sob consulta, depois de uma conversa inicial pelo WhatsApp.",
        },
        {
          pergunta: "Preciso de diagnóstico ou encaminhamento para começar?",
          resposta:
            "Não. Você pode procurar atendimento para conversar sobre o que está vivendo, sem diagnóstico prévio.",
        },
        {
          pergunta: "Quanto dura cada sessão e com que frequência acontecem?",
          resposta:
            "As sessões duram 50 minutos. A frequência é combinada em conjunto, conforme cada caso.",
        },
        {
          pergunta: "Quanto tempo dura o acompanhamento?",
          resposta:
            "Não há prazo definido. Isso varia de pessoa para pessoa e é conversado ao longo do processo.",
        },
        {
          pergunta: "O que eu conto fica em sigilo?",
          resposta:
            "Sim. O sigilo é um dever ético da profissão, com as exceções previstas no Código de Ética Profissional do Psicólogo.",
        },
        {
          pergunta: "Qual público você atende?",
          resposta: "Atendo adultos, em sessões individuais.",
        },
      ],
    },

    contato: {
      eyebrow: "Contato",
      titulo: "Vamos *conversar*?",
      introducao: "Escolha como prefere dar o próximo passo.",
      texto:
        "Respondo as mensagens nos horários de atendimento. Este canal não é indicado para situações de urgência.",
      opcaoWhatsapp: "Conversar no WhatsApp",
      opcaoComoFunciona: { texto: "Ver como funciona o atendimento", secao: "comoFunciona" },
    },

    rodape: {
      texto:
        "Este site tem caráter informativo e não substitui consulta ou avaliação psicológica.",
      urgencia: "Em situação de crise, procure o CVV (188) ou o SAMU (192).",
    },

    rotulos: {
      pularParaConteudo: "Pular para o conteúdo",
      menuPrincipal: "Menu principal",
      menuAbrir: "Abrir menu",
      menuFechar: "Fechar menu",
      conversarWhatsapp: "Conversar no WhatsApp",
      fotoProfissional: "[FOTO DA PROFISSIONAL]",
      fotoExemplo: "foto de exemplo",
      passo: "Passo",
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
      src: "/images/ambiente-folhas-luz.jpg",
      alt: "Folhas verdes iluminadas pela luz da manhã",
      exemplo: true,
    },
  },
};

export default siteConfig;
