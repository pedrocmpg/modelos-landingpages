import { useConfig } from "../context/configContext.ts";
import { preenchido } from "../config/links.ts";
import { Foto } from "./Foto.tsx";
import { Reveal } from "./Reveal.tsx";
import "./FotoProfissional.css";

/** Foto da profissional ou, enquanto não houver, o placeholder do config. */
export function FotoProfissional() {
  const { imagens, conteudo } = useConfig();
  const foto = imagens.profissional;
  if (foto && preenchido(foto.src)) return <Foto imagem={foto} proporcao="4 / 5" posicao="center 20%" />;

  const texto = conteudo.rotulos.fotoProfissional;
  return (
    <Reveal tipo="fade">
      <div className="foto-profissional" role="img" aria-label={texto}>
        <span aria-hidden="true">{texto}</span>
      </div>
    </Reveal>
  );
}
