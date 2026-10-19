// Config alternativo (outro negócio fictício) usado SÓ nos testes.
// O teste src/test/app.test.tsx renderiza o app com este arquivo e confere
// que nada do config principal ficou escrito nos componentes.

import type { SiteConfig } from "./types.ts";

export const altConfig: SiteConfig = {
  meta: {
    title: "Casa dos Bichos Teste | Estética animal em Vila Modelo",
    description: "Estética animal e spa pet na Vila Modelo. Fale com a Casa dos Bichos Teste.",
    lang: "pt-BR",
    noindex: false,
    url: "https://teste.example/",
    ogTitle: "Título alternativo do cartão (teste)",
    ogDescription: "Descrição alternativa do cartão de compartilhamento (teste).",
    ogImage: "/images/pet-1-puppy.jpg",
    ogImageAlt: "Imagem alternativa de compartilhamento",
    siteName: "Casa dos Bichos Teste",
    locale: "pt_PT",
    themeColor: "#FFF4E0",
  },

  negocio: {
    nome: "Casa dos Bichos Teste",
    slogan: "Spa pet para quem é da família",
    cidade: "Vila Modelo",
    estado: "TS",
    registroProfissional: { conselho: "CRMV-TS", numero: "0000" },
  },

  contato: {
    whatsapp: "5500911111111",
    mensagemWhatsapp: "Oi, Casa dos Bichos Teste! Quero marcar um horário.",
    telefoneExibicao: "(00) 91111-1111",
    email: "ola@teste.example",
    endereco: "Avenida Teste, 456 - Bairro Modelo",
    mapaEmbedUrl: "https://www.google.com/maps?q=-23.5505,-46.6333&z=14&output=embed",
    horarios: [
      { dias: "Terça a sábado", horas: "10h às 19h" },
      { dias: "Segunda", horas: "Folga" },
    ],
  },

  redes: {
    instagram: "https://instagram.com/perfil_de_teste",
    facebook: "https://facebook.com/perfil.de.teste",
  },

  tema: {
    cores: {
      primaria: "#ff7a45",
      secundaria: "#1d4e89",
      destaque: "#a3350d",
      fundo: "#f4f8fb",
      superficie: "#dfeaf3",
      texto: "#10202e",
      textoSecundario: "#3d4f60",
      escuro: "#10202e",
    },
    fontes: {
      titulo: { familia: "Young Serif", pesos: [400], fallback: "serif" },
      texto: { familia: "Nunito Sans", pesos: [400, 600, 700], fallback: "sans-serif" },
      destaque: { familia: "Gaegu", pesos: [400, 700], fallback: "cursive" },
    },
    raio: { cartao: 12, botao: 10 },
    intensidadeAnimacao: "suave",
  },

  secoes: [
    { id: "hero", ativo: true },
    { id: "manifesto", ativo: true },
    { id: "sobre", ativo: true, menu: "Quem somos" },
    { id: "servicos", ativo: true, menu: "Tratamentos" },
    { id: "diferenciais", ativo: true, menu: "Vantagens" },
    { id: "comoFunciona", ativo: true, menu: "Etapas" },
    { id: "galeria", ativo: true, menu: "Resultados" },
    { id: "depoimentos", ativo: true, menu: "Opiniões" },
    { id: "faq", ativo: true, menu: "FAQ" },
    { id: "carteirinha", ativo: true },
    { id: "ctaFinal", ativo: true },
    { id: "contato", ativo: true, menu: "Localização" },
  ],

  conteudo: {
    hero: {
      selo: "Vila Modelo · atendimento com hora marcada",
      titulo: "Seu bichinho merece um dia de spa.",
      subtitulo: "Estética animal feita com paciência, música suave e muito cuidado.",
      ctaPrimario: "Quero marcar um horário",
      ctaSecundario: { texto: "Ver resultados", secao: "galeria" },
      anotacao: "com muito amor!",
    },

    faixa: ["Spa teste", "Tosa teste", "Mimo teste"],

    manifesto: {
      eyebrow: "Filosofia de teste",
      frase: "Frase de teste do manifesto alternativo para o bichinho de teste.",
      destaque: ["teste"],
      assinatura: "Assinatura de teste do manifesto",
    },

    carteirinha: {
      eyebrow: "Pedido rápido de teste",
      titulo: "Carteirinha alternativa de teste",
      introducao: "Introdução alternativa da carteirinha de teste.",
      cabecalho: "Cartão alternativo",
      campos: [
        { rotulo: "Tamanho de teste", opcoes: ["Mini teste", "Gigante teste"] },
        { rotulo: "Tratamento de teste", opcoes: ["Opção A teste", "Opção B teste", "Opção C teste"] },
      ],
      resumoRotulo: "Resumo de teste",
      resumoVazio: "Nada escolhido ainda (teste).",
      botao: "Mandar pedido de teste",
    },

    sobre: {
      eyebrow: "Quem somos",
      titulo: "Estética animal de verdade",
      paragrafos: [
        "Texto sobre a Casa dos Bichos Teste, primeiro parágrafo de teste.",
        "Segundo parágrafo de teste do bloco de apresentação.",
      ],
    },

    diferenciais: {
      eyebrow: "Vantagens",
      titulo: "Tudo pensado para o conforto do seu pet",
      itens: [
        { titulo: "Sala silenciosa", texto: "Ambiente calmo para pets sensíveis.", icone: "estrela" },
        { titulo: "Produtos hipoalergênicos", texto: "Fórmulas suaves para peles delicadas.", icone: "escudo" },
        { titulo: "Fotos do resultado", texto: "Você recebe fotos antes de buscar.", icone: "mensagem" },
      ],
    },

    servicos: {
      eyebrow: "Tratamentos",
      titulo: "Nossos tratamentos",
      itens: [
        {
          titulo: "Spa completo",
          texto: "Banho, massagem e secagem com calma.",
          icone: "gota",
          preco: "R$ 123 (teste)",
        },
        { titulo: "Tosa artística", texto: "Cortes criativos para pets estilosos.", icone: "tesoura" },
        {
          titulo: "Escovação dental",
          texto: "Cuidado com o hálito e a saúde da boca.",
          imagem: { src: "/images/pet-2-tongue.jpg", alt: "Cachorro de língua de fora (imagem de teste)" },
        },
      ],
      anotacao: "valores de teste",
      observacao: "Observação de preço do config alternativo.",
    },

    comoFunciona: {
      eyebrow: "Etapas",
      titulo: "Como marcar o seu horário",
      itens: [
        { titulo: "Mande uma mensagem", texto: "Fale pelo WhatsApp de teste.", icone: "mensagem" },
        { titulo: "Confirme a data", texto: "Reservamos o melhor horário.", icone: "calendario" },
        { titulo: "Relaxe", texto: "Cuidamos do resto.", icone: "relogio" },
      ],
    },

    galeria: {
      eyebrow: "Resultados",
      titulo: "Veja a transformação",
      anotacao: "deslize e compare",
    },

    depoimentos: {
      eyebrow: "Opiniões",
      titulo: "Quem já passou por aqui",
      nota: { valor: 4.7, total: 88, rotulo: "opiniões no Maps", exemplo: false },
      itens: [
        { texto: "Depoimento de teste número um.", autor: "Cliente Teste Um", detalhe: "tutor do Bidu" },
        { texto: "Depoimento de teste número dois.", autor: "Cliente Teste Dois", exemplo: true },
        { texto: "Depoimento de teste número três.", autor: "Cliente Teste Três" },
      ],
    },

    faq: {
      eyebrow: "Dúvidas",
      titulo: "Perguntas do config alternativo",
      itens: [
        { pergunta: "Pergunta de teste um?", resposta: "Resposta de teste um." },
        { pergunta: "Pergunta de teste dois?", resposta: "Resposta de teste dois." },
      ],
    },

    ctaFinal: {
      titulo: "Chamada final do config alternativo",
      texto: "Texto da chamada final de teste.",
      botao: "Marcar agora (teste)",
    },

    contato: {
      eyebrow: "Localização",
      titulo: "Venha nos visitar",
      texto: "Texto de contato do config alternativo.",
    },

    rodape: { texto: "Rodapé do config alternativo." },

    rotulos: {
      pularParaConteudo: "Ir direto ao conteúdo",
      menuPrincipal: "Navegação principal",
      menuAbrir: "Abrir navegação",
      menuFechar: "Fechar navegação",
      agendar: "Marcar",
      agendarWhatsapp: "Marcar pelo WhatsApp",
      exemplo: "amostra",
      fotoExemplo: "foto de amostra",
      endereco: "Onde fica",
      telefone: "Ligue",
      email: "Escreva",
      horarios: "Funcionamento",
      redes: "Nas redes",
      antes: "Antes",
      depois: "Depois",
      deslizarAntesDepois: "Deslize para comparar",
      mapa: "Mapa de",
      direitos: "Direitos reservados.",
    },
  },

  imagens: {
    hero: { src: "/images/pet-1-puppy.jpg", alt: "Filhote molhado (imagem de teste)" },
    sobre: { src: "/images/pet-2-tongue.jpg", alt: "Cachorro sorridente (imagem de teste)" },
    galeria: [
      { tipo: "foto", imagem: { src: "/images/pet-3-beach.jpg", alt: "Foto de galeria de teste" }, legenda: "Legenda de teste" },
      {
        tipo: "antesDepois",
        antes: { src: "/images/antes-pet-4-lying.jpg", alt: "Antes de teste" },
        depois: { src: "/images/pet-4-lying.jpg", alt: "Depois de teste" },
        legenda: "Antes e depois de teste",
        exemplo: true,
      },
    ],
  },
};

export default altConfig;
