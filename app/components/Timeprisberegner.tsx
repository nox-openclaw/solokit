"use client";

import { useState } from "react";

function fmt(n: number) {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function Timeprisberegner() {
  const [monthlyIncome, setMonthlyIncome] = useState("35000");
  const [hoursPerWeek, setHoursPerWeek] = useState("37");
  const [vacationWeeks, setVacationWeeks] = useState("5");
  const [overheadPct, setOverheadPct] = useState("20");

  const monthly = parseFloat(monthlyIncome) || 0;
  const hours = parseFloat(hoursPerWeek) || 0;
  const vacation = parseFloat(vacationWeeks) || 0;
  const overhead = parseFloat(overheadPct) || 0;

  const workingWeeks = 52 - vacation;
  const totalHoursPerYear = workingWeeks * hours;
  const yearlyIncome = monthly * 12;
  const yearlyWithOverhead = yearlyIncome * (1 + overhead / 100);
  const hourlyRate = totalHoursPerYear > 0 ? yearlyWithOverhead / totalHoursPerYear : 0;
  const hourlyWithMoms = hourlyRate * 1.25;

  return (
    <section id="timeprisberegner" className="scroll-mt-20">
      <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
        <h2 className="mb-1 text-2xl font-bold">Timeprisberegner</h2>
        <p className="mb-6 text-sm text-muted">
          Find din optimale timepris ud fra løn, timer og omkostninger.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Ønsket månedsindkomst (DKK)"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
          />
          <Field
            label="Arbejdstimer pr. uge"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
          />
          <Field
            label="Ferieuger pr. år"
            value={vacationWeeks}
            onChange={setVacationWeeks}
          />
          <Field
            label="Overhead / omkostninger (%)"
            value={overheadPct}
            onChange={setOverheadPct}
          />
        </div>

        {hourlyRate > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label="Fakturerbare timer/år" value={fmt(totalHoursPerYear)} />
            <Stat
              label="Timepris ekskl. moms"
              value={`${fmt(hourlyRate)} kr.`}
              highlight
            />
            <Stat
              label="Timepris inkl. moms"
              value={`${fmt(hourlyWithMoms)} kr.`}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm text-muted">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-card-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
      />
    </div>
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
