import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import FakturaKalkulator from "../components/FakturaKalkulator";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Fakturakalkulator — Lav fakturaer gratis | SoloKit",
  description:
    "Gratis fakturakalkulator til danske freelancere. Beregn subtotal, rabat og moms for dine fakturalinjer hurtigt og nemt.",
  openGraph: {
    title: "Fakturakalkulator — Lav fakturaer gratis | SoloKit",
    description:
      "Gratis fakturakalkulator til danske freelancere. Beregn subtotal, rabat og moms for dine fakturalinjer hurtigt og nemt.",
    locale: "da_DK",
    type: "website",
    url: "https://solokit.dk/faktura",
  },
};

export default function FakturaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <FakturaKalkulator />
      </main>
      <Footer />
    </div>
  );
}
