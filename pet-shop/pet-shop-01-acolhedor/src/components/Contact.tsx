import { business } from "../content";
import { whatsappHref } from "../lib/whatsapp";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

const items = [
  { label: "Endereço", value: business.address },
  {
    label: "Telefone",
    value: business.phoneDisplay,
    href: `tel:+${business.whatsappNumber}`,
  },
  {
    label: "Horário",
    value: business.hours,
  },
  { label: "Instagram", value: business.instagram, muted: true },
];

export function Contact() {
  return (
    <section id="contato" className="section section--alt">
      <div className="container">
        <SectionTitle eyebrow="Fale com a gente" lines={["Contato"]} />

        <div className="contact-grid">
          <Reveal direction="left">
            <div>
              <p style={{ fontSize: 18, marginBottom: 28, maxWidth: 420 }}>
                Vamos cuidar do seu pet com todo carinho. Chame no WhatsApp e
                agende o melhor horário.
              </p>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-shine"
                style={{ marginBottom: 32 }}
              >
                Agendar pelo WhatsApp
              </a>

              <dl className="contact-list">
                {items.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd style={{ color: item.muted ? "var(--color-text-secondary)" : undefined }}>
                      {item.href ? (
                        <a href={item.href} className="link-underline">
                          {item.value as string}
                        </a>
                      ) : Array.isArray(item.value) ? (
                        item.value.map((h) => (
                          <div key={h.days}>
                            {h.days}: {h.time}
                          </div>
                        ))
                      ) : (
                        (item.value as string)
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="contact-map card">
              <iframe
                title={`Mapa: ${business.address}`}
                src={business.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-grid {
          margin-top: 48px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: clamp(32px, 5vw, 56px);
          align-items: start;
        }
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-list dt {
          font-weight: 700;
          color: var(--color-teal);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .contact-list dd {
          margin: 4px 0 0;
        }
        .contact-map {
          overflow: hidden;
          aspect-ratio: 4 / 3;
          padding: 0;
        }
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
