import { useConfig } from "../context/configContext.ts";
import { escalonar } from "../motion/tokens.ts";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./ComoFunciona.css";

export function ComoFunciona() {
  const { conteudo } = useConfig();
  const dados = conteudo.comoFunciona;
  const { rotulos } = conteudo;

  return (
    <section id="comoFunciona" className="secao secao--suave" tabIndex={-1} aria-labelledby="titulo-comoFunciona">
      <div className="container">
        <TituloSecao
          id="titulo-comoFunciona"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
        />

        <ol className="passos">
          {dados.itens.map((passo, i) => (
            <Reveal key={passo.titulo} as="li" atraso={escalonar(i, 0.15)} className="passo">
              <span className="passo__numero-grande" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="passo__rotulo">
                {rotulos.passo} {i + 1}
              </p>
              <h3>{passo.titulo}</h3>
              <p className="passo__texto">{passo.texto}</p>
            </Reveal>
          ))}
        </ol>

        {dados.observacao && <p className="passos__observacao">{dados.observacao}</p>}
      </div>
    </section>
  );
}
