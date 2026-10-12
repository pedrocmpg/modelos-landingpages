import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { useEmVista } from "../hooks/useEmVista.ts";
import { EASE, useMovimento } from "../motion/tokens.ts";

// Número que "sobe" de 0 até o valor quando entra na tela. O valor final fica
// sempre disponível para leitores de tela (aria-label) e é o que aparece se a
// animação não rodar (movimento reduzido, sem IntersectionObserver).
export function ContadorAnimado({ valor, decimais = 0 }: { valor: number; decimais?: number }) {
  const { meta } = useConfig();
  const m = useMovimento();
  const ref = useRef<HTMLSpanElement>(null);
  const emVista = useEmVista(ref, 0.6);
  const animar = m.observador && !m.reduzido;
  const [animado, setExibido] = useState(0);
  const exibido = animar ? animado : valor;

  useEffect(() => {
    if (!animar || !emVista) return;
    const controle = animate(0, valor, {
      duration: m.dur(1.2),
      ease: EASE.enter,
      onUpdate: setExibido,
    });
    return () => controle.stop();
  }, [animar, emVista, valor, m]);

  const formatar = (n: number) =>
    n.toLocaleString(meta.lang, { minimumFractionDigits: decimais, maximumFractionDigits: decimais });

  return (
    <span ref={ref} aria-label={formatar(valor)}>
      <span aria-hidden="true">{formatar(exibido)}</span>
    </span>
  );
}
