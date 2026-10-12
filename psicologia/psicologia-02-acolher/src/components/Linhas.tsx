import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { partesDoTitulo, type ParteDoTitulo } from "../config/titulo.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { useMovimento } from "../motion/tokens.ts";
import "./Linhas.css";

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

/** Descobre em que linha cada palavra caiu e guarda em --linha (sem re-renderizar). */
function numerarLinhas(raiz: HTMLElement) {
  let linha = -1;
  let ultimo = Number.NEGATIVE_INFINITY;
  raiz.querySelectorAll<HTMLElement>("[data-palavra]").forEach((el) => {
    const topo = el.offsetTop;
    if (Math.abs(topo - ultimo) > 2) {
      linha += 1;
      ultimo = topo;
    }
    el.style.setProperty("--linha", String(linha));
  });
}

// Título revelado por máscara: cada linha sobe de dentro de um contêiner com
// overflow hidden. A animação é uma transição de CSS em `transform` (barata),
// escalonada por linha. Observa o contêiner de fora, nunca a máscara.
export function Linhas({ texto, como = "h2", id, imediato = false, atraso = 0, className }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.4);
  const animado = m.observador;
  // Acima da dobra: a classe "ativa" entra no quadro seguinte, senão não há transição.
  const [montado, setMontado] = useState(false);
  useEffect(() => {
    if (!imediato) return;
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setMontado(true));
    });
    return () => cancelAnimationFrame(id);
  }, [imediato]);
  const ativo = (imediato && montado) || emVista || !animado;
  const Titulo = como as ElementType;
  const palavras = emPalavras(texto);

  useLayoutEffect(() => {
    const raiz = ref.current;
    if (!raiz) return;
    numerarLinhas(raiz);
    if (typeof ResizeObserver === "undefined") return;
    const observador = new ResizeObserver(() => numerarLinhas(raiz));
    observador.observe(raiz);
    // A fonte do título muda a quebra de linha quando termina de carregar.
    document.fonts?.ready.then(() => numerarLinhas(raiz));
    return () => observador.disconnect();
  }, [texto]);

  const estilo = {
    "--duracao": `${m.dur(1)}s`,
    "--atraso": `${m.reduzido ? 0 : atraso}s`,
    "--intervalo": m.reduzido ? "0s" : "0.12s",
  } as CSSProperties;

  const classes = [
    "linhas",
    animado ? "linhas--animado" : "",
    m.reduzido ? "linhas--reduzido" : "",
    ativo ? "linhas--ativo" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} style={estilo}>
      <Titulo id={id} className={className}>
        {palavras.map((palavra, i) => (
          <Fragment key={i}>
            <span className="linhas__mascara" data-palavra>
              <span className="linhas__palavra">
                {palavra.partes.map((p, j) =>
                  p.destaque ? <em key={j}>{p.texto}</em> : <Fragment key={j}>{p.texto}</Fragment>,
                )}
              </span>
            </span>
            {i < palavras.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Titulo>
    </div>
  );
}
