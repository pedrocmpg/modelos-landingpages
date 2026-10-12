import type Lenis from "lenis";

// Instância única do Lenis, para o menu mobile poder pausar a rolagem.
let instancia: Lenis | null = null;

export function registrarLenis(lenis: Lenis | null) {
  instancia = lenis;
}

export function pausarRolagem() {
  instancia?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function retomarRolagem() {
  document.documentElement.style.overflow = "";
  instancia?.start();
}
