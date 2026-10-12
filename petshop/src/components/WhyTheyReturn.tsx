import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion as useMotionReducedMotion,
} from "motion/react";
import { whyTheyReturn } from "../content";
import { SectionTitle } from "./SectionTitle";
import { Reveal, RevealGroup } from "./Reveal";

function StickyCard({
  index,
  total,
  title,
  description,
  progress,
}: {
  index: number;
  total: number;
  title: string;
  description: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const y = useTransform(progress, [start, end], [80, 0]);
  const scale = useTransform(progress, [start, end], [0.94, 1]);
  const rotate = useTransform(progress, [start, end], [index % 2 === 0 ? -2 : 2, 0]);

  return (
    <motion.article
      style={{
        position: "sticky",
        top: 140,
        y,
        scale,
        rotate,
        background: "var(--color-cream)",
        border: "1px solid rgba(43,29,20,0.08)",
        borderRadius: "var(--radius-card)",
        padding: "40px 36px",
        boxShadow: "0 20px 40px rgba(43,29,20,0.12)",
        marginBottom: 24,
      }}
    >
      <h3 style={{ fontSize: 24, marginBottom: 12 }}>{title}</h3>
      <p style={{ color: "var(--color-text-secondary)", fontSize: 16 }}>
        {description}
      </p>
    </motion.article>
  );
}

export function WhyTheyReturn() {
  const prefersReduced = useMotionReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const useStickyEffect = !prefersReduced;

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Por que confiar"
          lines={["Por que os tutores", "voltam"]}
        />

        {useStickyEffect ? (
          <div
            ref={containerRef}
            className="why-sticky-container"
            style={{ marginTop: 56, height: `${whyTheyReturn.length * 70}vh` }}
          >
            {whyTheyReturn.map((item, i) => (
              <StickyCard
                key={item.title}
                index={i}
                total={whyTheyReturn.length}
                title={item.title}
                description={item.description}
                progress={scrollYProgress}
              />
            ))}
          </div>
        ) : (
          <RevealGroup
            className="why-cascade"
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {whyTheyReturn.map((item, i) => (
              <Reveal key={item.title} direction="up" rotate={i % 2 === 0 ? -2 : 2}>
                <article
                  style={{
                    background: "var(--color-cream)",
                    border: "1px solid rgba(43,29,20,0.08)",
                    borderRadius: "var(--radius-card)",
                    padding: "32px 28px",
                    height: "100%",
                  }}
                >
                  <h3 style={{ fontSize: 22, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "var(--color-text-secondary)" }}>
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-sticky-container {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .why-cascade {
            display: none !important;
          }
        }
        @media (max-width: 900px) and (min-width: 601px) {
          .why-cascade {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .why-cascade {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
