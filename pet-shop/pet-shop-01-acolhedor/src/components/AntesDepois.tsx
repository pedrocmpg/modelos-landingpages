import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import type { Imagem } from "../config/types.ts";
import { useConfig } from "../context/configContext.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { SeloExemplo } from "./SeloExemplo.tsx";
import "./AntesDepois.css";

interface Props {
  antes: Imagem;
  depois: Imagem;
  exemplo?: boolean;
}

// Comparador antes/depois. A foto "antes" fica por cima e é recortada por
// clip-path; a alça se move por transform. O controle é um <input range>
// nativo (arrasta no toque/mouse e funciona com as setas do teclado).
export function AntesDepois({ antes, depois, exemplo }: Props) {
  const { rotulos } = useConfig().conteudo;
  const m = useMovimento();
  const quadroRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const emVista = useEmVista(quadroRef, 0.4);
  const animar = m.observador && !m.reduzido;

  // Posição da divisória (0–100). Começa mostrando só o "antes" e abre até o meio.
  const pos = useMotionValue(animar ? 96 : 50);
  const recorte = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const alca = useTransform(pos, (v) => `${v}%`);

  useEffect(() => {
    if (!animar || !emVista) return;
    const controle = animate(pos, 50, {
      duration: m.dur(1.5),
      ease: EASE.inOut,
      delay: 0.25,
      onUpdate: (v) => {
        if (inputRef.current) inputRef.current.value = String(v);
      },
    });
    return () => controle.stop();
  }, [animar, emVista, m, pos]);

  return (
    <div ref={quadroRef} className="antes-depois">
      <img className="antes-depois__img" src={depois.src} alt={depois.alt} loading="lazy" decoding="async" />
      <motion.div className="antes-depois__antes" style={{ clipPath: recorte }}>
        <img className="antes-depois__img" src={antes.src} alt={antes.alt} loading="lazy" decoding="async" />
      </motion.div>

      <span className="antes-depois__etiqueta antes-depois__etiqueta--antes" aria-hidden="true">
        {rotulos.antes}
      </span>
      <span className="antes-depois__etiqueta antes-depois__etiqueta--depois" aria-hidden="true">
        {rotulos.depois}
      </span>

      <input
        ref={inputRef}
        className="antes-depois__controle"
        type="range"
        min={0}
        max={100}
        step={0.5}
        defaultValue={animar ? 96 : 50}
        aria-label={rotulos.deslizarAntesDepois}
        onPointerDown={() => pos.stop()}
        onInput={(e) => pos.set(Number(e.currentTarget.value))}
      />

      <motion.div className="antes-depois__alca" style={{ x: alca }} aria-hidden="true">
        <span className="antes-depois__linha" />
        <span className="antes-depois__botao">
          <svg width="22" height="22" viewBox="0 0 24 24" focusable="false">
            <path
              d="m9 7-5 5 5 5M15 7l5 5-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.div>

      {exemplo && (
        <span className="antes-depois__selo">
          <SeloExemplo foto />
        </span>
      )}
    </div>
  );
}
