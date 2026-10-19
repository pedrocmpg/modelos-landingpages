import { useId, useState } from "react";
import { useConfig } from "../context/configContext.ts";
import { whatsappUrl } from "../config/links.ts";
import { GlifoWhatsapp } from "./Glifos.tsx";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Carteirinha.css";

// "Carteirinha do pet": o tutor monta o pedido (porte, serviço, período...) e o botão abre o
// WhatsApp com tudo escrito. Sem backend: só monta o link wa.me a partir do config.
export function Carteirinha() {
  const { conteudo, contato } = useConfig();
  const dados = conteudo.carteirinha;
  const base = useId();
  const [escolhas, setEscolhas] = useState<Record<number, string>>({});
  if (!dados) return null;

  const linhas = dados.campos.flatMap((c, i) => (escolhas[i] ? [`${c.rotulo}: ${escolhas[i]}`] : []));
  const mensagem = [contato.mensagemWhatsapp, ...linhas].join("\n");
  const href = whatsappUrl({ ...contato, mensagemWhatsapp: mensagem });

  return (
    <section id="carteirinha" className="secao carteirinha" tabIndex={-1} aria-labelledby="titulo-carteirinha">
      <div className="container carteirinha__layout">
        <div className="carteirinha__texto">
          <TituloSecao id="titulo-carteirinha" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />
        </div>

        <Reveal tipo="rise" rotacao={2} atraso={0.1}>
          <div className="carteirinha__cartao">
            <span className="carteirinha__furo" aria-hidden="true" />
            <p className="carteirinha__cabecalho">
              <Icone id="pata" tamanho={20} />
              {dados.cabecalho}
            </p>

            <div className="carteirinha__corpo">
              {dados.campos.map((campo, i) => (
                <fieldset key={campo.rotulo} className="carteirinha__campo">
                  <legend>{campo.rotulo}</legend>
                  <div className="carteirinha__opcoes">
                    {campo.opcoes.map((opcao) => {
                      const id = `${base}-${i}-${opcao}`;
                      return (
                        <div key={opcao} className="carteirinha__opcao">
                          <input
                            id={id}
                            type="radio"
                            name={`${base}-${i}`}
                            checked={escolhas[i] === opcao}
                            onChange={() => setEscolhas((atual) => ({ ...atual, [i]: opcao }))}
                          />
                          <label htmlFor={id}>{opcao}</label>
                        </div>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="carteirinha__resumo">
              <p className="carteirinha__resumo-rotulo">{dados.resumoRotulo}</p>
              <p className="carteirinha__resumo-texto" aria-live="polite">
                {linhas.length ? linhas.join(" · ") : dados.resumoVazio}
              </p>
            </div>

            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn--escuro btn--brilho carteirinha__botao">
              <GlifoWhatsapp />
              {dados.botao}
            </a>

            <span className="carteirinha__barras" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
