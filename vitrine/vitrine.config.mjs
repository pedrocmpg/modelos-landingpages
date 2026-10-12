// Única coisa que se edita na vitrine: quem apresenta os modelos e como o cliente chama.
// Depois de mudar, rode (na pasta ferramentas/):  npm run vitrine
//
// Os cartões saem sozinhos dos modelos (nome do estilo, nicho, descrição e link vêm do
// config de cada um) e das capturas geradas por `npm run og`.

export default {
  dono: {
    // PREENCHER: seu nome e seu WhatsApp (só dígitos, com 55 + DDD). Estes valores são fictícios.
    nome: "Seu Nome Exemplo",
    whatsapp: "5500900000000",
    // Mensagem pré-pronta do botão de WhatsApp (o cartão acrescenta o nome do modelo).
    mensagem: "Olá! Vi os modelos de site e quero conversar sobre um para o meu negócio.",
  },

  pagina: {
    titulo: "Modelos de site para pequenos negócios",
    descricao:
      "Exemplos de landing pages para pet shop, psicologia e fisioterapia. Veja as demonstrações e chame no WhatsApp.",
    // URL pública da vitrine (com barra final), usada em og:url e og:image. Preencha ao publicar.
    url: "https://vitrine.exemplo.com.br/",
    // true = <meta robots noindex, nofollow>. Mude para false se quiser a vitrine nos buscadores.
    noindex: true,
  },
};
