import { motion, useReducedMotion as useMotionReducedMotion } from "motion/react";

// Bloco de imagem com legenda "[FOTO ...]" quando `src` não é passado.
// Passe `src` (ex.: "/pets/arquivo.jpg") para renderizar a foto real —
// a animação de cortina (clip-path) + zoom funciona igual nos dois casos.
export function PhotoPlaceholder({
  alt,
  src,
  objectPosition = "center",
  className,
  style,
  delay = 0,
  aspectRatio = "4 / 3",
  animateOnMount = false,
}: {
  alt: string;
  src?: string;
  objectPosition?: string;
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
        border: src ? "none" : "1.5px dashed rgba(92, 74, 59, 0.45)",
        boxShadow: "0 24px 48px -20px rgba(43, 29, 20, 0.28)",
        ...style,
      }}
      {...curtainProps}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay }}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
          }}
          {...zoomProps}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(rgba(92,74,59,0.16) 1.4px, transparent 1.4px)",
              backgroundSize: "16px 16px",
              opacity: 0.5,
            }}
          />
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
        </>
      )}
    </motion.div>
  );
}
