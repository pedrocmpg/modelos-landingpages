import { petGallery } from "../content";
import { SectionTitle } from "./SectionTitle";
import { Reveal, RevealGroup } from "./Reveal";

export function PetGallery() {
  return (
    <section id="pets" className="section">
      <div className="container">
        <SectionTitle eyebrow="Nossa clientela" lines={["Clientes de quatro", "patas"]} />

        <RevealGroup className="pet-gallery-grid" style={{ marginTop: 48 }}>
          {petGallery.map((pet, i) => (
            <Reveal key={pet.alt} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <div className="pet-photo-card">
                <div className="pet-photo-inner" aria-label={pet.alt} role="img">
                  <span>{pet.alt}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <style>{`
        .pet-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .pet-photo-card {
          border-radius: var(--radius-card-sm);
          overflow: hidden;
          aspect-ratio: 1 / 1;
        }
        .pet-photo-inner {
          width: 100%;
          height: 100%;
          background: var(--color-bg-alt);
          border: 1.5px dashed var(--color-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 12px;
          color: var(--color-text-secondary);
          font-size: 13px;
          font-weight: 600;
          transition: transform 0.35s var(--ease-enter);
          border-radius: var(--radius-card-sm);
        }
        .pet-photo-card:hover .pet-photo-inner {
          transform: scale(1.05);
        }

        @media (max-width: 900px) {
          .pet-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .pet-gallery-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 16px;
            padding-bottom: 8px;
            margin: 48px -20px 0;
            padding-left: 20px;
            padding-right: 20px;
          }
          .pet-gallery-grid > * {
            flex: 0 0 78vw;
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
}
