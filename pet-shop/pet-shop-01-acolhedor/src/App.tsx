import type { ComponentType } from "react";
import type { SecaoId, SiteConfig } from "./config/types.ts";
import { BarraProgresso } from "./components/BarraProgresso.tsx";
import { BarraWhatsapp, BotaoWhatsappFlutuante } from "./components/BotoesWhatsapp.tsx";
import { ComoFunciona } from "./components/ComoFunciona.tsx";
import { Contato } from "./components/Contato.tsx";
import { CtaFinal } from "./components/CtaFinal.tsx";
import { Depoimentos } from "./components/Depoimentos.tsx";
import { Diferenciais } from "./components/Diferenciais.tsx";
import { Faq } from "./components/Faq.tsx";
import { Galeria } from "./components/Galeria.tsx";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { Rodape } from "./components/Rodape.tsx";
import { Servicos } from "./components/Servicos.tsx";
import { Sobre } from "./components/Sobre.tsx";
import { ConfigContext, useConfig } from "./context/configContext.ts";
import { useDocumentHead } from "./hooks/useDocumentHead.ts";
import { useLenis } from "./hooks/useLenis.ts";

const SECOES: Record<SecaoId, ComponentType> = {
  hero: Hero,
  sobre: Sobre,
  diferenciais: Diferenciais,
  servicos: Servicos,
  comoFunciona: ComoFunciona,
  galeria: Galeria,
  depoimentos: Depoimentos,
  faq: Faq,
  ctaFinal: CtaFinal,
  contato: Contato,
};

function Pagina() {
  const { secoes, conteudo } = useConfig();
  useLenis();

  return (
    <>
      <a href="#conteudo" className="pular-conteudo">
        {conteudo.rotulos.pularParaConteudo}
      </a>
      <BarraProgresso />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        {secoes
          .filter((s) => s.ativo)
          .map((s) => {
            const Secao = SECOES[s.id];
            return <Secao key={s.id} />;
          })}
      </main>
      <Rodape />
      <BotaoWhatsappFlutuante />
      <BarraWhatsapp />
    </>
  );
}

/** O site inteiro é função do config: nada é lido de outro lugar. */
function App({ config }: { config: SiteConfig }) {
  useDocumentHead(config);
  return (
    <ConfigContext value={config}>
      <Pagina />
    </ConfigContext>
  );
}

export default App;
