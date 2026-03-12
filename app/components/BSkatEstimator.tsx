"use client";

import { useState } from "react";

function fmt(n: number) {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// Simplified Danish B-tax model (2024/2025 approximation)
// AM-bidrag: 8%
// Personfradrag: ~49,700 kr
// Bundskat: ~12.09%
// Kommuneskat: avg ~24.97%
// Topskat: 15% on income above ~588,900 (after AM-bidrag)

const AM_RATE = 0.08;
const PERSONFRADRAG = 49700;
const BUNDSKAT_RATE = 0.1209;
const KOMMUNESKAT_RATE = 0.2497;
const KIRKESKAT_RATE = 0.0069;
const TOPSKAT_THRESHOLD = 588900;
const TOPSKAT_RATE = 0.15;

export default function BSkatEstimator() {
  const [yearlyIncome, setYearlyIncome] = useState("500000");
  const [deductions, setDeductions] = useState("0");
  const [churchTax, setChurchTax] = useState(false);

  const income = parseFloat(yearlyIncome) || 0;
  const deduct = parseFloat(deductions) || 0;

  const amBidrag = income * AM_RATE;
  const afterAM = income - amBidrag - deduct;
  const taxableIncome = Math.max(0, afterAM - PERSONFRADRAG);

  const bundskat = taxableIncome * BUNDSKAT_RATE;
  const kommuneskat = taxableIncome * KOMMUNESKAT_RATE;
  const kirkeskat = churchTax ? taxableIncome * KIRKESKAT_RATE : 0;
  const topSkatBase = Math.max(0, afterAM - TOPSKAT_THRESHOLD);
  const topskat = topSkatBase * TOPSKAT_RATE;

  const totalTax = amBidrag + bundskat + kommuneskat + kirkeskat + topskat;
  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
  const netIncome = income - totalTax;
  const monthlyBSkat = totalTax / 10; // B-skat betales over 10 rater

  return (
    <section id="bskat" className="scroll-mt-20">
      <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
        <h2 className="mb-1 text-2xl font-bold">B-skat estimator</h2>
        <p className="mb-6 text-sm text-muted">
          Estimat af dine B-skattebetalinger baseret på forventet årsindkomst.
          <br />
          <span className="text-xs">
            OBS: Dette er et forenklet estimat — brug Skats officielle beregner for præcise tal.
          </span>
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-muted">
              Forventet årsindkomst (DKK)
            </label>
            <input
              type="number"
              value={yearlyIncome}
              onChange={(e) => setYearlyIncome(e.target.value)}
              className="w-full rounded-lg border border-card-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted">
              Fradrag (DKK)
            </label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="w-full rounded-lg border border-card-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <label className="mb-6 flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={churchTax}
            onChange={(e) => setChurchTax(e.target.checked)}
            className="h-4 w-4 rounded border-card-border accent-accent"
          />
          Medlem af folkekirken (kirkeskat)
        </label>

        {income > 0 && (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="AM-bidrag (8%)" value={`${fmt(amBidrag)} kr.`} />
              <Stat label="Bundskat" value={`${fmt(bundskat)} kr.`} />
              <Stat label="Kommuneskat" value={`${fmt(kommuneskat)} kr.`} />
              {topskat > 0 && <Stat label="Topskat" value={`${fmt(topskat)} kr.`} />}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Stat
                label="B-skat pr. rate (10 rater)"
                value={`${fmt(monthlyBSkat)} kr.`}
                highlight
              />
              <Stat label="Samlet skat" value={`${fmt(totalTax)} kr.`} />
              <Stat label="Nettoindkomst" value={`${fmt(netIncome)} kr.`} />
            </div>

            <div className="mt-4 text-sm text-muted">
              Effektiv skatteprocent: <span className="font-semibold text-foreground">{effectiveRate.toFixed(1)}%</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function Stat({
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
