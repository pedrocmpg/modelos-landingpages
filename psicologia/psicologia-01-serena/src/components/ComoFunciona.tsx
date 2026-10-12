import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { escalonar } from "../motion/tokens.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./ComoFunciona.css";

export function ComoFunciona() {
  const { conteudo } = useConfig();
  const dados = conteudo.comoFunciona;
  const { rotulos } = conteudo;

  return (
    <section id="comoFunciona" className="secao" tabIndex={-1} aria-labelledby="titulo-como-funciona">
      <div className="container">
        <TituloSecao
          id="titulo-como-funciona"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
        />

        <ol className="passos">
          {dados.itens.map((passo, i) => (
            <Reveal key={passo.titulo} as="li" className="passo" atraso={escalonar(i, 0.12)}>
              <div className="passo__topo">
                <span className="passo__numero">
                  {rotulos.passo} {i + 1}
                </span>
                {passo.icone && (
                  <span className="passo__icone">
                    <Icone id={passo.icone} />
                  </span>
                )}
              </div>
              <h3>{passo.titulo}</h3>
              <p>{passo.texto}</p>
            </Reveal>
          ))}
        </ol>

        {preenchido(dados.observacao) && <p className="passos__observacao">{dados.observacao}</p>}
      </div>
    </section>
  );
}
