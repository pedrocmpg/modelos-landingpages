import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { ContadorAnimado } from "./ContadorAnimado.tsx";
import { Reveal, type TipoEntrada } from "./Reveal.tsx";
import { SeloExemplo } from "./SeloExemplo.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Depoimentos.css";

const ENTRADAS: TipoEntrada[] = ["slideLeft", "rise", "slideRight"];

export function Depoimentos() {
  const { conteudo } = useConfig();
  const dados = conteudo.depoimentos;
  const { nota } = dados;

  return (
    <section id="depoimentos" className="secao secao--escura" tabIndex={-1} aria-labelledby="titulo-depoimentos">
      <div className="container">
        <TituloSecao
          id="titulo-depoimentos"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
          centralizado
          escuro
        />

        {nota && (
          <Reveal tipo="pop" className="depoimentos__nota">
            <span aria-hidden="true" className="depoimentos__estrelas">
              ★★★★★
            </span>
            <p className="depoimentos__valor">
              <ContadorAnimado valor={nota.valor} decimais={1} />
            </p>
            <p className="depoimentos__rotulo">
              <ContadorAnimado valor={nota.total} /> {nota.rotulo}
              {nota.exemplo && (
                <>
                  {" "}
                  <SeloExemplo />
                </>
              )}
            </p>
          </Reveal>
        )}

        <ul className="depoimentos__grade">
          {dados.itens.map((d, i) => (
            <Reveal key={d.autor} as="li" tipo={ENTRADAS[i % ENTRADAS.length]} atraso={(i % 3) * 0.08}>
              <blockquote className="depoimento">
                <svg aria-hidden="true" width="32" height="24" viewBox="0 0 32 24" className="depoimento__aspas" focusable="false">
                  <path
                    d="M0 24V14.7C0 6.3 4.9 1 12.6 0l1 3.6C8.8 5 6.6 8 6.4 11.4h6.2V24H0Zm17.4 0V14.7C17.4 6.3 22.3 1 30 0l1 3.6c-4.8 1.4-7 4.4-7.2 7.8H30V24H17.4Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="depoimento__texto">{d.texto}</p>
                <footer className="depoimento__autor">
                  <cite>{d.autor}</cite>
                  {preenchido(d.detalhe) && <span className="depoimento__detalhe">{d.detalhe}</span>}
                  {d.exemplo && <SeloExemplo />}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
