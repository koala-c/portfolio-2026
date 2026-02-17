import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MarqueeBand } from "@/components/marquee-band";
import { AboutSection } from "@/components/about-section";
import { EducationSection } from "@/components/education-section";
import { QualitiesSection } from "@/components/qualities-section";
import { CodeSection } from "@/components/code-section";
import { PhotographySection } from "@/components/photography-section";
import { MusicSection } from "@/components/music-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { getCloudinaryNamedImages, getCloudinaryPhotos } from "@/lib/cloudinary";

export default async function Page() {
  const [photos, namedImages] = await Promise.all([
    getCloudinaryPhotos(),
    getCloudinaryNamedImages(),
  ]);

  const heroImageUrl = namedImages.heroPortraitUrl ?? "/images/hero-portrait.jpg";

  return (
    <main>
      <Navigation />
      <HeroSection heroImageUrl={heroImageUrl} />
      <MarqueeBand />
      <AboutSection portraitUrl={heroImageUrl} />
      <QualitiesSection />
      <EducationSection />
      <CodeSection />
      <PhotographySection photos={photos} />
      <MusicSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
