// ÚNICO arquivo que se edita para criar o site de um cliente.
// Todos os dados abaixo são FICTÍCIOS (modelo de demonstração).
// Veja a tabela de campos no README.md.

import type { SiteConfig } from "./types.ts";

export const siteConfig: SiteConfig = {
  meta: {
    title: "Pet Shop Exemplo — Banho e Tosa em Cidade Exemplo",
    description:
      "Banho e tosa com carinho no Centro de Cidade Exemplo. Atendimento sem pressa e agendamento pelo WhatsApp.",
    lang: "pt-BR",
    // true = site de demonstração, bloqueado para buscadores.
    // Mude para false ao entregar o site ao cliente.
    noindex: true,
    // Cartão de compartilhamento (WhatsApp, Instagram, LinkedIn, X). Gerado no build.
    url: "https://modelo-pet-shop-01-acolhedor.vercel.app/",
    ogTitle: "Modelo de site para pet shop — exemplo",
    ogDescription:
      "Exemplo de landing page para pet shop (estilo Acolhedor), com dados fictícios. É um modelo de demonstração, não um site real.",
    ogImage: "/og-image.png",
    ogImageAlt: "Início do modelo de site para pet shop (estilo Acolhedor), com o título do cartão: Modelo de site para pet shop — exemplo",
  },

  negocio: {
    nome: "Pet Shop Exemplo",
    slogan: "Banho e tosa com carinho",
    cidade: "Cidade Exemplo",
    estado: "EX",
  },

  contato: {
    whatsapp: "5500900000000",
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de agendar um banho e tosa.",
    telefoneExibicao: "(00) 90000-0000",
    email: "contato@exemplo.com",
    endereco: "Rua Exemplo, 123 - Centro",
    // Mapa genérico (centro do país). Troque pelo embed do endereço real.
    mapaEmbedUrl:
      "https://www.google.com/maps?q=-15.7801,-47.9292&z=14&output=embed",
    horarios: [
      { dias: "Segunda a sexta", horas: "8h às 18h" },
      { dias: "Sábado", horas: "8h às 13h" },
      { dias: "Domingo", horas: "Fechado" },
    ],
  },

  redes: {
    instagram: "https://instagram.com/seu_perfil_aqui",
    // facebook vazio = não aparece
  },

  tema: {
    cores: {
      primaria: "#f0b03a",
      secundaria: "#2c6b66",
      destaque: "#8a5a12",
      fundo: "#fff6e5",
      superficie: "#fbe7be",
      texto: "#2b1d14",
      textoSecundario: "#5c4a3b",
      escuro: "#2b1d14",
    },
    fontes: {
      titulo: {
        familia: "Fraunces",
        pesos: [400, 500, 600, 700],
        fallback: "serif",
      },
      texto: {
        familia: "DM Sans",
        pesos: [400, 500, 600, 700],
        italico: true,
        fallback: "sans-serif",
      },
      destaque: {
        familia: "Caveat",
        pesos: [500, 700],
        fallback: "cursive",
      },
    },
    raio: { cartao: 28, botao: 999 },
    intensidadeAnimacao: "normal",
  },

  secoes: [
    { id: "hero", ativo: true },
    { id: "diferenciais", ativo: true, menu: "Diferenciais" },
    { id: "servicos", ativo: true, menu: "Serviços" },
    { id: "galeria", ativo: true, menu: "Galeria" },
    { id: "depoimentos", ativo: true, menu: "Depoimentos" },
    { id: "faq", ativo: true, menu: "Dúvidas" },
    { id: "contato", ativo: true, menu: "Contato" },
    // Seções prontas que este modelo não usa por padrão: mude para true.
    { id: "sobre", ativo: false, menu: "Sobre" },
    { id: "comoFunciona", ativo: false, menu: "Como funciona" },
    { id: "ctaFinal", ativo: false },
  ],

  conteudo: {
    hero: {
      selo: "Centro · Cidade Exemplo",
      titulo: "Banho e tosa com carinho que dá pra sentir.",
      subtitulo:
        "Cuidado de perto, ambiente tranquilo e capricho em cada detalhe para o seu pet sair cheiroso, escovado e feliz.",
      ctaPrimario: "Agendar pelo WhatsApp",
      ctaSecundario: { texto: "Ver depoimentos", secao: "depoimentos" },
      anotacao: "carinho garantido!",
    },

    sobre: {
      eyebrow: "Sobre nós",
      titulo: "Um cantinho feito para o seu pet",
      paragrafos: [
        "Somos um pet shop pequeno, de bairro, onde cada animal é atendido com calma e no ritmo dele.",
        "Conhecemos os tutores pelo nome e os pets pelo jeitinho: é assim que o cuidado fica de verdade.",
      ],
    },

    diferenciais: {
      eyebrow: "Por que confiar",
      titulo: "Por que os tutores voltam",
      itens: [
        {
          titulo: "Cuidado com cada pet",
          texto:
            "Atendimento individual, no ritmo de cada animal, sem pressa e sem estresse.",
          icone: "coracao",
        },
        {
          titulo: "Cheirinho e capricho",
          texto:
            "Produtos de qualidade e atenção aos detalhes do início ao fim do banho e da tosa.",
          icone: "brilho",
        },
        {
          titulo: "Atendimento de confiança",
          texto:
            "Transparência em cada etapa: você sabe o que será feito e acompanha tudo pelo WhatsApp.",
          icone: "escudo",
        },
      ],
    },

    servicos: {
      eyebrow: "O que fazemos",
      titulo: "Serviços",
      itens: [
        {
          titulo: "Banho",
          texto:
            "Banho completo com produtos de qualidade, secagem e escovação para deixar o pelo macio e cheiroso.",
          icone: "gota",
          preco: "a partir de R$ 50",
        },
        {
          titulo: "Tosa",
          texto:
            "Tosa higiênica ou na tesoura, no estilo que combina com a raça e o jeito do seu pet.",
          icone: "tesoura",
          preco: "a partir de R$ 70",
        },
        {
          titulo: "Hidratação e escovação",
          texto:
            "Tratamento para pelos secos ou embaraçados, com acabamento macio e brilhante.",
          icone: "pata",
        },
      ],
      anotacao: "orçamento sem compromisso",
      observacao:
        "Os valores variam conforme o porte e a pelagem. Chame no WhatsApp para um orçamento.",
    },

    comoFunciona: {
      eyebrow: "Passo a passo",
      titulo: "Como funciona",
      itens: [
        {
          titulo: "Chame no WhatsApp",
          texto: "Conte o porte, a pelagem e o serviço que o seu pet precisa.",
          icone: "mensagem",
        },
        {
          titulo: "Escolha o horário",
          texto: "Combinamos o melhor dia e hora para você e para o seu pet.",
          icone: "calendario",
        },
        {
          titulo: "Busque seu pet feliz",
          texto: "Avisamos quando estiver pronto: cheiroso, escovado e sorrindo.",
          icone: "coracao",
        },
      ],
    },

    galeria: {
      eyebrow: "Nossa clientela",
      titulo: "Clientes de quatro patas",
      anotacao: "arraste e veja a diferença",
    },

    depoimentos: {
      eyebrow: "Confiança de verdade",
      titulo: "O que dizem os tutores",
      nota: {
        valor: 4.9,
        total: 120,
        rotulo: "avaliações no Google",
        exemplo: true,
      },
      itens: [
        {
          texto:
            "Minha cachorrinha sempre volta cheirosa e tranquila. Dá para ver que cuidam de cada detalhe.",
          autor: "Maria Exemplo",
          detalhe: "tutora da Mel",
          exemplo: true,
        },
        {
          texto:
            "Atendimento atencioso e sem pressa. Recebi fotos do banho e o resultado ficou lindo.",
          autor: "João Exemplo",
          detalhe: "tutor do Thor",
          exemplo: true,
        },
        {
          texto:
            "Meu gato é bem nervoso e foi tratado com muita paciência. Voltarei com certeza.",
          autor: "Ana Exemplo",
          detalhe: "tutora do Nino",
          exemplo: true,
        },
      ],
    },

    faq: {
      eyebrow: "Tire suas dúvidas",
      titulo: "Perguntas frequentes",
      itens: [
        {
          pergunta: "Como faço para agendar?",
          resposta:
            "Chame no WhatsApp, conte o porte, a pelagem e o serviço desejado, e combinamos o melhor horário.",
        },
        {
          pergunta: "Quanto tempo leva o banho e tosa?",
          resposta:
            "Em média de uma a duas horas, dependendo do porte e da pelagem. Avisamos assim que seu pet estiver pronto.",
        },
        {
          pergunta: "Meu pet é agitado ou tem medo. Vocês atendem?",
          resposta:
            "Sim. Trabalhamos com calma, pausas e carinho. Conte como ele é ao agendar para prepararmos o atendimento.",
        },
        {
          pergunta: "Preciso levar a carteira de vacinação?",
          resposta:
            "Pedimos que as vacinas estejam em dia para a segurança de todos os pets. Em caso de dúvida, pergunte pelo WhatsApp.",
        },
      ],
    },

    ctaFinal: {
      titulo: "Pronto para deixar seu pet cheiroso?",
      texto: "Chame no WhatsApp e agende o melhor horário.",
      botao: "Agendar pelo WhatsApp",
    },

    contato: {
      eyebrow: "Fale com a gente",
      titulo: "Contato",
      texto:
        "Vamos cuidar do seu pet com todo carinho. Chame no WhatsApp e agende o melhor horário.",
    },

    rodape: {
      texto: "Site de demonstração com dados fictícios.",
    },

    rotulos: {
      pularParaConteudo: "Pular para o conteúdo",
      menuPrincipal: "Menu principal",
      menuAbrir: "Abrir menu",
      menuFechar: "Fechar menu",
      agendar: "Agendar",
      agendarWhatsapp: "Agendar pelo WhatsApp",
      exemplo: "exemplo",
      fotoExemplo: "foto de exemplo",
      endereco: "Endereço",
      telefone: "Telefone",
      email: "E-mail",
      horarios: "Horários",
      redes: "Redes sociais",
      antes: "Antes",
      depois: "Depois",
      deslizarAntesDepois: "Deslize para comparar o antes e o depois",
      mapa: "Mapa:",
      direitos: "Todos os direitos reservados.",
    },
  },

  imagens: {
    hero: {
      src: "/images/hero-golden.jpg",
      alt: "Golden retriever de pelagem escovada e brilhante, sorrindo",
    },
    sobre: {
      src: "/images/pet-4-lying.jpg",
      alt: "Filhote de golden retriever deitado e relaxado",
    },
    galeria: [
      {
        tipo: "antesDepois",
        antes: {
          src: "/images/antes-pet-3-beach.jpg",
          alt: "Golden retriever sentado na areia, antes do banho (imagem de exemplo)",
        },
        depois: {
          src: "/images/pet-3-beach.jpg",
          alt: "Golden retriever sentado na areia, depois do banho, com o pelo claro e macio",
        },
        legenda: "Banho e escovação",
        exemplo: true,
      },
      {
        tipo: "foto",
        imagem: {
          src: "/images/pet-1-puppy.jpg",
          alt: "Filhote de golden retriever recém-banhado, com o pelo molhado",
        },
        legenda: "Filhote recém-banhado",
        exemplo: true,
      },
      {
        tipo: "foto",
        imagem: {
          src: "/images/pet-2-tongue.jpg",
          alt: "Golden retriever sorridente sentado no gramado",
        },
        legenda: "Sorriso de quem saiu do banho",
        exemplo: true,
      },
      {
        tipo: "antesDepois",
        antes: {
          src: "/images/antes-pet-4-lying.jpg",
          alt: "Filhote de golden retriever deitado, antes da escovação (imagem de exemplo)",
        },
        depois: {
          src: "/images/pet-4-lying.jpg",
          alt: "Filhote de golden retriever deitado, depois da escovação, com o pelo macio",
        },
        legenda: "Hidratação e escovação",
        exemplo: true,
      },
    ],
  },
};

export default siteConfig;
