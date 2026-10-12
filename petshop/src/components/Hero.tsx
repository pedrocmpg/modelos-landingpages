import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useMotionReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { business, hero } from "../content";
import { whatsappHref } from "../lib/whatsapp";
import { AnimatedCounter } from "./AnimatedCounter";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

const words = hero.title.split(" ");

export function Hero() {
  const prefersReduced = useMotionReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -32]);
  const decorY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -60]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="section"
      style={{
        paddingTop: "calc(var(--header-height) + 48px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
        data-hero-grid
      >
        <div>
          <motion.span
            className="eyebrow"
            style={{
              background: "var(--color-bg-alt)",
              padding: "8px 16px",
              borderRadius: "var(--radius-pill)",
              marginBottom: 24,
              display: "inline-block",
            }}
            initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.badge}
          </motion.span>

          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 54px)",
              lineHeight: 1.25,
              marginBottom: 24,
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                  paddingBottom: "0.2em",
                  marginBottom: "-0.2em",
                }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={prefersReduced ? undefined : { y: "110%" }}
                  animate={prefersReduced ? undefined : { y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 + i * 0.06,
                  }}
                >
                  {word + (i < words.length - 1 ? " " : "")}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            style={{
              fontSize: 18,
              color: "var(--color-text-secondary)",
              maxWidth: 460,
              marginBottom: 32,
            }}
            initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}
            initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-shine"
            >
              {hero.primaryCta}
            </a>
            <a href="#avaliacoes" className="btn btn-secondary">
              {hero.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}
            initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.66 }}
          >
            <span aria-hidden="true" style={{ color: "var(--color-gold)", fontSize: 18 }}>
              ★★★★★
            </span>
            <span>
              <AnimatedCounter value={business.googleRating} decimals={1} /> ·{" "}
              <AnimatedCounter value={business.googleReviewCount} /> avaliações no
              Google
            </span>
          </motion.div>
        </div>

        <div style={{ position: "relative" }}>
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10%",
              right: "-10%",
              width: "70%",
              height: "70%",
              borderRadius: "50%",
              background: "var(--color-gold)",
              opacity: 0.35,
              zIndex: 0,
              y: decorY,
            }}
            animate={
              prefersReduced
                ? undefined
                : { y: [0, -10, 0] }
            }
            transition={
              prefersReduced
                ? undefined
                : { duration: 7, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            style={{ position: "relative", zIndex: 1, y: imageY }}
            initial={prefersReduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <PhotoPlaceholder alt={hero.imageAlt} aspectRatio="1 / 1" animateOnMount delay={0.3} />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          [data-hero-grid] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
