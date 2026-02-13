import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Denise Evelyn Galloni — Desarrolladora, Fotógrafa y Violinista",
  description:
    "Portfolio de Denise Evelyn Galloni — una creadora multidisciplinar que trabaja en la intersección entre código, luz y sonido.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Denise Evelyn Galloni — Desarrolladora, Fotógrafa y Violinista",
    description:
      "Portfolio de Denise Evelyn Galloni — una creadora multidisciplinar que trabaja en la intersección entre código, luz y sonido.",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denise Evelyn Galloni — Desarrolladora, Fotógrafa y Violinista",
    description:
      "Portfolio de Denise Evelyn Galloni — una creadora multidisciplinar que trabaja en la intersección entre código, luz y sonido.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

