"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ["work", "about"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      // A thin band near the vertical middle of the viewport: a section is
      // "active" while it crosses that line.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--paper)",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        <Wordmark />
        <div
          style={{
            display: "flex",
            gap: 32,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <Link
            className="nav-link"
            href="/#work"
            data-active={active === "work"}
          >
            Work
          </Link>
          <Link
            className="nav-link"
            href="/#about"
            data-active={active === "about"}
          >
            About
          </Link>
          <a className="nav-link" href="mailto:noahcharnow@gmail.com">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
