import { useConfig } from "../context/configContext.ts";
import { escalonar } from "../motion/tokens.ts";
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

          <Reveal tipo="fade" atraso={0.2}>
            <div className="sobre__paragrafos">
              {dados.paragrafos.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="sobre__cartoes">
            <Reveal className="cartao sobre__cartao" atraso={escalonar(0, 0.12)}>
              <h3>{dados.formacao.titulo}</h3>
              <ul className="sobre__lista">
                {dados.formacao.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="cartao sobre__cartao" atraso={escalonar(1, 0.12)}>
              <h3>{dados.abordagem.titulo}</h3>
              <p>{dados.abordagem.texto}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
