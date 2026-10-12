import { useEffect } from "react";
import Lenis from "lenis";
import { registrarLenis } from "../lib/scroll.ts";
import { useReducedMotion } from "./useReducedMotion.ts";

// Âncoras do menu: seno suave nas duas pontas, sem arranque nem freada brusca.
const easingAncora = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

// Rolagem suave via Lenis nas âncoras e com a roda do mouse.
// Desligada com prefers-reduced-motion. No toque, a rolagem continua nativa.
export function useLenis() {
  const reduzido = useReducedMotion();

  useEffect(() => {
    if (reduzido || typeof requestAnimationFrame === "undefined" || typeof ResizeObserver === "undefined") return;

    // Roda do mouse: inércia por interpolação (lerp). O alvo é perseguido a cada quadro,
    // então a rolagem começa na hora e desacelera longa e macia, em vez de seguir uma
    // curva de duração fixa. Valor menor = mais deslizante.
    const lenis = new Lenis({ lerp: 0.06, wheelMultiplier: 0.85, smoothWheel: true });
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
      lenis.scrollTo(alvo, { duration: 1.6, easing: easingAncora });
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
