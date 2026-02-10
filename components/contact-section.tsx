"use client";

import { Github, Instagram, Mail, Music } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/koala-c/", icon: Github },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Spotify", href: "#", icon: Music },
  { label: "Email", href: "mailto:hello@denisegalloni.com", icon: Mail },
];

export function ContactSection() {
  const { t } = useI18n();

  return (
    <section id="contact" className="border-t border-border py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left */}
          <div>
            <p className="font-mono text-xs tracking-widest text-primary uppercase">
              {t("contact.label")}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              {t("contact.heading")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("contact.description")}
            </p>

            <div className="mt-10 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex h-12 w-12 items-center justify-center border border-border text-muted-foreground transition-all hover:border-turquoise hover:text-turquoise"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Contact info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t("contact.email")}
                </p>
                <a
                  href="mailto:hello@denisegalloni.com"
                  className="mt-2 block text-lg text-foreground transition-colors hover:text-primary"
                >
                  hello@denisegalloni.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t("contact.location")}
                </p>
                <p className="mt-2 text-lg text-foreground">
                  {t("contact.locationValue")}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t("contact.availability")}
                </p>
                <p className="mt-2 text-lg text-foreground">
                  {t("contact.availabilityValue")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
