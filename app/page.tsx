import Navbar from "./components/Navbar";
import Momsberegner from "./components/Momsberegner";
import Timeprisberegner from "./components/Timeprisberegner";
import FakturaKalkulator from "./components/FakturaKalkulator";
import BSkatEstimator from "./components/BSkatEstimator";
import AffiliateSection from "./components/AffiliateSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Hero */}
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Gratis værktøjer til danske{" "}
            <span className="text-accent">freelancere</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Beregn moms, timepris, fakturatotal og B-skat på sekunder.
            Bygget til soloselvstændige og freelancere i Danmark.
          </p>
        </section>

        {/* Tools */}
        <div className="space-y-10">
          <Momsberegner />
          <Timeprisberegner />
          <FakturaKalkulator />
          <BSkatEstimator />
          <AffiliateSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
