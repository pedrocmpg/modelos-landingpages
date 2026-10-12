import { useConfig } from "../context/configContext.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { escalonar } from "../motion/tokens.ts";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Diferenciais.css";

export function Diferenciais() {
  const { conteudo } = useConfig();
  const dados = conteudo.diferenciais;

  return (
    <section id="diferenciais" className="secao" tabIndex={-1} aria-labelledby="titulo-diferenciais">
      <div className="container">
        <TituloSecao id="titulo-diferenciais" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />

        <ul className="diferenciais__grade">
          {dados.itens.map((item, i) => (
            <Reveal key={item.titulo} as="li" tipo="rise" rotacao={i % 2 === 0 ? -2 : 2} atraso={escalonar(i)}>
              <article className="cartao cartao--hover diferencial">
                <div className="diferencial__topo">
                  {item.icone ? (
                    <span className="icone-chip">
                      <Icone id={item.icone} tamanho={28} />
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="diferencial__numero" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
