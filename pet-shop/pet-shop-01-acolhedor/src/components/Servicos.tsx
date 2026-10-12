import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { escalonar } from "../motion/tokens.ts";
import { TituloSecao } from "./TituloSecao.tsx";
import { TrilhaPatas } from "./TrilhaPatas.tsx";
import "./Servicos.css";

export function Servicos() {
  const { conteudo } = useConfig();
  const dados = conteudo.servicos;

  return (
    <section id="servicos" className="secao secao--superficie" tabIndex={-1} aria-labelledby="titulo-servicos">
      <div className="container">
        <TrilhaPatas />
        <TituloSecao
          id="titulo-servicos"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
          centralizado
        />

        <ul className="servicos__grade">
          {dados.itens.map((servico, i) => (
            <Reveal key={servico.titulo} as="li" tipo="wipe" atraso={escalonar(i, 0.14)}>
              <article className="cartao cartao--hover servico">
                {servico.imagem && (
                  <img
                    className="servico__imagem"
                    src={servico.imagem.src}
                    alt={servico.imagem.alt}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="servico__corpo">
                  {servico.icone && (
                    <span className="icone-chip">
                      <Icone id={servico.icone} />
                    </span>
                  )}
                  <h3>{servico.titulo}</h3>
                  <p className="servico__texto">{servico.texto}</p>
                  {preenchido(servico.preco) && <p className="servico__preco">{servico.preco}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {(preenchido(dados.observacao) || preenchido(dados.anotacao)) && (
          <Reveal tipo="fade" atraso={0.1} className="servicos__rodape">
            {preenchido(dados.anotacao) && <p className="anotacao">{dados.anotacao}</p>}
            {preenchido(dados.observacao) && <p className="servicos__observacao">{dados.observacao}</p>}
          </Reveal>
        )}
      </div>
    </section>
  );
}
