import { useConfig } from "../context/configContext.ts";
import { semMarcacao } from "../config/titulo.ts";
import { useMovimento } from "../motion/tokens.ts";
import "./Faixa.css";

// Faixa contínua e lenta com as áreas de atendimento. Pausa no hover e no foco;
// fica parada (e a lista quebra em linhas) com movimento reduzido ou intensidade "suave".
export function Faixa() {
  const { conteudo, secoes } = useConfig();
  const m = useMovimento();
  const ativa = secoes.some((s) => s.id === "areas" && s.ativo);
  if (!ativa) return null;

  const nomes = conteudo.areas.itens.map((a) => a.titulo);

  return (
    <div
      className={`faixa${m.loops ? "" : " faixa--parada"}`}
      role="group"
      aria-label={semMarcacao(conteudo.areas.titulo)}
    >
      <div className="faixa__trilho">
        {[0, 1].map((copia) => (
          <ul key={copia} className="faixa__lista" aria-hidden={copia === 1 ? true : undefined}>
            {nomes.map((nome) => (
              <li key={nome}>{nome}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
