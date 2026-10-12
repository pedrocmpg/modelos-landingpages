import { useConfig } from "../context/configContext.ts";
import { FotoProfissional } from "./FotoProfissional.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Sobre.css";

export function Sobre() {
  const { conteudo } = useConfig();
  const dados = conteudo.sobre;

  return (
    <section id="sobre" className="secao" tabIndex={-1} aria-labelledby="titulo-sobre">
      <div className="container sobre__grade">
        <div className="sobre__texto">
          <TituloSecao id="titulo-sobre" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />
          <div className="sobre__paragrafos">
            {dados.paragrafos.map((p, i) => (
              <Reveal key={p} atraso={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="sobre__abordagem">
              <h3>{dados.abordagem.titulo}</h3>
              <p>{dados.abordagem.texto}</p>
            </div>
          </Reveal>
        </div>

        <div className="sobre__lateral">
          <FotoProfissional />
          <Reveal atraso={0.12}>
            <div className="cartao sobre__formacao">
              <h3>{dados.formacao.titulo}</h3>
              <ol className="sobre__lista">
                {dados.formacao.itens.map((item, i) => (
                  <li key={item}>
                    <span className="sobre__indice" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
