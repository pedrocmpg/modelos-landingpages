import type { ReactNode } from "react";
import type { IconeId } from "../config/types.ts";

const tracos = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ICONES: Record<IconeId, ReactNode> = {
  folha: (
    <>
      <path {...tracos} d="M12 21c-5-3.4-7.5-7.300-7.500-11.200C4.500 7 7 4.800 12 2.500c5 2.300 7.500 4.500 7.500 7.300 0 3.900-2.500 7.800-7.500 11.200Z" />
      <path {...tracos} d="M12 21V8.500" />
    </>
  ),
  coracao: (
    <path
      {...tracos}
      d="M12 20s-7.500-4.600-9.600-9.400C1.100 7.600 3 4.800 6.200 4.800c1.900 0 3.400 1 5.800 3.400 2.400-2.400 3.900-3.400 5.800-3.400 3.200 0 5.100 2.800 3.800 5.800C19.500 15.400 12 20 12 20Z"
    />
  ),
  mensagem: (
    <path
      {...tracos}
      d="M4 6.500A2.500 2.500 0 0 1 6.500 4h11A2.500 2.500 0 0 1 20 6.500v7a2.500 2.500 0 0 1-2.500 2.500H11l-4.500 3.800V16A2.500 2.500 0 0 1 4 13.500v-7Z"
    />
  ),
  calendario: (
    <>
      <rect {...tracos} x="3.500" y="5" width="17" height="15.500" rx="3" />
      <path {...tracos} d="M3.500 10h17M8 3v4M16 3v4" />
    </>
  ),
  relogio: (
    <>
      <circle {...tracos} cx="12" cy="12" r="8.500" />
      <path {...tracos} d="M12 7.500V12l3 2" />
    </>
  ),
  escudo: (
    <>
      <path {...tracos} d="M12 3.500 19 6v5.500c0 4.800-3.200 8-7 9.500-3.800-1.500-7-4.700-7-9.500V6l7-2.500Z" />
      <path {...tracos} d="m9 12.200 2.200 2.200L15.300 10" />
    </>
  ),
  casa: (
    <>
      <path {...tracos} d="M4 11 12 4l8 7v8.500a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11Z" />
      <path {...tracos} d="M10 20.500v-5.500h4v5.500" />
    </>
  ),
  video: (
    <>
      <rect {...tracos} x="3" y="6.500" width="12.500" height="11" rx="3" />
      <path {...tracos} d="m15.500 10.500 5-2.800v8.600l-5-2.800" />
    </>
  ),
};

/** Ícone decorativo (aria-hidden). O texto ao lado é quem descreve. */
export function Icone({ id, tamanho = 26 }: { id: IconeId; tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {ICONES[id]}
    </svg>
  );
}
