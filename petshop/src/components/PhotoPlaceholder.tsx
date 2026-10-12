import { motion, useReducedMotion as useMotionReducedMotion } from "motion/react";

// Bloco de imagem com legenda "[FOTO ...]" — troque por <img src="/pets/arquivo.jpg" />
// dentro deste componente quando as fotos reais estiverem disponíveis em public/pets.
// A animação de cortina (clip-path) + zoom funciona igual com placeholder ou <img>.
export function PhotoPlaceholder({
  alt,
  className,
  style,
  delay = 0,
  aspectRatio = "4 / 3",
  animateOnMount = false,
}: {
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  aspectRatio?: string;
  animateOnMount?: boolean;
}) {
  const prefersReduced = useMotionReducedMotion();

  const curtainProps = prefersReduced
    ? {}
    : animateOnMount
      ? {
          initial: { clipPath: "inset(100% 0% 0% 0%)" },
          animate: { clipPath: "inset(0% 0% 0% 0%)" },
        }
      : {
          initial: { clipPath: "inset(100% 0% 0% 0%)" },
          whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
          viewport: { once: true, amount: 0.25 },
        };

  const zoomProps = prefersReduced
    ? {}
    : animateOnMount
      ? { initial: { scale: 1.15 }, animate: { scale: 1 } }
      : {
          initial: { scale: 1.15 },
          whileInView: { scale: 1 },
          viewport: { once: true, amount: 0.25 },
        };

  return (
    <motion.div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        aspectRatio,
        background: "var(--color-bg-alt)",
        border: "1.5px dashed var(--color-text-secondary)",
        ...style,
      }}
      {...curtainProps}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 16,
          color: "var(--color-text-secondary)",
          fontSize: 14,
          fontWeight: 600,
        }}
        {...zoomProps}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {alt}
      </motion.div>
    </motion.div>
  );
}
