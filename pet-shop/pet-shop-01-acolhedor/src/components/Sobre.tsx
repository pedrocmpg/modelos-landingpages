import { useConfig } from "../context/configContext.ts";
import { Foto } from "./Foto.tsx";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Sobre.css";

export function Sobre() {
  const { conteudo, imagens } = useConfig();
  const dados = conteudo.sobre;
  if (!dados) return null;

  return (
    <section id="sobre" className="secao" tabIndex={-1} aria-labelledby="titulo-sobre">
      <div className={`container sobre__grade${imagens.sobre ? "" : " sobre__grade--sem-imagem"}`}>
        <div className="sobre__texto">
          <TituloSecao id="titulo-sobre" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />
          <div className="sobre__paragrafos">
            {dados.paragrafos.map((p, i) => (
              <Reveal key={i} tipo="rise" distancia={20} atraso={0.12 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        {imagens.sobre && (
          <div className="sobre__imagem">
            <Foto imagem={imagens.sobre} proporcao="4 / 5" />
          </div>
        )}
      </div>
    </section>
  );
}
