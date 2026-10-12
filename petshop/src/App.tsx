import { useLenis } from "./hooks/useLenis";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WhyTheyReturn } from "./components/WhyTheyReturn";
import { Services } from "./components/Services";
import { PetGallery } from "./components/PetGallery";
import { Reviews } from "./components/Reviews";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsappFloatButton } from "./components/WhatsappFloatButton";
import { ScrollProgressBar } from "./components/ScrollProgressBar";

function App() {
  useLenis();

  return (
    <>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollProgressBar />
      <Header />
      <main id="main">
        <Hero />
        <WhyTheyReturn />
        <Services />
        <PetGallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsappFloatButton />
    </>
  );
}

export default App;
