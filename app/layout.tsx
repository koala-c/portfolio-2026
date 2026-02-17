import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { I18nProvider } from "@/lib/i18n";
import { getCloudinaryNamedImages } from "@/lib/cloudinary";
import { withBasePath } from "@/lib/base-path";

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

export async function generateMetadata(): Promise<Metadata> {
  const namedImages = await getCloudinaryNamedImages();
  const logoIconUrl = namedImages.logoUrl ?? withBasePath("/images/logo.png");

  return {
    title: "Denise Evelyn Galloni — Desarrolladora, Fotógrafa y Violinista",
    description:
      "Portfolio de Denise Evelyn Galloni, creadora multidisciplinaria. Desarrollo software, fotografía y música con una mirada técnica y artística.",
    icons: {
      icon: logoIconUrl,
      shortcut: logoIconUrl,
      apple: logoIconUrl,
    },
    openGraph: {
      title: "Denise Evelyn Galloni — Desarrolladora, Fotógrafa y Violinista",
      description:
        "Portfolio de Denise Evelyn Galloni, creadora multidisciplinaria. Desarrollo software, fotografía y música con una mirada técnica y artística.",
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Denise Evelyn Galloni — Desarrolladora, Fotógrafa y Violinista",
      description:
        "Portfolio de Denise Evelyn Galloni, creadora multidisciplinaria. Desarrollo software, fotografía y música con una mirada técnica y artística.",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
            <AccessibilityControls />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

