"use client";

import { Play, Pause } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const tracks = [
  { title: "Bach - Partita No. 2", style: "Classical", duration: "Baroque" },
  { title: "Vivaldi - Summer", style: "Four Seasons", duration: "Baroque" },
  { title: "Czardas - Monti", style: "Hungarian", duration: "Romantic" },
  { title: "Piazzolla - Libertango", style: "Tango", duration: "Contemporary" },
  { title: "Meditation - Thais", style: "Massenet", duration: "Romantic" },
  { title: "Improvisation", style: "Original", duration: "Experimental" },
];

export function MusicSection() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
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
              <div className="border border-border p-6">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t("music.latestRelease")}
                </p>
                <h3 className="mt-3 text-xl font-bold text-foreground">Structures</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("music.albumDescription")}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-turquoise transition-colors hover:text-foreground uppercase"
                >
                  {t("music.listenSpotify")}
                </a>
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
            {tracks.map((track, index) => (
              <button
                key={track.title}
                type="button"
                onClick={() => setActiveTrack(activeTrack === index ? null : index)}
                className={`group flex w-full items-center justify-between border-b border-border py-5 text-left transition-all hover:bg-secondary/30 hover:px-4 ${
                  activeTrack === index ? "bg-secondary/30 px-4" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center">
                    {activeTrack === index ? (
                      <Pause className="h-4 w-4 text-primary" />
                    ) : (
                      <Play className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    )}
                  </span>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        activeTrack === index ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {track.title}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {track.style}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {track.duration}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
