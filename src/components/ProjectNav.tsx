"use client";

import { useRouter } from "next/navigation";
import type { Project } from "@/types";

type ProjectNavProps = {
  prev: Pick<Project, "slug" | "title"> | null;
  next: Pick<Project, "slug" | "title"> | null;
  lensTitle: string;
};

function supportsViewTransitions(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof (document as unknown as { startViewTransition?: unknown })
      .startViewTransition === "function"
  );
}

/**
 * Prev/next navigation between projects in the same lens. Uses View
 * Transitions for smooth project-to-project navigation when supported.
 */
export function ProjectNav({ prev, next, lensTitle }: ProjectNavProps) {
  const router = useRouter();

  function go(slug: string) {
    const href = `/work/${slug}`;
    if (!supportsViewTransitions()) {
      router.push(href);
      return;
    }
    (
      document as unknown as {
        startViewTransition: (cb: () => void) => unknown;
      }
    ).startViewTransition(() => {
      router.push(href);
    });
  }

  function handleClick(e: React.MouseEvent, slug: string) {
    e.preventDefault();
    go(slug);
  }

  return (
    <section
      style={{
        padding: "80px 0 96px",
        }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          {prev ? (
            <a
              href={`/work/${prev.slug}`}
              onClick={(e) => handleClick(e, prev.slug)}
              style={{ display: "block" }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: 16,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                }}
              >
                ← Previous in {lensTitle}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(28px, 3.4vw, 48px)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  textWrap: "balance",
                }}
              >
                {prev.title}
              </span>
            </a>
          ) : (
            <div />
          )}
          {next ? (
            <a
              href={`/work/${next.slug}`}
              onClick={(e) => handleClick(e, next.slug)}
              style={{ display: "block", textAlign: "right" }}
            >
              <span
                style={{
                  display: "block",
                  marginBottom: 16,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-mute)",
                }}
              >
                Next in {lensTitle} →
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(28px, 3.4vw, 48px)",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.02,
                  textWrap: "balance",
                }}
              >
                {next.title}
              </span>
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
