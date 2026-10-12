import { useMemo } from "react";
import { useConfig } from "../context/configContext.ts";
import { useReducedMotion } from "../hooks/useReducedMotion.ts";

// Easings próprios. Nunca usar "ease" / "easeInOut" padrão.
export const EASE = {
  /** Saída longa e suave: entradas em geral. */
  enter: [0.22, 1, 0.36, 1],
  /** Começa e termina devagar: cortinas, wipes, scroll. */
  inOut: [0.65, 0, 0.35, 1],
  /** Passa um pouco do alvo e volta: decorações e selos. */
  pop: [0.34, 1.56, 0.64, 1],
  /** Seno suave: loops contínuos. */
  sine: [0.45, 0, 0.55, 1],
} as const;

/** Atraso escalonado: 3 itens por fileira, sem acumular em listas longas. */
export const escalonar = (indice: number, passo = 0.1) => (indice % 3) * passo;

export interface Movimento {
  /** Usuário pediu menos movimento: só fades curtos, sem parallax nem loops. */
  reduzido: boolean;
  /** intensidadeAnimacao === "suave". */
  suave: boolean;
  /** false = sem IntersectionObserver: tudo aparece sem animação de entrada. */
  observador: boolean;
  /** Loops contínuos permitidos (nem reduzido, nem suave). */
  loops: boolean;
  /** Ajusta uma distância em px à intensidade (0 com movimento reduzido). */
  dist: (px: number) => number;
  /** Ajusta uma duração em segundos à intensidade (fades curtos se reduzido). */
  dur: (segundos: number) => number;
}

/** Durações e distâncias vêm da intensidade do config. */
export function useMovimento(): Movimento {
  const { tema } = useConfig();
  const reduzido = useReducedMotion();
  const suave = tema.intensidadeAnimacao === "suave";
  const observador = typeof IntersectionObserver !== "undefined";

  return useMemo(() => {
    const fatorDist = reduzido ? 0 : suave ? 0.5 : 1;
    const fatorDur = suave ? 1.25 : 1;
    return {
      reduzido,
      suave,
      observador,
      loops: !reduzido && !suave,
      dist: (px: number) => px * fatorDist,
      dur: (s: number) => (reduzido ? Math.min(s, 0.25) : s * fatorDur),
    };
  }, [reduzido, suave, observador]);
}
