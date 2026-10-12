import { services } from "../content";
import { SectionTitle } from "./SectionTitle";
import { Reveal, RevealGroup } from "./Reveal";
import { PawTrail } from "./PawTrail";

export function Services() {
  return (
    <section id="servicos" className="section section--alt">
      <div className="container">
        <PawTrail count={7} />
        <SectionTitle eyebrow="O que fazemos" lines={["Serviços"]} align="center" />

        <RevealGroup
          className="services-grid"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {services.map((service, i) => (
            <Reveal key={service.title} direction="up" delay={i * 0.1}>
              <article
                style={{
                  background: "var(--color-cream)",
                  borderRadius: "var(--radius-card)",
                  padding: "36px 28px",
                  height: "100%",
                  border: service.isPlaceholder
                    ? "1.5px dashed var(--color-text-secondary)"
                    : "1px solid rgba(43,29,20,0.06)",
                  transition: "transform 0.3s var(--ease-enter), box-shadow 0.3s var(--ease-enter)",
                }}
                className="service-card"
              >
                <h3 style={{ fontSize: 22, marginBottom: 12, color: service.isPlaceholder ? "var(--color-text-secondary)" : undefined }}>
                  {service.title}
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <style>{`
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(43,29,20,0.14);
        }
        @media (max-width: 900px) and (min-width: 601px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
