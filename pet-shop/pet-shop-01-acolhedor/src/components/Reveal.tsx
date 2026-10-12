import { useRef, type ElementType, type ReactNode } from "react";
import { motion } from "motion/react";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento, type Movimento } from "../motion/tokens.ts";

// Cada tipo de elemento tem a sua própria entrada. Só anima transform,
// opacity e clip-path.
//  rise       cartões de conteúdo (sobe com leve rotação)
//  slideLeft  blocos que entram pela esquerda
//  slideRight blocos que entram pela direita
//  pop        decorações e selos (escala com leve overshoot)
//  wipe       cartões revelados por cortina lateral (clip-path)
//  fade       só opacidade
export type TipoEntrada = "rise" | "slideLeft" | "slideRight" | "pop" | "wipe" | "fade";

type Tag = "div" | "li" | "article" | "blockquote" | "figure";

interface Props {
  children: ReactNode;
  tipo?: TipoEntrada;
  /** Atraso em segundos (use escalonar(i) para listas). */
  atraso?: number;
  /** Rotação inicial em graus (só no tipo rise). */
  rotacao?: number;
  /** Sobrescreve a distância padrão (px) dos tipos rise/slide. */
  distancia?: number;
  className?: string;
  as?: Tag;
}

// clip-path com folga negativa para não cortar sombras no estado final.
const CLIP_FECHADO = "inset(-80px 100% -80px -80px)";
const CLIP_ABERTO = "inset(-80px -80px -80px -80px)";

function estados(tipo: TipoEntrada, m: Movimento, rotacao: number, distancia?: number) {
  if (m.reduzido || tipo === "fade") {
    return { oculto: { opacity: 0 }, visivel: { opacity: 1 } };
  }
  const d = (padrao: number) => m.dist(distancia ?? padrao);
  switch (tipo) {
    case "rise":
      return {
        oculto: { opacity: 0, y: d(32), rotate: rotacao },
        visivel: { opacity: 1, y: 0, rotate: 0 },
      };
    case "slideLeft":
      return { oculto: { opacity: 0, x: -d(48) }, visivel: { opacity: 1, x: 0 } };
    case "slideRight":
      return { oculto: { opacity: 0, x: d(48) }, visivel: { opacity: 1, x: 0 } };
    case "pop":
      return {
        oculto: { opacity: 0, scale: m.suave ? 0.92 : 0.8 },
        visivel: { opacity: 1, scale: 1 },
      };
    case "wipe":
      return {
        oculto: { opacity: 0, clipPath: CLIP_FECHADO },
        visivel: { opacity: 1, clipPath: CLIP_ABERTO },
      };
  }
}

function transicao(tipo: TipoEntrada, m: Movimento, atraso: number) {
  if (m.reduzido) return { duration: m.dur(0.25), ease: EASE.enter };
  switch (tipo) {
    case "pop":
      return { duration: m.dur(0.6), ease: EASE.pop, delay: atraso };
    case "wipe":
      return { duration: m.dur(0.9), ease: EASE.inOut, delay: atraso };
    case "fade":
      return { duration: m.dur(0.6), ease: EASE.enter, delay: atraso };
    default:
      return { duration: m.dur(0.8), ease: EASE.enter, delay: atraso };
  }
}

export function Reveal({
  children,
  tipo = "rise",
  atraso = 0,
  rotacao = 0,
  distancia,
  className,
  as = "div",
}: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLElement>(null);
  const emVista = useEmVista(ref, 0.2);

  // Sem IntersectionObserver: nada de estado oculto.
  const Externo = as as ElementType;
  if (!m.observador) return <Externo className={className}>{children}</Externo>;

  const { oculto, visivel } = estados(tipo, m, rotacao, distancia);
  const MotionTag = motion[as] as typeof motion.div;

  // clip-path: o IntersectionObserver não dispara em um elemento recortado por
  // ele mesmo. Então o contêiner externo (sem recorte) é observado e o interno anima.
  if (tipo === "wipe" && !m.reduzido) {
    return (
      <Externo className={className} ref={ref}>
        <motion.div
          style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}
          initial={oculto}
          animate={emVista ? visivel : oculto}
          transition={transicao(tipo, m, atraso)}
        >
          {children}
        </motion.div>
      </Externo>
    );
  }

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={oculto}
      animate={emVista ? visivel : oculto}
      transition={transicao(tipo, m, atraso)}
    >
      {children}
    </MotionTag>
  );
}
