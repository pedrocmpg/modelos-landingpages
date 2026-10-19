import { useEffect, useRef } from "react";

/**
 * Faz um texto de uma linha ocupar exatamente a largura da caixa (nome gigante do hero e do
 * rodapé). Mede o texto a 100px e escreve --fs na caixa; refaz a conta quando a caixa muda de
 * tamanho ou quando as fontes terminam de carregar. Funciona com qualquer nome, curto ou longo.
 */
export function useAjusteLargura<C extends HTMLElement, T extends HTMLElement>(texto: string) {
  const caixa = useRef<C>(null);
  const alvo = useRef<T>(null);

  useEffect(() => {
    const el = caixa.current;
    const span = alvo.current;
    if (!el || !span) return;

    const ajustar = () => {
      const estilo = getComputedStyle(el);
      const largura = el.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
      if (!largura) return;
      span.style.fontSize = "100px";
      const natural = span.getBoundingClientRect().width;
      span.style.fontSize = "";
      if (natural > 0) el.style.setProperty("--fs", `${(largura / natural) * 100}px`);
    };

    ajustar();
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(ajustar);
    ro?.observe(el);
    void document.fonts?.ready.then(ajustar);
    return () => ro?.disconnect();
  }, [texto]);

  return { caixa, alvo };
}
