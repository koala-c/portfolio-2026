import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MarqueeBand } from "@/components/marquee-band";
import { AboutSection } from "@/components/about-section";
import { EducationSection } from "@/components/education-section";
import { QualitiesSection } from "@/components/qualities-section";
import { CodeSection } from "@/components/code-section";
import { ProjectsSection } from "@/components/projects-section";
import { PhotographySection } from "@/components/photography-section";
import { MusicSection } from "@/components/music-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { getCloudinaryNamedImages, getCloudinaryPhotos } from "@/lib/cloudinary";
import { withBasePath } from "@/lib/base-path";

export default async function Page() {
  const [photos, namedImages] = await Promise.all([
    getCloudinaryPhotos(),
    getCloudinaryNamedImages(),
  ]);

  const heroImageUrl = namedImages.heroPortraitUrl ?? withBasePath("/images/hero-portrait.jpg");

  return (
    <main>
      <Navigation />
      <HeroSection heroImageUrl={heroImageUrl} />
      <MarqueeBand />
      <AboutSection portraitUrl={heroImageUrl} />
      <QualitiesSection />
      <EducationSection />
      <CodeSection />
      <ProjectsSection />
      <PhotographySection photos={photos} />
      <MusicSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
