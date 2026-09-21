import type { Metadata } from "next";
import "./globals.css";
import DynamicTabTitle from "./dynamic-tab-title";
import GlobalShell from "./global-shell";
import { metadataBase, publicUrl, socialImage } from "./site-metadata";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "LATTICCE — Un sistema creativo",
    template: "%s",
  },
  description:
    "Estrategia, diseño, imagen, sonido y memoria trabajando como un solo sistema creativo.",
  openGraph: {
    title: "LATTICCE — Un sistema creativo",
    description: "Ideas que necesitan distintas formas para existir.",
    siteName: "LATTICCE",
    locale: "es_MX",
    type: "website",
    images: [socialImage("/og.png", "LATTICCE — Un sistema creativo")],
  },
  twitter: {
    card: "summary_large_image",
    title: "LATTICCE — Un sistema creativo",
    description: "Ideas que necesitan distintas formas para existir.",
    images: [publicUrl("/og.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <DynamicTabTitle />
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
