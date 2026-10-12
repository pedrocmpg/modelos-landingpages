import { useConfig } from "../context/configContext.ts";
import { mailtoHref, nomeDoPerfil, preenchido, telHref, whatsappUrl } from "../config/links.ts";
import { GlifoWhatsapp } from "./Glifos.tsx";
import { perfisSociais } from "./perfis.ts";
import { Reveal } from "./Reveal.tsx";
import { TituloSecao } from "./TituloSecao.tsx";
import "./Contato.css";

export function Contato() {
  const { conteudo, contato, redes } = useConfig();
  const dados = conteudo.contato;
  const { rotulos } = conteudo;
  const temMapa = preenchido(contato.mapaEmbedUrl);
  const perfis = perfisSociais(redes);

  return (
    <section id="contato" className="secao" tabIndex={-1} aria-labelledby="titulo-contato">
      <div className="container">
        <TituloSecao id="titulo-contato" eyebrow={dados.eyebrow} titulo={dados.titulo} introducao={dados.introducao} />

        <Reveal className="acoes contato__acoes">
          <a href={whatsappUrl(contato)} target="_blank" rel="noopener noreferrer" className="btn">
            <GlifoWhatsapp />
            {dados.ctaWhatsapp}
          </a>
        </Reveal>

        <div className={`contato__grade${temMapa ? "" : " contato__grade--sem-mapa"}`}>
          <Reveal atraso={0.1}>
            <div className="contato__info">
              {preenchido(dados.texto) && <p className="contato__texto">{dados.texto}</p>}

              <dl className="contato__lista">
                <div>
                  <dt>{rotulos.endereco}</dt>
                  <dd>{contato.endereco}</dd>
                </div>
                <div>
                  <dt>{rotulos.telefone}</dt>
                  <dd>
                    <a href={telHref(contato.telefoneExibicao)} className="link-sublinhado contato__link">
                      {contato.telefoneExibicao}
                    </a>
                  </dd>
                </div>
                {preenchido(contato.email) && (
                  <div>
                    <dt>{rotulos.email}</dt>
                    <dd>
                      <a href={mailtoHref(contato.email)} className="link-sublinhado contato__link">
                        {contato.email}
                      </a>
                    </dd>
                  </div>
                )}
                {contato.horarios.length > 0 && (
                  <div>
                    <dt>{rotulos.horarios}</dt>
                    <dd>
                      <ul>
                        {contato.horarios.map((h) => (
                          <li key={h.dias}>
                            {h.dias}: {h.horas}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {perfis.length > 0 && (
                  <div>
                    <dt>{rotulos.redes}</dt>
                    <dd>
                      <ul className="contato__redes">
                        {perfis.map(({ url, Glifo }) => (
                          <li key={url}>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="contato__rede">
                              <Glifo />
                              {nomeDoPerfil(url)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </Reveal>

          {temMapa && (
            <Reveal atraso={0.2}>
              <div className="cartao contato__mapa">
                <iframe
                  title={`${rotulos.mapa} ${contato.endereco}`}
                  src={contato.mapaEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
