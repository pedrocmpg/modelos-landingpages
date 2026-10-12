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
import { useMediaQuery } from "../hooks/useMediaQuery";

const icons = [
  // Cuidado com cada pet — coração de pata
  <svg key="heart" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20s-7.5-4.6-9.6-9.4C1.1 7.6 3 4.8 6.2 4.8c1.9 0 3.4 1 5.8 3.4 2.4-2.4 3.9-3.4 5.8-3.4 3.2 0 5.1 2.8 3.8 5.8C19.5 15.4 12 20 12 20Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>,
  // Cheirinho e capricho — estrela/brilho
  <svg key="sparkle" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3.5c.6 3.4 1.5 5 5 6.5-3.5 1.5-4.4 3.1-5 6.5-.6-3.4-1.5-5-5-6.5 3.5-1.5 4.4-3.1 5-6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M18.5 16.5c.3 1.6.7 2.3 2.3 2.8-1.6.5-2 1.2-2.3 2.8-.3-1.6-.7-2.3-2.3-2.8 1.6-.5 2-1.2 2.3-2.8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>,
  // Atendimento de confiança — escudo
  <svg key="shield" width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3.5 19 6v5.5c0 4.8-3.2 8-7 9.5-3.8-1.5-7-4.7-7-9.5V6l7-2.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 12.2 11.2 14.4 15.3 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

function CardBody({ index, title, description }: { index: number; title: string; description: string }) {
  return (
    <>
      <div className="why-card-top">
        <div className="why-icon">{icons[index] ?? icons[0]}</div>
        <span className="why-index" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
      <h3 style={{ fontSize: "clamp(20px, 2.4vw, 24px)", marginBottom: 12 }}>{title}</h3>
      <p style={{ color: "var(--color-text-secondary)", fontSize: 16 }}>{description}</p>
    </>
  );
}

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
      className="why-card card"
      style={{
        position: "sticky",
        top: 140,
        y,
        scale,
        rotate,
        marginBottom: 24,
      }}
    >
      <CardBody index={index} title={title} description={description} />
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

  const isWideEnough = useMediaQuery("(min-width: 901px)");
  const useStickyEffect = !prefersReduced && isWideEnough;

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
            <div className="why-sticky-inner">
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
          </div>
        ) : (
          <RevealGroup className="why-cascade" style={{ marginTop: 56 }}>
            {whyTheyReturn.map((item, i) => (
              <Reveal key={item.title} direction="up" rotate={i % 2 === 0 ? -2 : 2}>
                <article className="why-card card card--hoverable">
                  <CardBody index={i} title={item.title} description={item.description} />
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        )}
      </div>

      <style>{`
        .why-sticky-inner {
          max-width: 640px;
          height: 100%;
          margin: 0 auto;
        }
        .why-card {
          padding: clamp(28px, 4vw, 40px) clamp(24px, 4vw, 36px);
        }
        .why-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .why-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: rgba(240, 176, 58, 0.16);
          color: var(--color-gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .why-index {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          color: rgba(43, 29, 20, 0.22);
          letter-spacing: 0.05em;
        }
        .why-cascade {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.5vw, 24px);
        }
        .why-cascade .why-card {
          height: 100%;
        }
        @media (max-width: 900px) and (min-width: 601px) {
          .why-cascade {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .why-cascade {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
