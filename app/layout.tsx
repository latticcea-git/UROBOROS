import type { Metadata } from "next";
import "./globals.css";
import GlobalShell from "./global-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://latticce.com"),
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
    images: ["/UROBOROS/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LATTICCE — Un sistema creativo",
    description: "Ideas que necesitan distintas formas para existir.",
    images: ["/UROBOROS/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body><GlobalShell>{children}</GlobalShell></body>
    </html>
  );
}
