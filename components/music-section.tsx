"use client";

import { useI18n } from "@/lib/i18n";

export function MusicSection() {
  const { t } = useI18n();

  return (
    <section id="music" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column */}
          <div>
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              {t("music.label")}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("music.heading")}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("music.description")}
            </p>

            <div className="mt-10 space-y-6">
              <div className="border border-turquoise p-6">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t("music.latestRelease")}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("music.albumDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Right column - tracklist */}
          <div>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                {t("music.trackHeader")}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                {t("music.durationHeader")}
              </span>
            </div>
            <div className="mt-4">
              <p className="font-mono text-[11px] tracking-wider text-turquoise uppercase">
                {t("music.comingSoon")}
              </p>
              <span className="inline-block" title={t("music.comingSoon")}>
                <button
                  type="button"
                  disabled
                  className="mt-2 cursor-not-allowed font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase"
                  aria-disabled="true"
                >
                  {t("music.showPieces")}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
