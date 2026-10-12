import { useEffect } from "react";
import Lenis from "lenis";
import { registrarLenis } from "../lib/scroll.ts";
import { useReducedMotion } from "./useReducedMotion.ts";

// ease-in-out cúbico: começa e termina devagar, sem "teleporte".
const easing = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Rolagem suave via Lenis nas âncoras e com a roda do mouse.
// Desligada com prefers-reduced-motion. No toque, a rolagem continua nativa.
export function useLenis() {
  const reduzido = useReducedMotion();

  useEffect(() => {
    if (reduzido || typeof requestAnimationFrame === "undefined" || typeof ResizeObserver === "undefined") return;

    const lenis = new Lenis({ duration: 1.15, easing, smoothWheel: true });
    registrarLenis(lenis);

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    function aoClicar(e: MouseEvent) {
      const ancora = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = ancora?.getAttribute("href");
      if (!id || id === "#") return;
      const alvo = document.querySelector<HTMLElement>(id);
      if (!alvo) return;
      e.preventDefault();
      // O Lenis já respeita o scroll-margin-top das seções (altura do header).
      lenis.scrollTo(alvo);
      alvo.focus({ preventScroll: true });
    }
    document.addEventListener("click", aoClicar);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", aoClicar);
      registrarLenis(null);
      lenis.destroy();
    };
  }, [reduzido]);
}
