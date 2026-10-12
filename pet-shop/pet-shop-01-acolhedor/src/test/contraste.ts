// Contraste WCAG 2.x entre cores hex (#rgb ou #rrggbb).

function rgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminancia(hex: string): number {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contraste(a: string, b: string): number {
  const [la, lb] = [luminancia(a), luminancia(b)];
  const [claro, escuro] = la > lb ? [la, lb] : [lb, la];
  return (claro + 0.05) / (escuro + 0.05);
}

/** Equivalente a color-mix(in srgb, a pct%, b), devolvido em hex. */
export function misturar(a: string, b: string, pct: number): string {
  const [ra, rb] = [rgb(a), rgb(b)];
  const m = ra.map((v, i) => Math.round((v * pct) / 100 + rb[i] * (1 - pct / 100)));
  return `#${m.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
