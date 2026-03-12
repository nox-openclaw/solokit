"use client";

import { useState } from "react";

interface LineItem {
  id: number;
  description: string;
  quantity: string;
  unitPrice: string;
}

function fmt(n: number) {
  return n.toLocaleString("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

let nextId = 1;

export default function FakturaKalkulator() {
  const [items, setItems] = useState<LineItem[]>([
    { id: nextId++, description: "", quantity: "1", unitPrice: "" },
  ]);
  const [discountPct, setDiscountPct] = useState("0");

  const discount = parseFloat(discountPct) || 0;

  const subtotal = items.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0;
    const price = parseFloat(item.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  const discountAmount = subtotal * (discount / 100);
  const afterDiscount = subtotal - discountAmount;
  const moms = afterDiscount * 0.25;
  const total = afterDiscount + moms;

  function addItem() {
    setItems([...items, { id: nextId++, description: "", quantity: "1", unitPrice: "" }]);
  }

  function removeItem(id: number) {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  }

  function updateItem(id: number, field: keyof Omit<LineItem, "id">, value: string) {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }

  return (
    <section id="faktura" className="scroll-mt-20">
      <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8">
        <h2 className="mb-1 text-2xl font-bold">Faktura-kalkulator</h2>
        <p className="mb-6 text-sm text-muted">
          Beregn fakturatotal med linjer, rabat og moms.
        </p>

        {/* Line items */}
        <div className="mb-4 space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_80px_120px_40px] items-end gap-2 sm:grid-cols-[1fr_100px_140px_40px]"
            >
              <div>
                {idx === 0 && (
                  <label className="mb-1 block text-xs text-muted">Beskrivelse</label>
                )}
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Ydelse"
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                {idx === 0 && (
                  <label className="mb-1 block text-xs text-muted">Antal</label>
                )}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                {idx === 0 && (
                  <label className="mb-1 block text-xs text-muted">Stykpris (DKK)</label>
                )}
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-card-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                {idx === 0 && <div className="mb-1 h-4" />}
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex h-[42px] w-full items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/5 hover:text-red-400"
                  aria-label="Fjern linje"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mb-6 rounded-lg bg-white/5 px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          + Tilføj linje
        </button>

        <div className="mb-6">
          <label className="mb-1 block text-sm text-muted">Rabat (%)</label>
          <input
            type="number"
            value={discountPct}
            onChange={(e) => setDiscountPct(e.target.value)}
            className="w-32 rounded-lg border border-card-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
          />
        </div>

        {subtotal > 0 && (
          <div className="space-y-2 border-t border-card-border pt-4">
            <Row label="Subtotal" value={`${fmt(subtotal)} kr.`} />
            {discount > 0 && (
              <Row label={`Rabat (${discount}%)`} value={`-${fmt(discountAmount)} kr.`} />
            )}
            <Row label="Moms (25%)" value={`${fmt(moms)} kr.`} />
            <div className="flex items-center justify-between pt-2 text-xl font-bold text-accent">
              <span>Total</span>
              <span>{fmt(total)} kr.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}
