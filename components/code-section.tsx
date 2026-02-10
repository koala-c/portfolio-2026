"use client";

import { ExternalLink, Linkedin, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const projectMeta = [
  { tags: ["Ionic", "Angular", "React Native", "Firebase"], link: "#" },
  { tags: ["Flutter", "Figma", "UI/UX"], link: "#" },
  { tags: ["Ionic", "Angular", ".NET MAUI", "ERP"], link: "#" },
  { tags: ["Hardware", "Software", "Customer Service"], link: "#" },
];

export function CodeSection() {
  const { t, tArray } = useI18n();
  const projectTranslations = tArray("code.projects");
  const projectMetaTranslations = tArray("code.meta");

  return (
    <section id="code" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              {t("code.label")}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("code.heading")}
            </h2>
          </div>
          <a
            href="https://www.linkedin.com/in/denise-evelyn-galloni"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary uppercase md:flex"
          >
            <Linkedin className="h-4 w-4" />
            {t("code.github")}
          </a>
        </div>

        <div className="mt-16 space-y-0">
          {projectMeta.map((project, index) => {
            const translated = projectTranslations[index];
            const meta = projectMetaTranslations[index];
            return (
              <a
                key={translated?.title ?? index}
                href={project.link}
                className="group flex flex-col gap-4 border-t border-border py-8 transition-all first:border-t-0 hover:bg-secondary/50 md:flex-row md:items-center md:gap-8 md:px-6 md:py-10"
              >
                <span className="font-mono text-xs text-turquoise">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary md:text-2xl">
                    {translated?.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {translated?.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border px-3 py-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-1 font-mono text-xs text-muted-foreground">
                  <span>{meta?.year}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {meta?.location}
                  </span>
                </div>

                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
