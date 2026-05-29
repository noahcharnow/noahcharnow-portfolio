"use client";

import { useEffect, useRef } from "react";

type ProjectVideoProps = {
  src: string;
  poster?: string;
};

/**
 * Editorial video moment. Autoplay-on-scroll, muted, looped. Sized to
 * preserve the source aspect ratio. Sits centered in a warm-paper field.
 *
 * Note: this version intentionally does NOT auto-hide on load errors —
 * we want to see what's wrong on the page rather than have the section
 * disappear silently.
 */
export function ProjectVideo({ src, poster }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              /* autoplay may be blocked; ignore */
            });
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        width: "100%",
        background: "var(--paper-deep)",
        padding: "120px 0",
        marginBottom: 96,
        borderTop: "1px solid var(--ink)",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            maxHeight: "72vh",
            maxWidth: "min(100%, 540px)",
            width: "auto",
            height: "auto",
            display: "block",
            boxShadow: "0 24px 60px -20px rgba(15, 14, 13, 0.25)",
          }}
        />
      </div>
    </section>
  );
}
