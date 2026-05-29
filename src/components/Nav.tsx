import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Nav() {
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
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <a
            href="mailto:noah@noahcharnow.com"
            style={{ color: "var(--accent)" }}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
