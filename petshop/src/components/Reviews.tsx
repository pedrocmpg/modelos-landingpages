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
          <div
            style={{
              textAlign: "center",
              margin: "40px 0 56px",
            }}
          >
            <div style={{ fontSize: "clamp(48px, 8vw, 72px)", fontFamily: "var(--font-display)", fontWeight: 600 }}>
              <AnimatedCounter value={business.googleRating} decimals={1} />
            </div>
            <p style={{ color: "var(--color-gold)", fontWeight: 700, marginTop: 8 }}>
              no Google ·{" "}
              <AnimatedCounter value={business.googleReviewCount} /> avaliações
            </p>
          </div>
        </Reveal>

        <RevealGroup
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {testimonials.map((t, i) => (
            <Reveal key={i} direction="up" delay={i * 0.1}>
              <blockquote
                style={{
                  background: "rgba(255,246,229,0.06)",
                  border: "1px solid rgba(255,246,229,0.14)",
                  borderRadius: "var(--radius-card)",
                  padding: "28px 24px",
                  margin: 0,
                  height: "100%",
                }}
              >
                <p style={{ fontStyle: "italic", marginBottom: 16, color: "var(--color-cream)" }}>
                  &ldquo;{t.quote}&rdquo;
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
        @media (max-width: 900px) and (min-width: 601px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
