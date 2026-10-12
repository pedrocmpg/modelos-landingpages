import { useEffect, useState, type RefObject } from "react";

/**
 * true quando o elemento entra na viewport (uma vez só). Observe sempre um
 * elemento que NÃO esteja recortado por overflow/clip-path: se estiver, o
 * IntersectionObserver nunca dispara e o conteúdo fica escondido.
 * Sem IntersectionObserver devolve true na hora (conteúdo nunca fica oculto).
 */
export function useEmVista(
  ref: RefObject<Element | null>,
  amount = 0.25,
): boolean {
  const [emVista, setEmVista] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEmVista(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount]);

  return emVista;
}
