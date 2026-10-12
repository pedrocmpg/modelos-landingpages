import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { escalonar } from "../motion/tokens.ts";
import { Foto } from "./Foto.tsx";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Atendimento.css";

export function Atendimento() {
  const { conteudo } = useConfig();
  const dados = conteudo.atendimento;

  return (
    <section id="atendimento" className="secao secao--suave" tabIndex={-1} aria-labelledby="titulo-atendimento">
      <div className="container">
        <TituloSecao
          id="titulo-atendimento"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
        />

        <ul className="modalidades">
          {dados.itens.map((item, i) => (
            <li key={item.titulo} className="modalidade">
              {item.imagem && <Foto imagem={item.imagem} proporcao="4 / 5" atraso={escalonar(i, 0.12)} />}
              <Reveal className="modalidade__texto" atraso={0.1 + escalonar(i, 0.12)}>
                <div className="modalidade__titulo">
                  {item.icone && (
                    <span className="modalidade__icone">
                      <Icone id={item.icone} />
                    </span>
                  )}
                  <h3>{item.titulo}</h3>
                </div>
                <p>{item.texto}</p>
                {item.detalhes && item.detalhes.length > 0 && (
                  <ul className="modalidade__detalhes">
                    {item.detalhes.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ul>

        {preenchido(dados.observacao) && <p className="modalidades__observacao">{dados.observacao}</p>}
      </div>
    </section>
  );
}
