import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { AntesDepois } from "./AntesDepois.tsx";
import { Foto } from "./Foto.tsx";
import { Reveal } from "./Reveal.tsx";
import { escalonar } from "../motion/tokens.ts";
import { SeloExemplo } from "./SeloExemplo.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Galeria.css";

export function Galeria() {
  const { conteudo, imagens } = useConfig();
  const dados = conteudo.galeria;

  return (
    <section id="galeria" className="secao" tabIndex={-1} aria-labelledby="titulo-galeria">
      <div className="container">
        <TituloSecao id="titulo-galeria" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />
        {preenchido(dados.anotacao) && imagens.galeria.some((g) => g.tipo === "antesDepois") && (
          <Reveal tipo="pop" atraso={0.2} className="galeria__anotacao">
            <p className="anotacao">{dados.anotacao}</p>
          </Reveal>
        )}

        <ul className="galeria__grade">
          {imagens.galeria.map((item, i) =>
            item.tipo === "antesDepois" ? (
              <Reveal
                key={item.depois.src}
                as="li"
                tipo="rise"
                atraso={escalonar(i, 0.08)}
                className="galeria__celula galeria__celula--larga"
              >
                <figure className="galeria__item">
                  <AntesDepois antes={item.antes} depois={item.depois} exemplo={item.exemplo} />
                  {preenchido(item.legenda) && <figcaption className="galeria__legenda">{item.legenda}</figcaption>}
                </figure>
              </Reveal>
            ) : (
              <li key={item.imagem.src} className="galeria__celula">
                <figure className="galeria__item galeria__item--foto">
                  <Foto imagem={item.imagem} proporcao="auto" atraso={escalonar(i, 0.1)} className="galeria__foto">
                    {item.exemplo && (
                      <span className="galeria__selo">
                        <SeloExemplo foto />
                      </span>
                    )}
                  </Foto>
                  {preenchido(item.legenda) && <figcaption className="galeria__legenda">{item.legenda}</figcaption>}
                </figure>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
