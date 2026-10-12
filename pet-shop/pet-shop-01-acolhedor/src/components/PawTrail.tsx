import { motion, useReducedMotion as useMotionReducedMotion } from "motion/react";

function Paw({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 64 64"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse cx="22" cy="22" rx="5" ry="6.5" />
        <ellipse cx="42" cy="22" rx="5" ry="6.5" />
        <ellipse cx="14" cy="34" rx="4.5" ry="6" />
        <ellipse cx="50" cy="34" rx="4.5" ry="6" />
        <path d="M32 32c8 0 14 6 14 12.5S40.5 52 32 52s-14-3.5-14-7.5S24 32 32 32z" />
      </g>
    </svg>
  );
}

// Trilha decorativa de patinhas que "caminham" atravessando a seção,
// surgindo uma a uma conforme entram na viewport.
export function PawTrail({ count = 6 }: { count?: number }) {
  const prefersReduced = useMotionReducedMotion();

  if (prefersReduced) return null;

  const paws = Array.from({ length: count });

  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6vw",
        color: "var(--color-teal)",
        opacity: 0.28,
        padding: "0 0 8px",
      }}
    >
      {paws.map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.6, rotate: i % 2 === 0 ? -18 : 18 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.09,
          }}
          style={{
            marginTop: i % 2 === 0 ? 0 : 14,
          }}
        >
          <Paw flipped={i % 2 === 1} />
        </motion.span>
      ))}
    </div>
  );
}
