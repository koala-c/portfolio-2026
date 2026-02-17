"use client";

import { useEffect, useRef, useState, type SyntheticEvent, type TouchEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import type { PortfolioPhoto } from "@/lib/cloudinary";
import { withBasePath } from "@/lib/base-path";

const PLACEHOLDER_IMAGE = withBasePath("/placeholder.svg");

const fallbackPhotos: PortfolioPhoto[] = [
  { src: PLACEHOLDER_IMAGE, alt: "Golden hour mountain landscape", categoryKey: "Landscape" },
  { src: PLACEHOLDER_IMAGE, alt: "Urban night street scene", categoryKey: "Street" },
  { src: PLACEHOLDER_IMAGE, alt: "Abstract architecture detail", categoryKey: "Architecture" },
  { src: PLACEHOLDER_IMAGE, alt: "Atmospheric forest portrait", categoryKey: "Portrait" },
  { src: PLACEHOLDER_IMAGE, alt: "Vintage camera still life", categoryKey: "Still Life" },
  { src: PLACEHOLDER_IMAGE, alt: "Dramatic ocean seascape", categoryKey: "Landscape" },
];

type PhotographySectionProps = {
  photos?: PortfolioPhoto[];
};

export function PhotographySection({ photos = fallbackPhotos }: PhotographySectionProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [failedSources, setFailedSources] = useState<Record<string, boolean>>({});
  const touchStartXRef = useRef<number | null>(null);
  const { t, tCategories } = useI18n();
  const categories = tCategories("photo.categories");
  const galleryPhotos = photos.length > 0 ? photos : fallbackPhotos;

  useEffect(() => {
    if (!carouselApi || !isAutoPlay) return;

    const timer = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, [carouselApi, isAutoPlay]);

  const handlePrevManual = () => {
    setIsAutoPlay(false);
    carouselApi?.scrollPrev();
  };

  const handleNextManual = () => {
    setIsAutoPlay(false);
    carouselApi?.scrollNext();
  };

  const resumeAutoPlay = () => {
    setIsAutoPlay(true);
  };

  const preventImageActions = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleImageError = (src: string) => {
    if (!src || src === PLACEHOLDER_IMAGE) return;
    setFailedSources((previous) => ({ ...previous, [src]: true }));
  };

  const resolveImageSrc = (src: string) => {
    if (!src || failedSources[src]) return PLACEHOLDER_IMAGE;
    return src;
  };

  const goToPreviousPhoto = () => {
    setLightbox((current) => {
      if (current === null) return current;
      return current > 0 ? current - 1 : galleryPhotos.length - 1;
    });
  };

  const goToNextPhoto = () => {
    setLightbox((current) => {
      if (current === null) return current;
      return current < galleryPhotos.length - 1 ? current + 1 : 0;
    });
  };

  const handleLightboxTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleLightboxTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) < 40) return;
    if (deltaX > 0) {
      goToPreviousPhoto();
      return;
    }
    goToNextPhoto();
  };

  useEffect(() => {
    const handleWindowScroll = () => setIsAutoPlay(true);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPreviousPhoto();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextPhoto();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setLightbox(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, galleryPhotos.length]);

  useEffect(() => {
    if (lightbox === null || galleryPhotos.length === 0 || typeof window === "undefined") return;

    const nextIndex = lightbox < galleryPhotos.length - 1 ? lightbox + 1 : 0;
    const prevIndex = lightbox > 0 ? lightbox - 1 : galleryPhotos.length - 1;

    const preload = (src?: string) => {
      if (!src) return;
      const img = new window.Image();
      img.src = resolveImageSrc(src);
    };

    preload(galleryPhotos[nextIndex]?.fullSrc ?? galleryPhotos[nextIndex]?.src);
    preload(galleryPhotos[prevIndex]?.fullSrc ?? galleryPhotos[prevIndex]?.src);
  }, [lightbox, galleryPhotos, failedSources]);

  useEffect(() => {
    if (lightbox === null || galleryPhotos.length === 0 || typeof window === "undefined") return;

    const timer = window.setTimeout(() => {
      for (let index = 0; index < galleryPhotos.length; index += 1) {
        if (index === lightbox) continue;
        const src = galleryPhotos[index]?.fullSrc ?? galleryPhotos[index]?.src;
        if (!src) continue;
        const img = new window.Image();
        img.src = resolveImageSrc(src);
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [lightbox, galleryPhotos, failedSources]);

  return (
    <>
      <section id="photography" className="border-t border-border py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            {t("photo.label")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("photo.heading")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("photo.description")}
          </p>

          <div className="mt-16 px-10 md:px-12">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              onWheelCapture={resumeAutoPlay}
              onTouchMoveCapture={resumeAutoPlay}
              onPointerDownCapture={resumeAutoPlay}
            >
              <CarouselContent>
                {galleryPhotos.map((photo, index) => (
                  <CarouselItem key={`${photo.src}-${index}`} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <button
                      type="button"
                      onClick={() => setLightbox(index)}
                      onContextMenu={preventImageActions}
                      onDragStart={preventImageActions}
                      className="group relative aspect-[4/3] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Image
                        src={resolveImageSrc(photo.src)}
                        alt={photo.alt}
                        fill
                        draggable={false}
                        onError={() => handleImageError(photo.src)}
                        className="protect-portfolio-image object-cover grayscale brightness-75 transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                      />
                      <span className="pointer-events-auto absolute inset-0 z-10" aria-hidden="true" />
                      <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-turquoise transition-transform duration-500 group-hover:scale-x-100" />
                      <div className="absolute inset-0 bg-turquoise/50 transition-all duration-500 group-hover:bg-transparent" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handlePrevManual}
                className="-left-9 absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-none border-border bg-background text-foreground hover:bg-secondary md:-left-10"
                aria-label="Previous slide"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleNextManual}
                className="-right-9 absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-none border-border bg-background text-foreground hover:bg-secondary md:-right-10"
                aria-label="Next slide"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 z-30 flex h-10 w-10 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={goToPreviousPhoto}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary md:left-6"
            aria-label="Previous photo"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div
            className="relative mx-6 aspect-[3/2] w-full max-w-5xl"
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <Image
              src={resolveImageSrc(galleryPhotos[lightbox].fullSrc ?? galleryPhotos[lightbox].src)}
              alt={galleryPhotos[lightbox].alt}
              fill
              priority
              loading="eager"
              sizes="100vw"
              draggable={false}
              onError={() => handleImageError(galleryPhotos[lightbox].fullSrc ?? galleryPhotos[lightbox].src)}
              onContextMenu={preventImageActions}
              onDragStart={preventImageActions}
              className="protect-portfolio-image object-contain"
            />
            <span
              className="pointer-events-none absolute inset-0 z-10"
              aria-hidden="true"
            />
          </div>

          <button
            type="button"
            onClick={goToNextPhoto}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-secondary md:right-6"
            aria-label="Next photo"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="font-mono text-xs text-muted-foreground">
              {lightbox + 1} / {galleryPhotos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

