import { useEffect, type RefObject } from "react";

/**
 * Inclinação 3D leve (até 6°) que segue o ponteiro. Só no desktop (hover + ponteiro
 * fino), só com `ativo` e só em `transform`. No toque ou com movimento reduzido
 * não registra nada.
 */
export function useInclinacao(ref: RefObject<HTMLElement | null>, ativo: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !ativo || typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let quadro = 0;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      });
    };
    const sair = () => {
      cancelAnimationFrame(quadro);
      el.style.transform = "";
    };

    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", sair);
    return () => {
      cancelAnimationFrame(quadro);
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", sair);
      el.style.transform = "";
    };
  }, [ref, ativo]);
}
