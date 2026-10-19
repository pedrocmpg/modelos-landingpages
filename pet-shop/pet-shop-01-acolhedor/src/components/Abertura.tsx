import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConfig } from "../context/configContext.ts";
import { pausarRolagem, retomarRolagem } from "../lib/scroll.ts";
import { DURACAO_ABERTURA, EASE, useMovimento } from "../motion/tokens.ts";
import { MarcaPlaquinha } from "./Marca.tsx";
import "./Abertura.css";

// Abertura: a plaquinha cai da argola, balança e a cortina laranja sobe revelando o hero.
// Só roda com movimento normal e IntersectionObserver (testes e movimento reduzido pulam).
export function Abertura() {
  const { negocio } = useConfig();
  const m = useMovimento();
  const [ativa, setAtiva] = useState(m.abertura > 0);

  useEffect(() => {
    if (!ativa) return;
    pausarRolagem();
    const fim = window.setTimeout(() => setAtiva(false), DURACAO_ABERTURA * 1000);
    return () => {
      window.clearTimeout(fim);
      retomarRolagem();
    };
  }, [ativa]);

  return (
    <AnimatePresence>
      {ativa && (
        <motion.div
          className="abertura"
          aria-hidden="true"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: EASE.inOut }}
        >
          <div className="abertura__fio" />
          <motion.div
            className="abertura__placa"
            initial={{ y: "-60vh", rotate: 0 }}
            animate={{ y: 0, rotate: [0, 14, -9, 5, 0] }}
            transition={{
              y: { duration: 0.7, ease: EASE.pop },
              rotate: { duration: 1, delay: 0.55, ease: EASE.sine },
            }}
          >
            <MarcaPlaquinha tamanho={92} />
          </motion.div>
          <motion.p
            className="abertura__nome"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE.enter }}
          >
            {negocio.nome}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
