import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { escalonar } from "../motion/tokens.ts";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Ajuda.css";

export function Ajuda() {
  const { conteudo } = useConfig();
  const dados = conteudo.ajuda;

  return (
    <section id="ajuda" className="secao secao--suave" tabIndex={-1} aria-labelledby="titulo-ajuda">
      <div className="container">
        <TituloSecao id="titulo-ajuda" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />

        <ul className="ajuda__grade">
          {dados.itens.map((item, i) => (
            <Reveal key={item.titulo} as="li" className="cartao ajuda__item" atraso={escalonar(i, 0.12)}>
              <span className="ajuda__numero" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.titulo}</h3>
              {preenchido(item.texto) && <p>{item.texto}</p>}
            </Reveal>
          ))}
        </ul>

        {preenchido(dados.aviso) && <p className="ajuda__aviso">{dados.aviso}</p>}
      </div>
    </section>
  );
}
