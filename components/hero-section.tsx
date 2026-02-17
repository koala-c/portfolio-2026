"use client";

import { type SyntheticEvent } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

type HeroSectionProps = {
  heroImageUrl?: string;
};

export function HeroSection({ heroImageUrl = "/images/hero-portrait.jpg" }: HeroSectionProps) {
  const { t } = useI18n();
  const preventImageActions = (event: SyntheticEvent) => event.preventDefault();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImageUrl}
          alt=""
          fill
          draggable={false}
          onContextMenu={preventImageActions}
          onDragStart={preventImageActions}
          className="protect-portfolio-image object-cover object-[20%_18%] opacity-40 sm:object-[26%_17%] md:object-[36%_16%] lg:object-[40%_14%] xl:object-[38%_14%]"
          priority
        />
        <span
          className="pointer-events-auto absolute inset-0 z-[1]"
          onContextMenu={preventImageActions}
          onDragStart={preventImageActions}
          aria-hidden="true"
        />
        <div className="hero-legibility-overlay absolute inset-0 bg-gradient-to-b from-background/50 via-background/24 to-background/96" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="hero-legibility-copy max-w-3xl">
          <p className="animate-fade-in-up font-mono text-xs tracking-widest text-primary opacity-0 uppercase">
            {t("hero.tagline")}
          </p>
          <h1 className="animate-fade-in-up animation-delay-200 mt-6 text-5xl font-bold leading-tight tracking-tight text-foreground opacity-0 md:text-7xl lg:text-8xl text-balance">
            Denise Evelyn Galloni
          </h1>
          <p className="animate-fade-in-up animation-delay-400 mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground opacity-0 md:text-xl">
            {t("hero.description")}
          </p>
          <div className="animate-fade-in-up animation-delay-600 mt-10 flex gap-4 opacity-0">
            <a
              href="#code"
              className="inline-flex items-center gap-2 rounded-none border border-primary bg-primary px-6 py-3 font-mono text-xs font-bold tracking-wider text-primary-foreground transition-all hover:bg-transparent hover:text-primary uppercase"
            >
              {t("hero.viewWork")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-none border border-border px-6 py-3 font-mono text-xs font-bold tracking-wider text-foreground transition-all hover:border-turquoise hover:text-turquoise uppercase"
            >
              {t("hero.getInTouch")}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            {t("hero.scroll")}
          </span>
          <div className="h-8 w-px bg-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
}

