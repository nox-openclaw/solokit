import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solokit.dk — Gratis værktøjer til danske freelancere",
  description:
    "Beregn moms, timepris, faktura og B-skat. Gratis online værktøjer til freelancere og soloselvstændige i Danmark.",
  keywords: [
    "freelancer",
    "soloselvstændig",
    "momsberegner",
    "timeprisberegner",
    "faktura",
    "B-skat",
    "Danmark",
    "gratis værktøjer",
  ],
  openGraph: {
    title: "Solokit.dk — Gratis værktøjer til danske freelancere",
    description:
      "Beregn moms, timepris, faktura og B-skat. Gratis online værktøjer til freelancere og soloselvstændige i Danmark.",
    locale: "da_DK",
    type: "website",
    url: "https://solokit.dk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
