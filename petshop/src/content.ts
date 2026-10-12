// Todo o texto e dado editável do site vive aqui.
// Troque valores neste arquivo sem precisar mexer nos componentes.

export const business = {
  name: "Golden Pet Shop",
  neighborhood: "São Roque",
  city: "Bento Gonçalves",
  state: "RS",
  address: "Rua Arlindo Franklin Barbosa, 1235 - São Roque, Bento Gonçalves - RS",
  phoneDisplay: "(54) 99167-6576",
  // Apenas dígitos, com código do país, para montar o link wa.me.
  whatsappNumber: "5554991676576",
  whatsappMessage:
    "Olá! Vim pelo site e gostaria de agendar um banho e tosa.",
  hours: [
    { days: "Segunda a sábado", time: "9h às 17h" },
    { days: "Domingo", time: "Fechado" },
  ],
  instagram: "[INSTAGRAM]",
  googleRating: 5.0,
  googleReviewCount: 105,
  // Embed público do Google Maps por busca de endereço (não exige API key).
  mapEmbedUrl:
    "https://www.google.com/maps?q=Rua+Arlindo+Franklin+Barbosa,+1235+-+S%C3%A3o+Roque,+Bento+Gon%C3%A7alves+-+RS&output=embed",
};

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Pets", href: "#pets" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

export const hero = {
  badge: "São Roque · Bento Gonçalves",
  title: "Banho e tosa com carinho que dá pra sentir.",
  subtitle:
    "Cuidado de perto, ambiente tranquilo e capricho em cada detalhe para o seu pet sair cheiroso, escovado e feliz.",
  primaryCta: "Agendar pelo WhatsApp",
  secondaryCta: "Ver avaliações",
  // Foto de exemplo (banco de imagens público, Unsplash) — trocar por uma
  // foto real do Golden Pet Shop ou de um pet cliente quando disponível.
  image: "/pets/hero-golden.jpg",
  imageAlt: "Golden retriever de pelagem escovada e brilhante, sorrindo",
};

export const whyTheyReturn = [
  {
    title: "Cuidado com cada pet",
    description:
      "Atendimento individual, no ritmo de cada animal, sem pressa e sem estresse.",
  },
  {
    title: "Cheirinho e capricho",
    description:
      "Produtos de qualidade e atenção aos detalhes do início ao fim do banho e da tosa.",
  },
  {
    title: "Atendimento de confiança",
    description:
      "Anos de experiência cuidando dos pets do bairro com carinho e transparência.",
  },
];

export const services = [
  {
    title: "Banho",
    description:
      "Banho completo com produtos de qualidade, secagem e escovação para deixar o pelo macio e cheiroso.",
  },
  {
    title: "Tosa",
    description:
      "Tosa higiênica ou na tesoura, no estilo que combina com a raça e o jeito do seu pet.",
  },
  {
    title: "[OUTRO SERVIÇO]",
    description: "[Descrição do serviço a confirmar]",
    isPlaceholder: true,
  },
];

// Fotos de exemplo (banco de imagens público, Unsplash) — trocar pelos
// pets reais do Golden Pet Shop quando as fotos estiverem disponíveis.
export const petGallery = [
  { src: "/pets/pet-1-puppy.jpg", alt: "Filhote de golden retriever recém-banhado, com o pelo molhado" },
  { src: "/pets/pet-2-tongue.jpg", alt: "Golden retriever sorridente sentado no gramado" },
  { src: "/pets/pet-3-beach.jpg", alt: "Golden retriever feliz ao ar livre, pelagem clara e macia" },
  { src: "/pets/pet-4-lying.jpg", alt: "Filhote de golden retriever deitado e relaxado" },
];

export const testimonials = [
  {
    quote:
      "[Depoimento de cliente a confirmar]",
    author: "[Nome do cliente]",
  },
  {
    quote:
      "[Depoimento de cliente a confirmar]",
    author: "[Nome do cliente]",
  },
  {
    quote:
      "[Depoimento de cliente a confirmar]",
    author: "[Nome do cliente]",
  },
];
