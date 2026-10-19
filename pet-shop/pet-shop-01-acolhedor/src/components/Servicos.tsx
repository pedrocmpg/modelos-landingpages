import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Servico } from "../config/types.ts";
import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { useMovimento } from "../motion/tokens.ts";
import { Icone } from "./Icone.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Servicos.css";

function Cartao({
  servico,
  i,
  total,
  progresso,
  empilhar,
}: {
  servico: Servico;
  i: number;
  total: number;
  progresso: MotionValue<number>;
  empilhar: boolean;
}) {
  // Quando o próximo cartão sobe por cima, este encolhe um pouco e escurece.
  const inicio = total > 1 ? i / total : 0;
  const fim = total > 1 ? Math.min(1, (i + 1) / total) : 1;
  const escala = useTransform(progresso, [inicio, fim], [1, 0.94]);
  const veu = useTransform(progresso, [inicio, fim], [0, 0.28]);
  const ultimo = i === total - 1;

  return (
    <li className="servico-pilha" style={{ "--i": i } as React.CSSProperties}>
      <motion.article
        className={`servico servico--${i % 4}`}
        style={empilhar && !ultimo ? { scale: escala } : undefined}
      >
        <div className="servico__texto">
          <p className="servico__indice" aria-hidden="true">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3>{servico.titulo}</h3>
          <p className="servico__descricao">{servico.texto}</p>
          {preenchido(servico.preco) && <p className="servico__preco">{servico.preco}</p>}
        </div>

        <div className="servico__visual">
          {servico.imagem ? (
            <img
              className="servico__imagem"
              src={servico.imagem.src}
              alt={servico.imagem.alt}
              loading="lazy"
              decoding="async"
            />
          ) : (
            servico.icone && (
              <span className="servico__icone-grande">
                <Icone id={servico.icone} tamanho={120} />
              </span>
            )
          )}
          {servico.icone && servico.imagem && (
            <span className="servico__icone-chip">
              <Icone id={servico.icone} tamanho={30} />
            </span>
          )}
        </div>

        {empilhar && !ultimo && <motion.span aria-hidden="true" className="servico__veu" style={{ opacity: veu }} />}
      </motion.article>
    </li>
  );
}

// Serviços como cartões grandes que se empilham enquanto a página rola.
export function Servicos() {
  const { conteudo } = useConfig();
  const dados = conteudo.servicos;
  const m = useMovimento();
  const listaRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: listaRef, offset: ["start start", "end end"] });
  const empilhar = m.observador && !m.reduzido;

  return (
    <section id="servicos" className="secao servicos" tabIndex={-1} aria-labelledby="titulo-servicos">
      <div className="container">
        <TituloSecao
          id="titulo-servicos"
          eyebrow={dados.eyebrow}
          titulo={dados.titulo}
          introducao={dados.introducao}
        />

        <ul ref={listaRef} className={`servicos__pilha${empilhar ? " servicos__pilha--sticky" : ""}`}>
          {dados.itens.map((servico, i) => (
            <Cartao
              key={servico.titulo}
              servico={servico}
              i={i}
              total={dados.itens.length}
              progresso={scrollYProgress}
              empilhar={empilhar}
            />
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
