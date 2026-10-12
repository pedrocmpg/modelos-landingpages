import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { TemaAjuda } from "../config/types.ts";
import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { useMovimento } from "../motion/tokens.ts";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Ajuda.css";

// Cada tema ganha opacidade total quando passa pelo centro da tela, ligado à
// rolagem: o progresso vai de 0 (entrando por baixo) a 1 (saindo por cima) e
// vale 0.5 quando o centro do item está no centro da tela. Só opacity.
// Com movimento reduzido, todos ficam com opacidade total.
function Tema({ item, indice }: { item: TemaAjuda; indice: number }) {
  const m = useMovimento();
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacidade = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.22, 0.45, 1, 0.45, 0.22]);

  return (
    <motion.li ref={ref} className="tema" style={m.reduzido ? undefined : { opacity: opacidade }}>
      <span className="tema__numero" aria-hidden="true">
        {String(indice + 1).padStart(2, "0")}
      </span>
      <div className="tema__corpo">
        <h3>{item.titulo}</h3>
        {preenchido(item.texto) && <p>{item.texto}</p>}
      </div>
    </motion.li>
  );
}

export function Ajuda() {
  const { conteudo } = useConfig();
  const dados = conteudo.ajuda;

  return (
    <section id="ajuda" className="secao secao--escura" tabIndex={-1} aria-labelledby="titulo-ajuda">
      <div className="container ajuda__layout">
        <div className="ajuda__cabecalho">
          <TituloSecao id="titulo-ajuda" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} escuro />
          {preenchido(dados.aviso) && (
            <Reveal tipo="fade" atraso={0.3}>
              <p className="ajuda__aviso">{dados.aviso}</p>
            </Reveal>
          )}
        </div>

        <ul className="ajuda__lista">
          {dados.itens.map((item, i) => (
            <Tema key={item.titulo} item={item} indice={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
