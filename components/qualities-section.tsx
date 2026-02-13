"use client";

import {
  MessageCircle,
  Eye,
  Users,
  Zap,
  Sparkles,
  Lightbulb,
  ClipboardCheck,
  Target,
  ShieldCheck,
  Search,
  Rocket,
  Brain,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const icons = [
  MessageCircle,
  Eye,
  Users,
  Zap,
  Sparkles,
  Lightbulb,
  ClipboardCheck,
  Target,
  ShieldCheck,
  Search,
  Rocket,
  Brain,
];

export function QualitiesSection() {
  const { t } = useI18n();
  const qualities = t("qualities.list")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualities.map((quality, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article
                key={`${quality}-${index}`}
                className="flex items-start gap-3 border border-border p-4"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" />
                <p className="text-sm leading-relaxed text-muted-foreground">{quality}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
