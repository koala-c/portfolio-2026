"use client";

import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-8">
        <p className="font-mono text-xs text-muted-foreground">
          {"Â© 2026 Denise Evelyn Galloni. "}{t("footer.rights")}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {t("footer.builtWith")}
        </p>
      </div>
    </footer>
  );
}

