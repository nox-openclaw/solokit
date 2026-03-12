const partners = [
  {
    name: "Dinero",
    description: "Populært regnskabsprogram til freelancere. Automatisk bogføring, fakturering og momsafregning.",
    cta: "Prøv gratis i 30 dage",
    url: "https://www.dinero.dk",
  },
  {
    name: "Billy",
    description: "Enkelt og brugervenligt regnskabsprogram. Perfekt til soloselvstændige der vil spare tid.",
    cta: "Prøv gratis i 30 dage",
    url: "https://www.billy.dk",
  },
  {
    name: "e-conomic",
    description: "Professionelt regnskabssystem med avancerede funktioner til voksende freelance-forretninger.",
    cta: "Prøv gratis i 30 dage",
    url: "https://www.e-conomic.dk",
  },
];

export default function AffiliateSection() {
  return (
    <section className="scroll-mt-20">
      <h2 className="mb-2 text-2xl font-bold">Anbefalede værktøjer</h2>
      <p className="mb-6 text-sm text-muted">
        Regnskabsprogrammer som gør din hverdag lettere som freelancer.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {partners.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group rounded-2xl border border-card-border bg-card p-6 transition-colors hover:border-accent/40"
          >
            <h3 className="mb-2 text-lg font-semibold group-hover:text-accent">
              {p.name}
            </h3>
            <p className="mb-4 text-sm text-muted">{p.description}</p>
            <span className="inline-block rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
              {p.cta} &rarr;
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
