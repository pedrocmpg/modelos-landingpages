import { useConfig } from "../context/configContext.ts";
import "./SeloExemplo.css";

/** Selo "foto de exemplo". Some quando a flag `exemplo` sai da imagem no config. */
export function SeloExemplo() {
  const { rotulos } = useConfig().conteudo;
  return <span className="selo-exemplo">{rotulos.fotoExemplo}</span>;
}
