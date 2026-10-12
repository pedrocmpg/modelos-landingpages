import { business } from "../content";
import { whatsappHref } from "../lib/whatsapp";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contato" className="section section--alt">
      <div className="container">
        <SectionTitle eyebrow="Fale com a gente" lines={["Contato"]} />

        <div className="contact-grid" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
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

              <dl style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <dt style={{ fontWeight: 700, color: "var(--color-teal)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Endereço
                  </dt>
                  <dd style={{ margin: "4px 0 0" }}>{business.address}</dd>
                </div>
                <div>
                  <dt style={{ fontWeight: 700, color: "var(--color-teal)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Telefone
                  </dt>
                  <dd style={{ margin: "4px 0 0" }}>
                    <a href={`tel:+${business.whatsappNumber}`} className="link-underline">
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt style={{ fontWeight: 700, color: "var(--color-teal)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Horário
                  </dt>
                  <dd style={{ margin: "4px 0 0" }}>
                    {business.hours.map((h) => (
                      <div key={h.days}>
                        {h.days}: {h.time}
                      </div>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt style={{ fontWeight: 700, color: "var(--color-teal)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Instagram
                  </dt>
                  <dd style={{ margin: "4px 0 0", color: "var(--color-text-secondary)" }}>
                    {business.instagram}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div
              style={{
                borderRadius: "var(--radius-card)",
                overflow: "hidden",
                aspectRatio: "4 / 3",
                background: "var(--color-cream)",
                border: "1.5px dashed var(--color-text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-secondary)",
                fontWeight: 600,
                padding: 16,
                textAlign: "center",
              }}
            >
              {business.mapEmbedUrl}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
