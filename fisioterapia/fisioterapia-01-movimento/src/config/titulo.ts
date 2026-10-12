// Títulos aceitam `*palavra*` para destacar uma palavra. Funções
// puras: usadas pelos componentes, pelo <noscript> e pelos testes.

export interface ParteDoTitulo {
  texto: string;
  destaque: boolean;
}

/** "Um espaço *sem pressa*" -> [{Um espaço, false}, {sem pressa, true}]. */
export function partesDoTitulo(titulo: string): ParteDoTitulo[] {
  return titulo
    .split(/(\*[^*]+\*)/)
    .filter((p) => p.length > 0)
    .map((p) =>
      p.startsWith("*") && p.endsWith("*") && p.length > 2
        ? { texto: p.slice(1, -1), destaque: true }
        : { texto: p, destaque: false },
    );
}

/** Texto puro, sem as marcações: para <title>, aria-label e <noscript>. */
export function semMarcacao(titulo: string): string {
  return partesDoTitulo(titulo)
    .map((p) => p.texto)
    .join("");
}
