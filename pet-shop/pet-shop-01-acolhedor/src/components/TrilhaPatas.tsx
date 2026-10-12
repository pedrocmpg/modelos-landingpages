import { useRef } from "react";
import { motion } from "motion/react";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";
import { Icone } from "./Icone.tsx";
import "./TrilhaPatas.css";

// Decoração: patinhas que "caminham", surgindo uma a uma com leve giro e
// overshoot. Sem movimento reduzido ela some (é só enfeite).
export function TrilhaPatas({ quantidade = 7 }: { quantidade?: number }) {
  const m = useMovimento();
  const ref = useRef<HTMLDivElement>(null);
  const emVista = useEmVista(ref, 0.6);

  if (m.reduzido) return null;

  return (
    <div ref={ref} className="trilha-patas" aria-hidden="true">
      {Array.from({ length: quantidade }, (_, i) => {
        const oculto = { opacity: 0, scale: 0.5, rotate: i % 2 === 0 ? -24 : 24 };
        return (
          <motion.span
            key={i}
            className={`trilha-patas__pata${i % 2 ? " trilha-patas__pata--baixa" : ""}`}
            initial={m.observador ? oculto : false}
            animate={emVista || !m.observador ? { opacity: 1, scale: 1, rotate: 0 } : oculto}
            transition={{ duration: m.dur(0.5), ease: EASE.pop, delay: i * 0.1 }}
          >
            <Icone id="pata" tamanho={22} />
          </motion.span>
        );
      })}
    </div>
  );
}
