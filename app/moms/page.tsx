import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Momsberegner from "../components/Momsberegner";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Momsberegner — Beregn moms gratis | SoloKit",
  description:
    "Gratis momsberegner til danske freelancere og selvstændige. Læg moms til eller træk moms fra ethvert beløb. 25% dansk moms.",
  openGraph: {
    title: "Momsberegner — Beregn moms gratis | SoloKit",
    description:
      "Gratis momsberegner til danske freelancere og selvstændige. Læg moms til eller træk moms fra ethvert beløb. 25% dansk moms.",
    locale: "da_DK",
    type: "website",
    url: "https://solokit.dk/moms",
  },
};

export default function MomsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
        <Momsberegner />
      </main>
      <Footer />
    </div>
  );
}
