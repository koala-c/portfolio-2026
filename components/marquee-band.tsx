"use client";

import { useI18n } from "@/lib/i18n";

export function MarqueeBand() {
  const { t } = useI18n();
  const items = t("marquee.items")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="overflow-hidden border-y border-border bg-secondary py-4">
      <div className="animate-marquee flex w-max gap-8">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-mono text-xs tracking-widest text-muted-foreground whitespace-nowrap uppercase"
          >
            <span>{item}</span>
            <span className="text-turquoise" aria-hidden="true">
              {"//"}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
