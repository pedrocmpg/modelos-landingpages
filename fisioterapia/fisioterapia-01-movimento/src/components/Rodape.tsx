import { useConfig } from "../context/configContext.ts";
import { nomeDoPerfil, preenchido } from "../config/links.ts";
import { perfisSociais } from "./perfis.ts";
import "./Rodape.css";

export function Rodape() {
  const { negocio, conteudo, redes, secoes } = useConfig();
  const { rotulos, rodape } = conteudo;
  const links = secoes.filter((s) => s.ativo && s.menu);
  const perfis = perfisSociais(redes);
  const registro = negocio.registroProfissional;

  return (
    <footer className="rodape">
      <div className="container rodape__grade">
        <div className="rodape__marca">
          <p className="rodape__nome">{negocio.nome}</p>
          <p className="rodape__registro">
            {registro.conselho} {registro.numero}
          </p>
          <p className="rodape__slogan">{negocio.slogan}</p>
        </div>

        {links.length > 0 && (
          <nav className="rodape__nav" aria-label={rotulos.menuPrincipal}>
            {links.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="link-sublinhado rodape__link">
                {s.menu}
              </a>
            ))}
          </nav>
        )}

        {perfis.length > 0 && (
          <ul className="rodape__redes" aria-label={rotulos.redes}>
            {perfis.map(({ url, Glifo }) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="rodape__rede" aria-label={nomeDoPerfil(url)}>
                  <Glifo tamanho={24} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="container rodape__legal">
        {preenchido(rodape.texto) && <p>{rodape.texto}</p>}
        {preenchido(rodape.aviso) && <p>{rodape.aviso}</p>}
        <p>
          © {new Date().getFullYear()} {negocio.nome}. {rotulos.direitos}
        </p>
      </div>
    </footer>
  );
}
