import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MarqueeBand } from "@/components/marquee-band";
import { AboutSection } from "@/components/about-section";
import { CodeSection } from "@/components/code-section";
import { PhotographySection } from "@/components/photography-section";
import { MusicSection } from "@/components/music-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <MarqueeBand />
      <AboutSection />
      <CodeSection />
      <PhotographySection />
      <MusicSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
