import type { ReactNode } from "react";
import type { IconeId } from "../config/types.ts";

const tracos = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ICONES: Record<IconeId, ReactNode> = {
  coracao: (
    <path
      {...tracos}
      d="M12 20s-7.5-4.6-9.6-9.4C1.1 7.6 3 4.8 6.2 4.8c1.9 0 3.4 1 5.8 3.4 2.4-2.4 3.9-3.4 5.8-3.4 3.2 0 5.1 2.8 3.8 5.8C19.5 15.4 12 20 12 20Z"
    />
  ),
  brilho: (
    <>
      <path
        {...tracos}
        d="M12 3.5c.6 3.4 1.5 5 5 6.5-3.5 1.5-4.4 3.1-5 6.5-.6-3.4-1.5-5-5-6.5 3.5-1.5 4.4-3.1 5-6.5Z"
      />
      <path
        {...tracos}
        d="M18.5 16.5c.3 1.6.7 2.3 2.3 2.8-1.6.5-2 1.2-2.3 2.8-.3-1.6-.7-2.3-2.3-2.8 1.6-.5 2-1.2 2.3-2.8Z"
      />
    </>
  ),
  escudo: (
    <>
      <path {...tracos} d="M12 3.5 19 6v5.5c0 4.8-3.2 8-7 9.5-3.8-1.5-7-4.7-7-9.5V6l7-2.5Z" />
      <path {...tracos} d="m9 12.2 2.2 2.2L15.3 10" />
    </>
  ),
  gota: (
    <path
      {...tracos}
      d="M12 2.5c3.2 4.2 6.5 8.4 6.5 12.2a6.5 6.5 0 1 1-13 0c0-3.8 3.3-8 6.5-12.2Z"
    />
  ),
  tesoura: (
    <>
      <circle {...tracos} cx="6" cy="6" r="2.4" />
      <circle {...tracos} cx="6" cy="18" r="2.4" />
      <path {...tracos} d="M7.8 7.6 19 18M7.8 16.4 19 6" />
    </>
  ),
  pata: (
    <g fill="currentColor" transform="scale(.375)">
      <ellipse cx="22" cy="22" rx="5" ry="6.5" />
      <ellipse cx="42" cy="22" rx="5" ry="6.5" />
      <ellipse cx="14" cy="34" rx="4.5" ry="6" />
      <ellipse cx="50" cy="34" rx="4.5" ry="6" />
      <path d="M32 32c8 0 14 6 14 12.5S40.5 52 32 52s-14-3.5-14-7.5S24 32 32 32z" />
    </g>
  ),
  relogio: (
    <>
      <circle {...tracos} cx="12" cy="12" r="8.5" />
      <path {...tracos} d="M12 7.5V12l3 2" />
    </>
  ),
  calendario: (
    <>
      <rect {...tracos} x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path {...tracos} d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  mensagem: (
    <path
      {...tracos}
      d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3.8V16A2.5 2.5 0 0 1 4 13.5v-7Z"
    />
  ),
  estrela: (
    <path
      {...tracos}
      d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.2-4.1 5.8-.8L12 3.6Z"
    />
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
