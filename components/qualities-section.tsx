"use client";

import {
  Users,
  ClipboardCheck,
  Target,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const groupIcons = [Users, ClipboardCheck, Target];

export function QualitiesSection() {
  const { t } = useI18n();
  const qualities = t("qualities.list")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  const groups = [
    { title: t("qualities.group1"), items: qualities.slice(0, 6), Icon: groupIcons[0] },
    { title: t("qualities.group2"), items: qualities.slice(6, 12), Icon: groupIcons[1] },
    { title: t("qualities.group3"), items: qualities.slice(12), Icon: groupIcons[2] },
  ];

  return (
    <section id="qualities" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          {t("qualities.label")}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("qualities.heading")}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {t("qualities.description")}
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {groups.map((group, index) => {
            const Icon = group.Icon;
            return (
              <article
                key={`qualities-group-${index}`}
                className="relative overflow-hidden border border-border/80 bg-card/40 px-5 py-5 backdrop-blur-sm md:px-6 md:py-6"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-turquoise" />
                  <h3 className="font-mono text-xs tracking-wider text-foreground uppercase">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((quality, qualityIndex) => (
                    <li
                      key={`${group.title}-${quality}-${qualityIndex}`}
                      className="max-w-full whitespace-nowrap rounded-full border border-border/80 bg-secondary/40 px-2.5 py-1 text-[13px] leading-5 text-muted-foreground transition-colors duration-200 hover:border-primary/50 hover:text-foreground"
                    >
                      {quality}
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
