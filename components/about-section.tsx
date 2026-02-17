"use client";

import { type SyntheticEvent } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";

type AboutSectionProps = {
  portraitUrl?: string;
};

export function AboutSection({ portraitUrl = withBasePath("/images/hero-portrait.jpg") }: AboutSectionProps) {
  const { t } = useI18n();
  const preventImageActions = (event: SyntheticEvent) => event.preventDefault();

  return (
    <section id="about" className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={portraitUrl}
              alt={t("about.portrait")}
              fill
              draggable={false}
              onContextMenu={preventImageActions}
              onDragStart={preventImageActions}
              className="protect-portfolio-image object-cover object-[20%_18%]"
            />
            <span
              className="pointer-events-auto absolute inset-0 z-[1]"
              onContextMenu={preventImageActions}
              onDragStart={preventImageActions}
              aria-hidden="true"
            />
            <div className="absolute inset-0 border border-border" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              {t("about.label")}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
              {t("about.heading")}
            </h2>
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-8 border-t border-border pt-10">
              <div>
                <p className="font-mono text-2xl font-bold text-turquoise">2+</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground uppercase">
                  {t("about.yearsDev")}
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-turquoise">5+</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground uppercase">
                  {t("about.projectsBuilt")}
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-turquoise">4</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground uppercase">
                  {t("about.languages")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
