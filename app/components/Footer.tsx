export default function Footer() {
  return (
    <footer className="border-t border-card-border py-8 text-center text-sm text-muted">
      <p>&copy; {new Date().getFullYear()} Solokit.dk — Gratis værktøjer til danske freelancere.</p>
      <p className="mt-1">Beregningerne er vejledende. Kontakt en revisor for præcis rådgivning.</p>
    </footer>
  );
}
