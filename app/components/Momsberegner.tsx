"use client";

import { useState } from "react";

const MOMS_RATE = 0.25;

function fmt(n: number) {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Momsberegner() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"add" | "subtract">("add");

  const value = parseFloat(amount) || 0;
  const moms = mode === "add" ? value * MOMS_RATE : value - value / (1 + MOMS_RATE);
  const total = mode === "add" ? value * (1 + MOMS_RATE) : value / (1 + MOMS_RATE);

  return (
    <section id="momsberegner" className="scroll-mt-20">
      <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
        <h2 className="mb-1 text-2xl font-bold">Momsberegner</h2>
        <p className="mb-6 text-sm text-muted">
          Beregn 25% dansk moms — læg til eller træk fra.
        </p>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setMode("add")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "add"
                ? "bg-accent text-black"
                : "bg-white/5 text-muted hover:text-foreground"
            }`}
          >
            Læg moms til
          </button>
          <button
            onClick={() => setMode("subtract")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              mode === "subtract"
                ? "bg-accent text-black"
                : "bg-white/5 text-muted hover:text-foreground"
            }`}
          >
            Træk moms fra
          </button>
        </div>

        <label className="mb-1 block text-sm text-muted">
          {mode === "add" ? "Beløb uden moms (DKK)" : "Beløb med moms (DKK)"}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
          className="mb-6 w-full rounded-lg border border-card-border bg-background px-4 py-3 text-lg focus:border-accent focus:outline-none"
        />

        {value > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ResultCard
              label={mode === "add" ? "Beløb uden moms" : "Beløb uden moms"}
              value={`${fmt(mode === "add" ? value : total)} kr.`}
            />
            <ResultCard label="Moms (25%)" value={`${fmt(moms)} kr.`} />
            <ResultCard
              label={mode === "add" ? "Beløb med moms" : "Beløb med moms"}
              value={`${fmt(mode === "add" ? total : value)} kr.`}
              highlight
            />
          </div>
        )}
      </div>
    </section>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        highlight ? "bg-accent/10 border border-accent/30" : "bg-white/5"
      }`}
    >
      <div className="mb-1 text-xs text-muted">{label}</div>
      <div className={`text-xl font-bold ${highlight ? "text-accent" : ""}`}>
        {value}
      </div>
    </div>
  );
}
