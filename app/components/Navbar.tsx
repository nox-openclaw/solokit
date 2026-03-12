"use client";

import { useState } from "react";

const tools = [
  { id: "momsberegner", label: "Momsberegner" },
  { id: "timeprisberegner", label: "Timeprisberegner" },
  { id: "faktura", label: "Faktura-kalkulator" },
  { id: "bskat", label: "B-skat estimator" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Solo</span>kit
        </a>

        {/* Desktop */}
        <div className="hidden gap-6 md:flex">
          {tools.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {t.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-muted md:hidden"
          aria-label="Menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-card-border px-4 pb-4 md:hidden">
          {tools.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {t.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
