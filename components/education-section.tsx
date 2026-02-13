"use client";

import { GraduationCap, BookOpen, Users, Award, Car, CircleHelp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const educationIcons = [GraduationCap, BookOpen, Users, Award];

export function EducationSection() {
  const { t, tArray } = useI18n();
  const studies = tArray("education.items");

  return (
    <section id="education" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          {t("education.label")}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("education.heading")}
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study, index) => {
            const Icon = educationIcons[index] ?? GraduationCap;
            const isComplementary = index === 3;
            const titleMatch = study.title.match(/^(.*?)\s*\((.*?)\)\s*$/);
            const mainTitle = titleMatch ? titleMatch[1] : study.title;
            const institution = titleMatch ? titleMatch[2] : "";
            const lines = study.description
              .split("\n")
              .map((line) => line.trim())
              .filter(Boolean);
            return (
              <article
                key={`${study.title}-${index}`}
                className="border border-border p-6 transition-colors hover:border-primary/60 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" />
                    <div>
                      <h3 className="text-lg font-bold leading-snug text-foreground md:text-xl">
                        {mainTitle}
                      </h3>
                      {institution ? (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {institution}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {lines.map((line, lineIndex) => (
                    <li
                      key={`${study.title}-${lineIndex}`}
                      className="border-l border-border pl-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      {(() => {
                        const [text, year] = line.split(" / ");
                        const equivalenceMatch = text.match(/^(.*)\s\((EQF.*)\)$/);
                        const mainText = equivalenceMatch ? equivalenceMatch[1] : text;
                        const equivalence = equivalenceMatch ? equivalenceMatch[2] : null;
                        return (
                          <div className="flex items-start justify-between gap-4">
                            <span className="flex items-start gap-2">
                              {isComplementary ? (
                                <Car className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                              ) : null}
                              <span>{mainText}</span>
                              {equivalence ? (
                                <span
                                  className="group relative mt-0.5 inline-flex cursor-help items-center text-muted-foreground"
                                  title={equivalence}
                                >
                                  <CircleHelp className="h-3.5 w-3.5" />
                                  <span className="pointer-events-none absolute top-full left-0 z-20 mt-2 hidden w-72 border border-border bg-background p-2 text-xs leading-relaxed text-muted-foreground shadow-lg group-hover:block">
                                    {equivalence}
                                  </span>
                                </span>
                              ) : null}
                            </span>
                            {year ? (
                              <span className="shrink-0 font-mono text-[11px] tracking-wide text-muted-foreground">
                                {year}
                              </span>
                            ) : null}
                          </div>
                        );
                      })()}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
