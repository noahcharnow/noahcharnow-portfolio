"use client";

import { useState, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Project, LensId } from "@/types";
import { LENSES } from "@/lib/lenses";
import { LensBar } from "./LensBar";

const PREVIEW_W = 300;
const PREVIEW_H = 200;
const NAV_SAFE = 100; // keep preview below the sticky nav

type WorkSectionProps = {
  projects: Project[];
};

// Avoid SSR errors by feature-detecting at call-time.
function supportsViewTransitions(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof (document as unknown as { startViewTransition?: unknown })
      .startViewTransition === "function"
  );
}

export function WorkSection({ projects }: WorkSectionProps) {
  const router = useRouter();
  const previewImgRef = useRef<HTMLImageElement>(null);

  const [active, setActive] = useState<LensId>("big-brands");
  const [hovered, setHovered] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, {
    stiffness: 300,
    damping: 34,
    mass: 0.4,
  });
  const springY = useSpring(mouseY, {
    stiffness: 300,
    damping: 34,
    mass: 0.4,
  });

  const counts = useMemo(() => {
    return LENSES.reduce(
      (acc, lens) => {
        acc[lens.id] = projects.filter((p) => p.lens === lens.id).length;
        return acc;
      },
      {} as Record<LensId, number>,
    );
  }, [projects]);

  const visible = useMemo(
    () => projects.filter((p) => p.lens === active),
    [projects, active],
  );

  function handleMouseMove(e: React.MouseEvent) {
    if (typeof window === "undefined") return;
    let x = e.clientX + 28;
    let y = e.clientY - PREVIEW_H / 2;
    x = Math.min(window.innerWidth - PREVIEW_W - 24, x);
    y = Math.max(NAV_SAFE, y);
    y = Math.min(window.innerHeight - PREVIEW_H - 24, y);
    mouseX.set(x);
    mouseY.set(y);
  }

  // Cinematic transition: tag the floating preview image with the same
  // view-transition-name as the project page hero, then navigate. Browser
  // morphs preview -> hero seamlessly.
  function handleProjectNav(slug: string) {
    const href = `/work/${slug}`;
    if (!supportsViewTransitions()) {
      router.push(href);
      return;
    }
    if (previewImgRef.current) {
      previewImgRef.current.style.viewTransitionName = "project-hero";
    }
    (
      document as unknown as {
        startViewTransition: (cb: () => void) => unknown;
      }
    ).startViewTransition(() => {
      router.push(href);
    });
  }

  return (
    <section className="section" id="work" onMouseMove={handleMouseMove}>
      <div className="container">
        <div className="section-header">
          <span className="section-num">01 / Work</span>
          <h2 className="section-title">Pick a lens.</h2>
        </div>

        <LensBar active={active} counts={counts} onChange={setActive} />

        <div style={{ minHeight: 360 }}>
          <AnimatePresence mode="wait">
            <motion.ul
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                borderTop: "1px solid var(--ink)",
              }}
              onMouseLeave={() => setHovered(null)}
            >
              {visible.length === 0 && (
                <li
                  style={{
                    padding: "48px 0",
                    color: "var(--ink-mute)",
                  }}
                >
                  Nothing here yet.
                </li>
              )}
              {visible.map((project, i) => (
                <ProjectRow
                  key={project.slug}
                  project={project}
                  index={i}
                  isHovered={hovered === i}
                  onHover={() => setHovered(i)}
                  onNavigate={handleProjectNav}
                />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating cursor preview */}
      <motion.div
        className="preview-frame"
        style={{
          x: springX,
          y: springY,
          width: PREVIEW_W,
          height: PREVIEW_H,
        }}
        animate={{
          opacity:
            hovered !== null && visible[hovered]?.heroImage ? 1 : 0,
          scale: hovered !== null ? 1 : 0.94,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-hidden="true"
      >
        {hovered !== null && visible[hovered] && (
          <img
            ref={previewImgRef}
            src={visible[hovered].heroImage}
            alt=""
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
          />
        )}
      </motion.div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isHovered,
  onHover,
  onNavigate,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onNavigate: (slug: string) => void;
}) {
  const isExternal = Boolean(project.externalLink);
  const href = project.externalLink ?? `/work/${project.slug}`;

  function handleClick(e: React.MouseEvent) {
    if (isExternal) return; // normal anchor behavior, opens in new tab
    e.preventDefault();
    onNavigate(project.slug);
  }

  const inner = (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr auto auto",
        gap: 32,
        alignItems: "baseline",
        padding: "28px 4px",
        borderBottom: "1px solid var(--ink)",
        transition: "padding-left 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)",
        paddingLeft: isHovered ? 20 : 4,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.14em",
          color: isHovered ? "var(--accent)" : "var(--ink-mute)",
          transition: "color 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <span
          style={{
            display: "block",
            fontSize: "clamp(28px, 4vw, 56px)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          {project.title}
        </span>
        {project.quote && (
          <span
            style={{
              display: "block",
              marginTop: 10,
              height: 21,
              overflow: "hidden",
              fontSize: 15,
              fontWeight: 400,
              letterSpacing: "-0.005em",
              lineHeight: 1.4,
              color: "var(--ink-mute)",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(-4px)",
              transition:
                "opacity 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            {project.quote}
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}
      >
        {project.client}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.14em",
          color: "var(--ink-mute)",
        }}
      >
        {project.year}
      </span>
    </div>
  );

  return (
    <li onMouseEnter={onHover}>
      {isExternal ? (
        <a href={href} target="_blank" rel="noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={href} onClick={handleClick}>
          {inner}
        </Link>
      )}
    </li>
  );
}
