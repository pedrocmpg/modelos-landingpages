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
        <div className="sobre__foto">
          <FotoProfissional />
        </div>

        <div className="sobre__texto">
          <TituloSecao id="titulo-sobre" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />
          <div className="sobre__paragrafos">
            {dados.paragrafos.map((p, i) => (
              <Reveal key={p} atraso={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="sobre__blocos">
            <Reveal>
              <div className="cartao sobre__bloco">
                <h3>{dados.formacao.titulo}</h3>
                <ul className="sobre__lista">
                  {dados.formacao.itens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal atraso={0.12}>
              <div className="cartao sobre__bloco">
                <h3>{dados.abordagem.titulo}</h3>
                <p>{dados.abordagem.texto}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
