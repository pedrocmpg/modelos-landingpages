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
        paddingTop: "calc(var(--header-height) + clamp(24px, 5vw, 48px))",
        paddingBottom: "clamp(40px, 6vw, 96px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        className="container hero-grid"
        data-hero-grid
      >
        <div className="hero-copy">
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
            className="hero-subtitle"
            style={{
              fontSize: "clamp(16px, 2.2vw, 18px)",
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
            className="hero-cta-row"
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
            className="hero-rating"
            style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, flexWrap: "wrap" }}
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

        <div className="hero-photo" style={{ position: "relative" }}>
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10%",
              right: "-8%",
              width: "72%",
              height: "72%",
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
            style={{ position: "relative", zIndex: 1, y: imageY, maxWidth: 480, marginInline: "auto" }}
            initial={prefersReduced ? undefined : { opacity: 0, scale: 0.96 }}
            animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <PhotoPlaceholder
              src={hero.image}
              alt={hero.imageAlt}
              aspectRatio="1 / 1"
              objectPosition="center 15%"
              animateOnMount
              delay={0.3}
            />

            <motion.div
              className="hero-sticker"
              aria-hidden="true"
              initial={prefersReduced ? undefined : { opacity: 0, scale: 0.6, rotate: -18 }}
              animate={
                prefersReduced
                  ? undefined
                  : { opacity: 1, scale: 1, rotate: -8 }
              }
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
              style={{
                position: "absolute",
                bottom: "-6%",
                left: "-8%",
                zIndex: 2,
                width: "clamp(84px, 14vw, 116px)",
                height: "clamp(84px, 14vw, 116px)",
                borderRadius: "50%",
                background: "var(--color-teal)",
                color: "var(--color-cream)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(11px, 1.6vw, 13px)",
                lineHeight: 1.2,
                boxShadow: "0 16px 32px -12px rgba(43,29,20,0.35)",
                border: "3px solid var(--color-cream)",
                padding: 8,
              }}
            >
              {!prefersReduced && (
                <motion.span
                  aria-hidden="true"
                  style={{ position: "absolute", inset: -3, borderRadius: "50%" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
              )}
              carinho
              <br />
              garantido
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
        }
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-photo {
            max-width: 420px;
            width: 100%;
            margin: 0 auto;
            order: -1;
          }
          .hero-copy {
            text-align: center;
          }
          .hero-subtitle,
          .hero-cta-row,
          .hero-rating {
            margin-left: auto;
            margin-right: auto;
            justify-content: center;
          }
        }
        @media (max-width: 600px) {
          .hero-photo {
            max-width: 280px;
          }
          .hero-sticker {
            left: 0 !important;
            bottom: -4% !important;
          }
        }
      `}</style>
    </section>
  );
}
