import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

// One family for everything. The width axis lets headings run condensed,
// echoing the MIBORO wordmark, while body text stays at normal width.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — stavební firma Ostrava`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${archivo.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
