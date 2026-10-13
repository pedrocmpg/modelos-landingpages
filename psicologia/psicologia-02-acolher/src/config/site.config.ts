import type { SiteConfig } from "./types.ts";

// ÚNICO arquivo que se edita para criar o site de um cliente.
// Todos os dados abaixo são FICTÍCIOS (modelo de demonstração).
//
// Regras do Conselho Federal de Psicologia que este modelo já respeita:
//  - sem depoimentos, avaliações, preços, promoções ou promessa de resultado;
//  - CRP visível no cabeçalho e no rodapé (negocio.registroProfissional);
//  - sem fotos de pacientes ou de pessoas em sessão.
// Títulos aceitam *frase* para destacar um trecho curto em itálico (fonte de destaque).

const siteConfig: SiteConfig = {
  meta: {
    title: "Psicóloga Clara Exemplo | Atendimento psicológico presencial e online",
    description:
      "Psicoterapia para adultos, presencial e online, em um ambiente acolhedor e com sigilo. Conheça o trabalho e veja como funciona o primeiro contato.",
    lang: "pt-BR",
    noindex: true,
    // Cartão de compartilhamento (WhatsApp, Instagram, LinkedIn, X). Gerado no build.
    url: "https://modelo-psicologia-acolher.vercel.app/",
    ogTitle: "Modelo de site para psicologia — exemplo",
    ogDescription:
      "Exemplo de landing page para psicologia (estilo Acolher), com dados fictícios. É um modelo de demonstração, não um site real.",
    ogImage: "/og-image.png",
    ogImageAlt: "Início do modelo de site para psicologia (estilo Acolher), com o título do cartão: Modelo de site para psicologia — exemplo",
    siteName: "Psicóloga Clara Exemplo",
    locale: "pt_BR",
    themeColor: "#F2EBE3",
  },

  negocio: {
    nome: "Psicóloga Clara Exemplo",
    slogan: "Escuta psicológica para adultos, presencial e online",
    cidade: "Cidade Exemplo",
    estado: "EX",
    registroProfissional: { conselho: "CRP", numero: "00/00000" },
  },

  contato: {
    whatsapp: "5500900000000",
    mensagemWhatsapp:
      "Olá! Vi o seu site e gostaria de conversar sobre o atendimento psicológico.",
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
      primaria: "#3E4B3A",
      secundaria: "#4D5F47",
      destaque: "#A0522D",
      fundo: "#F2EBE3",
      superficie: "#FBF8F4",
      suave: "#DCE2D3",
      texto: "#2A2421",
      textoSecundario: "#675C55",
      escuro: "#2F3A2C",
    },
    fontes: {
      titulo: { familia: "Gloock", pesos: [400], fallback: "serif" },
      texto: { familia: "Onest", pesos: [400, 500, 600, 700], fallback: "sans-serif" },
      destaque: { familia: "Newsreader", pesos: [400, 500], italico: true, fallback: "serif" },
    },
    raio: { cartao: 20, botao: 999 },
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
      selo: "Psicoterapia presencial e online",
      titulo: "Um lugar para *chegar* do jeito que você está",
      subtitulo:
        "Atendo adultos em sessões individuais, no consultório ou por vídeo. O primeiro passo pode ser uma mensagem curta pelo WhatsApp.",
      ctaPrimario: "Conversar no WhatsApp",
      ctaSecundario: { texto: "Ver como funciona o atendimento", secao: "comoFunciona" },
      citacao: "Falar já é um jeito de começar.",
    },

    sobre: {
      eyebrow: "Sobre",
      titulo: "Prazer, *Clara*",
      paragrafos: [
        "Sou psicóloga e trabalho com adultos em clínica. Acredito numa escuta sem pressa, em que cada pessoa decide o que quer trazer e em que ritmo.",
        "O consultório é um espaço reservado e protegido por sigilo profissional. Aqui não há certo ou errado para sentir.",
      ],
      formacao: {
        titulo: "Formação",
        itens: [
          "Graduação em Psicologia, Universidade Exemplo",
          "Especialização em Psicologia Clínica, Instituto Exemplo",
          "Estudos continuados em psicoterapia, Centro de Estudos Exemplo",
        ],
      },
      abordagem: {
        titulo: "Abordagem",
        texto:
          "Psicoterapia de base humanista, em sessões individuais de 50 minutos. Começamos pela sua história e vamos definindo juntos, ao longo do caminho, o que faz sentido conversar.",
      },
    },

    ajuda: {
      eyebrow: "Como posso ajudar",
      titulo: "Temas que *chegam* ao consultório",
      introducao:
        "Uma lista de exemplos, não uma lista fechada. Se o seu assunto não está aqui, ele também pode ser conversado.",
      itens: [
        { titulo: "Ansiedade e preocupação", texto: "Quando a mente acelera e o corpo acompanha." },
        { titulo: "Cansaço e trabalho", texto: "Sobrecarga, cobrança e a dificuldade de desligar." },
        { titulo: "Relacionamentos", texto: "Vínculos com família, amigos, parceiros e consigo mesmo." },
        { titulo: "Luto e perdas", texto: "Falar de quem partiu ou do que mudou, sem pressa." },
        { titulo: "Mudanças e decisões", texto: "Fases novas, escolhas difíceis e recomeços." },
        { titulo: "Autoconhecimento", texto: "Olhar com calma para seus caminhos, limites e desejos." },
      ],
      aviso:
        "Esta lista não é um diagnóstico nem substitui uma avaliação feita em atendimento psicológico.",
    },

    comoFunciona: {
      eyebrow: "Primeiro contato",
      titulo: "Como funciona o *primeiro contato*",
      introducao: "Três passos, no seu ritmo e sem compromisso de continuar.",
      itens: [
        {
          titulo: "Você me escreve",
          texto:
            "Mande uma mensagem pelo WhatsApp dizendo, em poucas palavras, o que o traz até aqui e se prefere o consultório ou o atendimento online.",
          icone: "mensagem",
        },
        {
          titulo: "Escolhemos um horário",
          texto:
            "Eu respondo nos horários de atendimento e combinamos o melhor dia. Se tiver dúvidas sobre valores, explico por mensagem: são informados sob consulta.",
          icone: "calendario",
        },
        {
          titulo: "Nos conhecemos",
          texto:
            "Na primeira sessão você conta o que quiser e conversamos sobre como o acompanhamento pode acontecer.",
          icone: "folha",
        },
      ],
      observacao: "O site não tem agendamento online: a conversa começa pelo WhatsApp.",
    },

    atendimento: {
      eyebrow: "Onde e como",
      titulo: "Atendimento *presencial* e online",
      introducao:
        "Duas formas de estar na sessão, com o mesmo cuidado e o mesmo sigilo. Você escolhe a que cabe na sua rotina.",
      itens: [
        {
          titulo: "Presencial",
          texto: "No consultório, em uma sala reservada, tranquila e com luz natural.",
          icone: "casa",
          imagem: {
            src: "/images/ambiente-sombra-janela.jpg",
            alt: "Sombra de uma janela e de folhas de planta em uma parede iluminada pelo fim de tarde",
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
      titulo: "O que *costumam perguntar*",
      itens: [
        {
          pergunta: "Qual é o valor da sessão?",
          resposta:
            "Os valores são informados diretamente, sob consulta, depois de uma conversa inicial pelo WhatsApp.",
        },
        {
          pergunta: "Preciso de diagnóstico ou de encaminhamento?",
          resposta:
            "Não. Você pode procurar atendimento para conversar sobre o que está vivendo, sem diagnóstico prévio.",
        },
        {
          pergunta: "Quanto dura a sessão e com que frequência acontece?",
          resposta:
            "A sessão dura 50 minutos. A frequência é combinada em conjunto, conforme cada caso.",
        },
        {
          pergunta: "Por quanto tempo é o acompanhamento?",
          resposta:
            "Não há prazo definido. Isso varia de pessoa para pessoa e é conversado ao longo do processo.",
        },
        {
          pergunta: "O que eu falar fica em sigilo?",
          resposta:
            "Sim. O sigilo é um dever ético da profissão, com as exceções previstas no Código de Ética Profissional do Psicólogo.",
        },
        {
          pergunta: "Para quem é o atendimento?",
          resposta: "Para adultos, em sessões individuais.",
        },
      ],
    },

    contato: {
      eyebrow: "Contato",
      titulo: "Quer *conversar*?",
      introducao: "Escolha como prefere dar o próximo passo.",
      texto:
        "As mensagens são respondidas nos horários de atendimento. Este canal não é indicado para situações de urgência.",
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
      src: "/images/ambiente-poltrona-janela.jpg",
      alt: "Poltrona laranja ao lado de uma janela aberta com vista para árvores, dentro de um nicho em arco",
      exemplo: true,
    },
  },
};

export default siteConfig;
