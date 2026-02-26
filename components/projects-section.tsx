"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { ExternalLink } from "lucide-react";

type TranslationKey = Parameters<ReturnType<typeof useI18n>["t"]>[0];

type Project = {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  url: string;
  previewUrl: string;
  tags?: string[];
};

const projects: Project[] = [
  {
    titleKey: "projects.calendarFlair.title",
    descriptionKey: "projects.calendarFlair.description",
    url: "https://koala-c.github.io/calendar-flair-archive/",
    previewUrl: "projects/calendar-flair-preview.png",
    tags: ["web", "archive"],
  },
  {
    titleKey: "projects.bookClub.title",
    descriptionKey: "projects.bookClub.description",
    url: "https://book-club-lc.onrender.com/join",
    previewUrl: "projects/book-club-preview.png",
    tags: ["web", "app"],
  },
];

export function ProjectsSection() {
  const { t } = useI18n();

  return (
    <section id="projects" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          {t("projects.label")}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("projects.heading")}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("projects.description")}
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`${t(project.titleKey)} - ${t("projects.visitProject")}`}
            >
              {/* Preview Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.previewUrl}
                  alt={t(project.titleKey)}
                  fill
                  className="object-cover object-top grayscale brightness-75 transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>

              {/* Barra superior teal */}
              <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-turquoise transition-transform duration-500 group-hover:scale-x-100" />

              {/* Overlay teal */}
              <div className="absolute inset-0 bg-turquoise/50 transition-all duration-500 group-hover:bg-transparent" />

              {/* Información del proyecto */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-6 pt-12">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(project.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {t(project.descriptionKey)}
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 flex-shrink-0 text-turquoise opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
