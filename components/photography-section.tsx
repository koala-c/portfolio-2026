"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const photos = [
  { src: "/placeholder.svg", alt: "Golden hour mountain landscape", categoryKey: "Landscape" },
  { src: "/placeholder.svg", alt: "Urban night street scene", categoryKey: "Street" },
  { src: "/placeholder.svg", alt: "Abstract architecture detail", categoryKey: "Architecture" },
  { src: "/placeholder.svg", alt: "Atmospheric forest portrait", categoryKey: "Portrait" },
  { src: "/placeholder.svg", alt: "Vintage camera still life", categoryKey: "Still Life" },
  { src: "/placeholder.svg", alt: "Dramatic ocean seascape", categoryKey: "Landscape" },
];

export function PhotographySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { t, tCategories } = useI18n();
  const categories = tCategories("photo.categories");

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

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <button
                key={`${photo.src}-${index}`}
                type="button"
                onClick={() => setLightbox(index)}
                className="group relative aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-turquoise transition-transform duration-500 group-hover:scale-x-100" />
                <div className="absolute inset-0 bg-background/0 transition-all duration-500 group-hover:bg-background/40" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="font-mono text-xs tracking-wider text-foreground uppercase">
                    {categories[photo.categoryKey] ?? photo.categoryKey}
                  </p>
                </div>
              </button>
            ))}
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
            className="absolute top-6 right-6 z-10 text-foreground transition-colors hover:text-primary"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() =>
              setLightbox(lightbox > 0 ? lightbox - 1 : photos.length - 1)
            }
            className="absolute left-6 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            aria-label="Previous photo"
          >
            {t("photo.prev")}
          </button>

          <div className="relative mx-6 aspect-[3/2] w-full max-w-5xl">
            <Image
              src={photos[lightbox].src || "/placeholder.svg"}
              alt={photos[lightbox].alt}
              fill
              className="object-contain"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              setLightbox(lightbox < photos.length - 1 ? lightbox + 1 : 0)
            }
            className="absolute right-6 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            aria-label="Next photo"
          >
            {t("photo.next")}
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="font-mono text-xs text-muted-foreground">
              {categories[photos[lightbox].categoryKey] ?? photos[lightbox].categoryKey} - {lightbox + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

