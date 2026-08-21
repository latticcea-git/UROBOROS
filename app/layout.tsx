import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LATTICCE Studio — Foto + video comercial",
  description:
    "Producción fotográfica y audiovisual para marcas, artistas y espacios. Historias reales. Imágenes poderosas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
