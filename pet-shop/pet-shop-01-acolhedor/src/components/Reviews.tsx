import { business, testimonials } from "../content";
import { SectionTitle } from "./SectionTitle";
import { Reveal, RevealGroup } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";

export function Reviews() {
  return (
    <section id="avaliacoes" className="section section--dark">
      <div className="container">
        <SectionTitle
          eyebrow="Confiança de verdade"
          lines={["Avaliações"]}
          align="center"
          light
        />

        <Reveal direction="scale">
          <div className="rating-summary">
            <span aria-hidden="true" className="rating-stars">
              ★★★★★
            </span>
            <div style={{ fontSize: "clamp(48px, 8vw, 72px)", fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1 }}>
              <AnimatedCounter value={business.googleRating} decimals={1} />
            </div>
            <p style={{ color: "var(--color-gold)", fontWeight: 700, marginTop: 8 }}>
              no Google ·{" "}
              <AnimatedCounter value={business.googleReviewCount} /> avaliações
            </p>
          </div>
        </Reveal>

        <RevealGroup className="testimonials-grid">
          {testimonials.map((t, i) => (
            <Reveal key={i} direction="up" delay={i * 0.1} rotate={i % 2 === 0 ? -1.5 : 1.5}>
              <blockquote className="testimonial-card">
                <svg
                  aria-hidden="true"
                  width="32"
                  height="24"
                  viewBox="0 0 32 24"
                  fill="none"
                  className="testimonial-quote-mark"
                >
                  <path
                    d="M0 24V14.7C0 6.3 4.9 1 12.6 0l1 3.6C8.8 5 6.6 8 6.4 11.4h6.2V24H0Zm17.4 0V14.7C17.4 6.3 22.3 1 30 0l1 3.6c-4.8 1.4-7 4.4-7.2 7.8H30V24H17.4Z"
                    fill="currentColor"
                  />
                </svg>
                <p style={{ fontStyle: "italic", marginBottom: 16, color: "var(--color-cream)" }}>
                  {t.quote}
                </p>
                <footer style={{ color: "var(--color-gold)", fontWeight: 700, fontSize: 14 }}>
                  {t.author}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <style>{`
        .rating-summary {
          text-align: center;
          margin: 32px 0 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .rating-stars {
          color: var(--color-gold);
          font-size: clamp(18px, 2.4vw, 22px);
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.5vw, 24px);
        }
        .testimonial-card {
          background: rgba(255, 246, 229, 0.06);
          border: 1px solid rgba(255, 246, 229, 0.14);
          border-radius: var(--radius-card);
          padding: clamp(24px, 3vw, 28px) clamp(20px, 3vw, 24px);
          margin: 0;
          height: 100%;
          position: relative;
          transition: transform 0.35s var(--ease-enter), border-color 0.35s var(--ease-enter);
        }
        .testimonial-card:hover {
          transform: translateY(-6px);
          border-color: rgba(240, 176, 58, 0.4);
        }
        .testimonial-quote-mark {
          color: var(--color-gold);
          opacity: 0.5;
          margin-bottom: 12px;
        }
        @media (max-width: 900px) and (min-width: 601px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
