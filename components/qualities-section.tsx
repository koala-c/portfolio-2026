"use client";

import {
  Users,
  ClipboardCheck,
  Target,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const groupIcons = [Users, ClipboardCheck, Target];

function balanceChipOrder(items: string[]) {
  const estimatedRowCapacity = 42;
  const sorted = [...items].sort((a, b) => b.length - a.length);
  const rows: string[][] = [];

  while (sorted.length > 0) {
    const first = sorted.shift()!;
    const row = [first];
    const firstWidth = first.length + 3;
    const remaining = estimatedRowCapacity - firstWidth;

    let bestFitIndex = -1;
    let bestFitLength = -1;

    for (let i = 0; i < sorted.length; i += 1) {
      const candidateLength = sorted[i].length + 3;
      if (candidateLength <= remaining && candidateLength > bestFitLength) {
        bestFitLength = candidateLength;
        bestFitIndex = i;
      }
    }

    if (bestFitIndex >= 0) {
      row.push(sorted[bestFitIndex]);
      sorted.splice(bestFitIndex, 1);
    }

    rows.push(row);
  }

  return rows;
}

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
                className="relative overflow-hidden border border-border/80 bg-card/40 px-5 py-5 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60 md:px-6 md:py-6"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-turquoise" />
                  <h3 className="font-mono text-xs tracking-wider text-foreground uppercase">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-4 space-y-1.5">
                  {balanceChipOrder(group.items).map((row, rowIndex) => (
                    <ul key={`${group.title}-row-${rowIndex}`} className="flex flex-nowrap gap-1.5">
                      {row.map((quality, qualityIndex) => (
                        <li
                          key={`${group.title}-${rowIndex}-${quality}-${qualityIndex}`}
                          className="max-w-full whitespace-nowrap rounded-full border border-border/80 bg-secondary/40 px-2.5 py-1 text-[13px] leading-5 text-muted-foreground transition-colors duration-200 hover:border-primary/50 hover:text-foreground"
                        >
                          {quality}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
