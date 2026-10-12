import { useConfig } from "../context/configContext.ts";
import { escalonar } from "../motion/tokens.ts";
import { Foto } from "./Foto.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Estrutura.css";

export function Estrutura() {
  const { conteudo } = useConfig();
  const dados = conteudo.estrutura;

  return (
    <section id="estrutura" className="secao" tabIndex={-1} aria-labelledby="titulo-estrutura">
      <div className="container">
        <TituloSecao
          id="titulo-estrutura"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
        />
        <ul className="ambientes">
          {dados.itens.map((item, i) => (
            <li key={item.titulo} className="ambiente">
              <Foto
                imagem={item.imagem}
                proporcao={i === 0 ? "4 / 5" : "16 / 9"}
                atraso={escalonar(i, 0.15)}
                className="ambiente__foto"
              />
              <Reveal atraso={escalonar(i, 0.15) + 0.5} className="ambiente__legenda">
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        {dados.observacao && <p className="ambientes__observacao">{dados.observacao}</p>}
      </div>
    </section>
  );
}
