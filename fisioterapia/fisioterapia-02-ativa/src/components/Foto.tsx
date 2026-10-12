import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Imagem } from "../config/types.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { useMovimento } from "../motion/tokens.ts";
import { SeloExemplo } from "./SeloExemplo.tsx";
import "./Foto.css";

interface Props {
  imagem: Imagem;
  proporcao?: string;
  posicao?: string;
  /** Acima da dobra: carrega já e anima ao montar. */
  prioritaria?: boolean;
  atraso?: number;
  className?: string;
}

// Foto que se revela em diagonal (clip-path polygon) com um leve zoom-out. É uma
// transição de CSS: o contêiner externo, sem recorte, é o que o
// IntersectionObserver acompanha.
export function Foto({ imagem, proporcao = "4 / 3", posicao = "center", prioritaria = false, atraso = 0, className }: Props) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.2);
  // Acima da dobra: a classe "aberta" entra no quadro seguinte, senão não há transição.
  const [montado, setMontado] = useState(false);
  useEffect(() => {
    if (!prioritaria) return;
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setMontado(true));
    });
    return () => cancelAnimationFrame(id);
  }, [prioritaria]);

  const animado = m.observador && !m.reduzido;
  const aberta = !animado || (prioritaria ? montado : emVista);
  const classes = ["foto", animado ? "foto--animada" : "", aberta ? "foto--aberta" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} style={{ "--atraso": `${atraso}s` } as CSSProperties}>
      <div className="foto__quadro" style={{ aspectRatio: proporcao }}>
        <img
          className="foto__imagem"
          src={imagem.src}
          alt={imagem.alt}
          loading={prioritaria ? "eager" : "lazy"}
          fetchPriority={prioritaria ? "high" : undefined}
          decoding="async"
          style={{ objectPosition: posicao }}
        />
      </div>
      {imagem.exemplo && (
        <span className="foto__selo">
          <SeloExemplo />
        </span>
      )}
    </div>
  );
}
