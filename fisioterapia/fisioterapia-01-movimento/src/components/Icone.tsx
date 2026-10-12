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
  coluna: (
    <>
      <rect {...tracos} x="9.500" y="2.500" width="5" height="3.500" rx="1.500" />
      <rect {...tracos} x="8.500" y="7.500" width="7" height="3.500" rx="1.500" />
      <rect {...tracos} x="8.500" y="12.500" width="7" height="3.500" rx="1.500" />
      <rect {...tracos} x="9.500" y="17.500" width="5" height="3.500" rx="1.500" />
    </>
  ),
  ombro: (
    <>
      <circle {...tracos} cx="12" cy="8.500" r="3.200" />
      <path {...tracos} d="M3.500 20.500c0-4.500 3.200-7.500 8.500-7.500" />
      <path {...tracos} d="m12 13 6 7.500" />
    </>
  ),
  joelho: (
    <>
      <path {...tracos} d="M9 3.500 11.200 9.700" />
      <path {...tracos} d="M15 20.500 12.800 14.300" />
      <circle {...tracos} cx="12" cy="12" r="2.600" />
    </>
  ),
  pe: (
    <>
      <path
        {...tracos}
        d="M8.500 21c-2.300 0-3.400-1.600-2.900-4.200.5-3.600 1.400-8 4.600-9 2.400-.7 4 1 4 3.500 0 2.200-1 3.200-1 5.700 0 2.300-2 4-4.700 4Z"
      />
      <circle {...tracos} cx="15.200" cy="4.200" r=".8" />
      <circle {...tracos} cx="17.800" cy="6" r=".8" />
      <circle {...tracos} cx="19" cy="8.800" r=".8" />
    </>
  ),
  equilibrio: (
    <>
      <path {...tracos} d="M12 4.500V18M8 19.500h8M4 8.500h16" />
      <path {...tracos} d="m4 8.500-2 5h4l-2-5ZM20 8.500l-2 5h4l-2-5Z" />
    </>
  ),
  movimento: (
    <>
      <path {...tracos} d="M4 18.500c4.500 0 3-6.500 8-6.500s3.500-6 8-6" />
      <circle {...tracos} cx="4" cy="18.500" r="1.400" />
      <path {...tracos} d="m17.500 3.500 2.700 2.500-2.200 2.800" />
    </>
  ),
  prancheta: (
    <>
      <rect {...tracos} x="5" y="4" width="14" height="17" rx="2.500" />
      <path {...tracos} d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" />
    </>
  ),
  rota: (
    <>
      <circle {...tracos} cx="6" cy="18" r="2" />
      <circle {...tracos} cx="18" cy="6" r="2" />
      <path {...tracos} d="M8 18h5a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h5" />
    </>
  ),
  calendario: (
    <>
      <rect {...tracos} x="3.500" y="5" width="17" height="15.500" rx="3" />
      <path {...tracos} d="M3.500 10h17M8 3v4M16 3v4" />
    </>
  ),
  escudo: (
    <>
      <path {...tracos} d="M12 3.500 19 6v5.500c0 4.800-3.200 8-7 9.500-3.800-1.500-7-4.700-7-9.500V6l7-2.500Z" />
      <path {...tracos} d="m9 12.200 2.200 2.200L15.300 10" />
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
