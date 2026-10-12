import { useConfig } from "../context/configContext.ts";
import "./SeloExemplo.css";

/** Selo "exemplo" para depoimentos, notas e fotos de demonstração. */
export function SeloExemplo({ foto = false }: { foto?: boolean }) {
  const { rotulos } = useConfig().conteudo;
  return <span className="selo-exemplo">{foto ? rotulos.fotoExemplo : rotulos.exemplo}</span>;
}
