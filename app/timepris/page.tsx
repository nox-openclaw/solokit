import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Timeprisberegner from "../components/Timeprisberegner";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Timeprisberegner — Beregn din timepris | SoloKit",
  description:
    "Gratis timeprisberegner for freelancere. Beregn den rigtige timepris baseret på din ønskede månedsløn, arbejdstimer og overhead.",
  openGraph: {
    title: "Timeprisberegner — Beregn din timepris | SoloKit",
    description:
      "Gratis timeprisberegner for freelancere. Beregn den rigtige timepris baseret på din ønskede månedsløn, arbejdstimer og overhead.",
    locale: "da_DK",
    type: "website",
    url: "https://solokit.dk/timepris",
  },
};

export default function TimeprisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <Timeprisberegner />
      </main>
      <Footer />
    </div>
  );
}
