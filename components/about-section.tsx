"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/hero-portrait.jpg"
              alt={t("about.portrait")}
              fill
              className="object-cover"
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
                <p className="font-mono text-2xl font-bold text-coral">3+</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground uppercase">
                  {t("about.yearsDev")}
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-turquoise">10+</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground uppercase">
                  {t("about.projectsBuilt")}
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-coral">5</p>
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
