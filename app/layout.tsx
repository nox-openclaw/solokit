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
  title: "SoloKit — Gratis værktøjer til danske freelancere",
  description:
    "Beregn moms, timepris og lav fakturaer gratis. Det komplette toolkit til selvstændige og freelancere i Danmark.",
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
    title: "SoloKit — Gratis værktøjer til danske freelancere",
    description:
      "Beregn moms, timepris og lav fakturaer gratis. Det komplette toolkit til selvstændige og freelancere i Danmark.",
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
