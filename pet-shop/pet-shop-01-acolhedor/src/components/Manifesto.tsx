import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Manifesto as DadosManifesto } from "../config/types.ts";
import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { useMovimento } from "../motion/tokens.ts";
import "./Manifesto.css";

const normalizar = (p: string) =>
  p
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}]/gu, "");

function Palavra({
  texto,
  destaque,
  progresso,
  de,
  ate,
}: {
  texto: string;
  destaque: boolean;
  progresso: MotionValue<number>;
  de: number;
  ate: number;
}) {
  const opacity = useTransform(progresso, [de, ate], [0.14, 1]);
  const y = useTransform(progresso, [de, ate], [18, 0]);
  return (
    <motion.span className={`manifesto__palavra${destaque ? " manifesto__palavra--destaque" : ""}`} style={{ opacity, y }}>
      {texto}
    </motion.span>
  );
}

// Frase em tela cheia que acende palavra por palavra enquanto a página rola (palco sticky).
// Sem movimento (ou sem IntersectionObserver): frase inteira, sem palco.
export function Manifesto() {
  const dados = useConfig().conteudo.manifesto;
  return dados ? <ManifestoSecao dados={dados} /> : null;
}

function ManifestoSecao({ dados }: { dados: DadosManifesto }) {
  const m = useMovimento();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const palavras = dados.frase.split(/\s+/).filter(Boolean);
  const destaques = new Set((dados.destaque ?? []).map(normalizar));
  const animado = m.observador && !m.reduzido;

  return (
    <section
      id="manifesto"
      ref={ref}
      className={`manifesto secao--escura${animado ? " manifesto--palco" : ""}`}
      tabIndex={-1}
      aria-labelledby="titulo-manifesto"
    >
      <div className="manifesto__palco">
        <div className="container manifesto__corpo">
          {preenchido(dados.eyebrow) && <p className="eyebrow manifesto__eyebrow">{dados.eyebrow}</p>}

          <h2 id="titulo-manifesto" className="so-leitor-de-tela">
            {dados.frase}
          </h2>

          <p className="manifesto__frase" aria-hidden="true">
            {palavras.map((p, i) => {
              const destaque = destaques.has(normalizar(p));
              return animado ? (
                <Fragment key={i}>
                  <span className="manifesto__mascara">
                  <Palavra
                    texto={p}
                    destaque={destaque}
                    progresso={scrollYProgress}
                    de={0.05 + (i / palavras.length) * 0.7}
                    ate={0.05 + ((i + 1.6) / palavras.length) * 0.7}
                  />
                  </span>
                  {" "}
                </Fragment>
              ) : (
                <Fragment key={i}>
                  <span className={`manifesto__palavra${destaque ? " manifesto__palavra--destaque" : ""}`}>{p}</span>{" "}
                </Fragment>
              );
            })}
          </p>

          {preenchido(dados.assinatura) && <p className="manifesto__assinatura">{dados.assinatura}</p>}
        </div>
      </div>
    </section>
  );
}
