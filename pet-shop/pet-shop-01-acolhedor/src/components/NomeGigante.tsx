import { useAjusteLargura } from "../hooks/useAjusteLargura.ts";
import "./NomeGigante.css";

/** O nome do negócio com a largura exata da caixa. Decorativo: o nome real está em texto no resto da página. */
export function NomeGigante({ texto, className = "" }: { texto: string; className?: string }) {
  const { caixa, alvo } = useAjusteLargura<HTMLDivElement, HTMLSpanElement>(texto);
  return (
    <div ref={caixa} className={`nome-gigante ${className}`} aria-hidden="true">
      <span ref={alvo} className="nome-gigante__texto">
        {texto}
      </span>
    </div>
  );
}
