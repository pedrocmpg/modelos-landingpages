import { useConfig } from "../context/configContext.ts";
import { Icone } from "./Icone.tsx";
import "./Faixa.css";

// Faixa que corre sob o hero: palavras do config separadas por patinhas. Decorativa
// (aria-hidden): o conteúdo de verdade está nas seções.
export function Faixa() {
  const { conteudo, negocio } = useConfig();
  const palavras = conteudo.faixa?.length ? conteudo.faixa : [negocio.slogan];
  // Repete até passar da largura de telas grandes; o CSS anda metade do trilho em loop.
  const volta = Array.from({ length: Math.max(2, Math.ceil(12 / palavras.length)) }, () => palavras).flat();

  return (
    <div className="faixa" aria-hidden="true">
      <div className="faixa__trilho">
        {[0, 1].map((copia) => (
          <ul key={copia} className="faixa__lista">
            {volta.map((p, i) => (
              <li key={i} className="faixa__item">
                <span>{p}</span>
                <Icone id="pata" tamanho={26} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
