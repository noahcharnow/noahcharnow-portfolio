"use client";

import type { LensId } from "@/types";
import { LENSES } from "@/lib/lenses";

type LensBarProps = {
  active: LensId;
  counts: Record<LensId, number>;
  onChange: (lens: LensId) => void;
};

export function LensBar({ active, counts, onChange }: LensBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Work categories"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid var(--ink)",
        borderBottom: "1px solid var(--ink)",
        marginBottom: 80,
      }}
    >
      {LENSES.map((lens, i) => {
        const isActive = lens.id === active;
        return (
          <button
            key={lens.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(lens.id)}
            style={{
              textAlign: "left",
              padding: "28px 24px",
              background: isActive ? "var(--ink)" : "transparent",
              color: isActive ? "var(--paper)" : "var(--ink)",
              borderRight: i < 3 ? "1px solid var(--ink)" : "none",
              transition: "background 0.28s var(--ease-out), color 0.28s var(--ease-out)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isActive ? "var(--paper)" : "var(--ink-mute)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{String(i + 1).padStart(2, "0")} / Lens</span>
              <span>
                {String(counts[lens.id] ?? 0).padStart(2, "0")}
              </span>
            </span>
            <span
              style={{
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                textWrap: "balance",
              }}
            >
              {lens.title}
            </span>
            <span
              style={{
                fontSize: 13,
                color: isActive ? "var(--paper)" : "var(--ink-mute)",
                opacity: 0.78,
                textWrap: "balance",
              }}
            >
              {lens.blurb}
            </span>
          </button>
        );
      })}
      <style>{`
        @media (max-width: 768px) {
          [role="tablist"] {
            grid-template-columns: 1fr !important;
          }
          [role="tablist"] [role="tab"] {
            border-right: none !important;
            border-bottom: 1px solid var(--ink);
          }
          [role="tablist"] [role="tab"]:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}
