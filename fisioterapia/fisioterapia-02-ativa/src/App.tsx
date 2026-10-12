import type { ComponentType } from "react";
import type { SecaoId, SiteConfig } from "./config/types.ts";
import { Areas } from "./components/Areas.tsx";
import { ComoFunciona } from "./components/ComoFunciona.tsx";
import { Contato } from "./components/Contato.tsx";
import { Faq } from "./components/Faq.tsx";
import { Estrutura } from "./components/Estrutura.tsx";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { Rodape } from "./components/Rodape.tsx";
import { Sobre } from "./components/Sobre.tsx";
import { ConfigContext, useConfig } from "./context/configContext.ts";
import { useDocumentHead } from "./hooks/useDocumentHead.ts";
import { useLenis } from "./hooks/useLenis.ts";

const SECOES: Record<SecaoId, ComponentType> = {
  hero: Hero,
  sobre: Sobre,
  areas: Areas,
  comoFunciona: ComoFunciona,
  estrutura: Estrutura,
  faq: Faq,
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
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <div className="corpo">
          {secoes
            .filter((s) => s.ativo)
            .map((s) => {
              const Secao = SECOES[s.id];
              return <Secao key={s.id} />;
            })}
        </div>
      </main>
      <Rodape />
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
