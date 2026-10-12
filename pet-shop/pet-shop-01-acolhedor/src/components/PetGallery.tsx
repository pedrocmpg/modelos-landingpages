import { petGallery } from "../content";
import { SectionTitle } from "./SectionTitle";
import { Reveal, RevealGroup } from "./Reveal";

export function PetGallery() {
  return (
    <section id="pets" className="section">
      <div className="container">
        <SectionTitle eyebrow="Nossa clientela" lines={["Clientes de quatro", "patas"]} />
      </div>

      <div className="pet-gallery-viewport">
        <RevealGroup className="pet-gallery-grid">
          {petGallery.map((pet, i) => (
            <Reveal
              key={pet.src}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 0.08}
              className="pet-gallery-item"
            >
              <div className="pet-photo-card card card--hoverable">
                <img className="pet-photo-inner" src={pet.src} alt={pet.alt} loading="lazy" />
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <style>{`
        .pet-gallery-viewport {
          margin-top: 48px;
          width: 100%;
        }
        .pet-gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 2vw, 20px);
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 var(--container-pad);
        }
        .pet-photo-card {
          border-radius: var(--radius-card-sm);
          overflow: hidden;
          aspect-ratio: 1 / 1;
          box-shadow: none;
          border-color: rgba(43, 29, 20, 0.06);
        }
        .pet-photo-inner {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s var(--ease-enter);
          border-radius: var(--radius-card-sm);
        }
        .pet-photo-card:hover .pet-photo-inner {
          transform: scale(1.06);
        }

        @media (max-width: 900px) {
          .pet-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .pet-gallery-grid {
            display: flex;
            width: 100%;
            max-width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 14px;
            padding-left: var(--container-pad);
            padding-right: var(--container-pad);
            padding-bottom: 8px;
          }
          .pet-gallery-item {
            flex: 0 0 auto;
            width: 72vw;
            max-width: 320px;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
