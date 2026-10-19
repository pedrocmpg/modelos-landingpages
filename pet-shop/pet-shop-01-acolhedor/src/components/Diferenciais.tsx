import { useConfig } from "../context/configContext.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Diferenciais.css";

// Lista editorial: número grande, título e texto em linhas separadas por filetes.
export function Diferenciais() {
  const { conteudo } = useConfig();
  const dados = conteudo.diferenciais;

  return (
    <section id="diferenciais" className="secao diferenciais" tabIndex={-1} aria-labelledby="titulo-diferenciais">
      <div className="container diferenciais__layout">
        <div className="diferenciais__titulo">
          <TituloSecao id="titulo-diferenciais" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />
        </div>

        <ul className="diferenciais__lista">
          {dados.itens.map((item, i) => (
            <Reveal key={item.titulo} as="li" tipo="slideRight" distancia={36} atraso={Math.min(i, 3) * 0.06}>
              <article className="diferencial">
                <span className="diferencial__numero" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="diferencial__corpo">
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </div>
                {item.icone && (
                  <span className="diferencial__icone">
                    <Icone id={item.icone} tamanho={30} />
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
