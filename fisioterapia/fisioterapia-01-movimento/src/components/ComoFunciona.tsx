import { useRef } from "react";
import { useConfig } from "../context/configContext.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { useMovimento, escalonar } from "../motion/tokens.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./ComoFunciona.css";

export function ComoFunciona() {
  const { conteudo } = useConfig();
  const dados = conteudo.comoFunciona;
  const { rotulos } = conteudo;
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.3);
  const ativo = !m.observador || emVista;

  return (
    <section id="comoFunciona" className="secao secao--escura" tabIndex={-1} aria-labelledby="titulo-comoFunciona">
      <div className="container">
        <TituloSecao
          id="titulo-comoFunciona"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
          escuro
        />

        <div ref={ref} className={`passos${ativo ? " passos--ativo" : ""}`}>
          <span className="passos__linha" aria-hidden="true" />
          <ol className="passos__lista">
          {dados.itens.map((passo, i) => (
            <Reveal key={passo.titulo} as="li" atraso={escalonar(i, 0.15)} className="passo">
              <span className="passo__marca">{passo.icone ? <Icone id={passo.icone} tamanho={28} /> : i + 1}</span>
              <p className="passo__numero">
                {rotulos.passo} {i + 1}
              </p>
              <h3>{passo.titulo}</h3>
              <p className="passo__texto">{passo.texto}</p>
            </Reveal>
          ))}
          </ol>
        </div>

        {dados.observacao && <p className="passos__observacao">{dados.observacao}</p>}
      </div>
    </section>
  );
}
