import { motion, useReducedMotion as useMotionReducedMotion } from "motion/react";

// Revela o título linha por linha (máscara com overflow hidden) e depois
// desenha o sublinhado dourado da esquerda para a direita.
export function SectionTitle({
  eyebrow,
  lines,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  lines: string[];
  align?: "left" | "center";
  light?: boolean;
}) {
  const prefersReduced = useMotionReducedMotion();

  return (
    <div style={{ textAlign: align }}>
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={prefersReduced ? undefined : { opacity: 0, y: 8 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.span>
      )}
      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: align === "center" ? "center" : "flex-start",
        }}
      >
        {lines.map((line, i) => (
          <span
            key={line}
            style={{ overflow: "hidden", display: "block", paddingBottom: 4 }}
          >
            <motion.span
              style={{ display: "block" }}
              initial={prefersReduced ? undefined : { y: "100%" }}
              whileInView={prefersReduced ? undefined : { y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.08,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>
      <motion.span
        aria-hidden="true"
        style={{
          display: "block",
          height: 3,
          width: 64,
          borderRadius: 4,
          background: light ? "var(--color-gold)" : "var(--color-gold)",
          marginTop: 14,
          transformOrigin: align === "center" ? "center" : "left",
          marginLeft: align === "center" ? "auto" : 0,
          marginRight: align === "center" ? "auto" : 0,
        }}
        initial={prefersReduced ? undefined : { scaleX: 0 }}
        whileInView={prefersReduced ? undefined : { scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.6,
          ease: [0.65, 0, 0.35, 1],
          delay: lines.length * 0.08 + 0.1,
        }}
      />
    </div>
  );
}
