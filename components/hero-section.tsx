"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-portrait.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div className="max-w-3xl">
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

