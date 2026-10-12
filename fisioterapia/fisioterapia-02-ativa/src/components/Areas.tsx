import { useRef } from "react";
import { useConfig } from "../context/configContext.ts";
import type { Area } from "../config/types.ts";
import { useInclinacao } from "../hooks/useInclinacao.ts";
import { escalonar, useMovimento } from "../motion/tokens.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Areas.css";

const numero = (i: number) => String(i + 1).padStart(2, "0");

function CartaoArea({ area, indice }: { area: Area; indice: number }) {
  const m = useMovimento();
  const ref = useRef<HTMLElement>(null);
  useInclinacao(ref, !m.reduzido);

  return (
    <Reveal as="li" atraso={escalonar(indice, 0.1)} className="area">
      <article ref={ref} className="area__cartao">
        <div className="area__topo">
          <span className="area__numero" aria-hidden="true">
            {numero(indice)}
          </span>
          {area.icone && (
            <span className="area__icone">
              <Icone id={area.icone} tamanho={26} />
            </span>
          )}
        </div>
        <h3>{area.titulo}</h3>
        <p>{area.texto}</p>
      </article>
    </Reveal>
  );
}

export function Areas() {
  const { conteudo } = useConfig();
  const dados = conteudo.areas;

  return (
    <section id="areas" className="secao secao--escura" tabIndex={-1} aria-labelledby="titulo-areas">
      <div className="container">
        <TituloSecao
          id="titulo-areas"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
          escuro
        />
        <ul className="areas__grade">
          {dados.itens.map((area, i) => (
            <CartaoArea key={area.titulo} area={area} indice={i} />
          ))}
        </ul>
        {dados.observacao && (
          <Reveal tipo="fade">
            <p className="areas__observacao">{dados.observacao}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
