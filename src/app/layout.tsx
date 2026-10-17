import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Tipografía premium: Playfair Display para títulos (estilo editorial de lujo)
// Inter para cuerpo con excelente legibilidad en pantallas
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  displaySwap: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VELoCE Motors | Concesionaria de Autos de Lujo",
  description: "Descubra nuestra exclusiva selección de vehículos de lujo. Tesla, Porsche, Lucid y más.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased scroll-smooth`}>
      <body 
        className={`min-h-full flex flex-col font-sans bg-black text-white transition-colors duration-500`}
        style={{
          '--font-primary': `"${inter.style.fontFamily}"`,
          '--font-secondary': `"${playfairDisplay.style.fontFamily}"`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
