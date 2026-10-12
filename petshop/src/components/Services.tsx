import { services } from "../content";
import { SectionTitle } from "./SectionTitle";
import { Reveal, RevealGroup } from "./Reveal";
import { PawTrail } from "./PawTrail";

const icons = [
  // Banho — gota d'água
  <svg key="drop" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2.5c3.2 4.2 6.5 8.4 6.5 12.2a6.5 6.5 0 1 1-13 0c0-3.8 3.3-8 6.5-12.2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>,
  // Tosa — tesoura
  <svg key="scissors" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="6" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7.8 7.6 19 18M7.8 16.4 19 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  // Placeholder — interrogação amigável
  <svg key="q" width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9.5 9a2.5 2.5 0 1 1 3.6 2.24c-.9.45-1.6 1.1-1.6 2.16v.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="12" cy="17.5" r="1" fill="currentColor" />
  </svg>,
];

export function Services() {
  return (
    <section id="servicos" className="section section--alt">
      <div className="container">
        <PawTrail count={7} />
        <SectionTitle eyebrow="O que fazemos" lines={["Serviços"]} align="center" />

        <RevealGroup className="services-grid" style={{ marginTop: 56 }}>
          {services.map((service, i) => (
            <Reveal key={service.title} direction="up" delay={i * 0.1} rotate={i % 2 === 0 ? -1.5 : 1.5}>
              <article
                className={`service-card card ${service.isPlaceholder ? "card--placeholder" : "card--hoverable"}`}
              >
                <div
                  className="service-icon"
                  style={{
                    color: service.isPlaceholder ? "var(--color-text-secondary)" : "var(--color-teal)",
                    background: service.isPlaceholder
                      ? "rgba(92,74,59,0.08)"
                      : "rgba(44,107,102,0.1)",
                  }}
                >
                  {icons[i] ?? icons[2]}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 12,
                    color: service.isPlaceholder ? "var(--color-text-secondary)" : undefined,
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ color: "var(--color-text-secondary)" }}>{service.description}</p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.5vw, 24px);
        }
        .service-card {
          padding: clamp(28px, 3.5vw, 36px) clamp(22px, 3vw, 28px);
          height: 100%;
        }
        .service-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        @media (max-width: 900px) and (min-width: 601px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
