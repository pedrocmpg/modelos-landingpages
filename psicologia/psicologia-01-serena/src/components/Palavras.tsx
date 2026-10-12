import { Fragment, useRef, type ElementType } from "react";
import { motion } from "motion/react";
import { partesDoTitulo, type ParteDoTitulo } from "../config/titulo.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import "./Palavras.css";

interface Props {
  texto: string;
  /** Elemento do título (h1 no hero, h2 nas seções). */
  como?: "h1" | "h2";
  id?: string;
  /** true = anima ao montar (acima da dobra) em vez de ao entrar na tela. */
  imediato?: boolean;
  /** Atraso inicial, em segundos. */
  atraso?: number;
  className?: string;
}

interface Palavra {
  partes: ParteDoTitulo[];
}

/** Quebra o título em palavras; pontuação colada fica na mesma palavra. */
function emPalavras(texto: string): Palavra[] {
  const palavras: Palavra[] = [];
  let espaco = true;
  for (const parte of partesDoTitulo(texto)) {
    for (const pedaco of parte.texto.split(/(\s+)/)) {
      if (pedaco === "") continue;
      if (/^\s+$/.test(pedaco)) {
        espaco = true;
        continue;
      }
      const atual: ParteDoTitulo = { texto: pedaco, destaque: parte.destaque };
      if (espaco || palavras.length === 0) palavras.push({ partes: [atual] });
      else palavras[palavras.length - 1].partes.push(atual);
      espaco = false;
    }
  }
  return palavras;
}

// Título que entra palavra por palavra, de um leve desfoque para nítido.
// Observa o contêiner (que não é recortado), nunca as palavras.
export function Palavras({ texto, como = "h2", id, imediato = false, atraso = 0, className }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.4);
  const animado = m.observador;
  const ativo = imediato || emVista || !animado;
  const Titulo = como as ElementType;
  const palavras = emPalavras(texto);

  const oculto = m.reduzido
    ? { opacity: 0 }
    : { opacity: 0, filter: "blur(10px)", y: m.dist(14) };
  const visivel = m.reduzido
    ? { opacity: 1 }
    : { opacity: 1, filter: "blur(0px)", y: 0 };

  return (
    <div ref={ref} className="palavras">
      <Titulo id={id} className={className}>
        {palavras.map((palavra, i) => (
          <Fragment key={i}>
            <motion.span
              className="palavras__palavra"
              initial={animado ? oculto : false}
              animate={ativo ? visivel : oculto}
              transition={{
                duration: m.dur(1),
                ease: EASE.enter,
                delay: m.reduzido ? 0 : atraso + Math.min(i, 14) * 0.07,
              }}
            >
              {palavra.partes.map((p, j) =>
                p.destaque ? <em key={j}>{p.texto}</em> : <Fragment key={j}>{p.texto}</Fragment>,
              )}
            </motion.span>
            {i < palavras.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Titulo>
    </div>
  );
}
