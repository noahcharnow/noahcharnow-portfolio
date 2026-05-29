"use client";

import { useEffect, useRef, useState } from "react";

type ProjectHeroProps = {
  imageUrl: string;
  alt: string;
  videoUrl?: string;
  /** Optional credit shown top-right. Defaults to client name. */
  partner?: string;
  accent?: string;
  stillLabel?: string;
};

export function ProjectHero({
  imageUrl,
  alt,
  videoUrl,
  partner,
  accent = "#EE4D1B",
  stillLabel = "Still / 01",
}: ProjectHeroProps) {
  if (!videoUrl) {
    return <StaticImageHero imageUrl={imageUrl} alt={alt} />;
  }
  return (
    <VideoHero
      imageUrl={imageUrl}
      videoUrl={videoUrl}
      alt={alt}
      partner={partner}
      accent={accent}
      stillLabel={stillLabel}
    />
  );
}

/* -------------------------------------------------------------------------- */

function StaticImageHero({ imageUrl, alt }: { imageUrl: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "21 / 9",
        maxHeight: "90vh",
        minHeight: 480,
        overflow: "hidden",
        background: "var(--paper-deep)",
        position: "relative",
      }}
    >
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease-out",
          viewTransitionName: "project-hero",
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function VideoHero({
  imageUrl,
  videoUrl,
  alt,
  partner,
  accent,
  stillLabel,
}: {
  imageUrl: string;
  videoUrl: string;
  alt: string;
  partner?: string;
  accent: string;
  stillLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onTime = () => {
      setCurrentTime(el.currentTime);
      if (el.duration > 0 && Number.isFinite(el.duration)) {
        setProgress(el.currentTime / el.duration);
      }
    };
    const onMeta = () => {
      if (Number.isFinite(el.duration)) setDuration(el.duration);
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("durationchange", onMeta);

    el.play().catch(() => {});

    // Fallback poll: some browsers (Safari especially) don't fire
    // loadedmetadata reliably when the video element is mounted via SSR.
    // After 500ms, if duration is still 0, read directly off the element.
    const fallbackId = window.setTimeout(() => {
      if (
        el.duration > 0 &&
        Number.isFinite(el.duration) &&
        duration === 0
      ) {
        setDuration(el.duration);
      }
    }, 500);

    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("durationchange", onMeta);
      window.clearTimeout(fallbackId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      aria-label={alt}
      style={{
        width: "100%",
        aspectRatio: "16 / 10",
        maxHeight: "96vh",
        minHeight: 560,
        background: "#0F0E0D",
        color: "#FAF9F4",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Massive "24" — pushed off-canvas upper-left for asymmetric bleed */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-3.5%",
          top: "-22%",
          fontSize: "clamp(360px, 82vh, 1200px)",
          fontWeight: 500,
          letterSpacing: "-0.09em",
          lineHeight: 0.78,
          color: accent,
          userSelect: "none",
          zIndex: 1,
        }}
      >
        24
      </div>

      {/* Still photo, lower-left, no rotation */}
      <div
        style={{
          position: "absolute",
          left: "4%",
          bottom: "13%",
          width: "30%",
          maxWidth: 540,
          aspectRatio: "3 / 2",
          zIndex: 2,
          background: "var(--paper-deep)",
          borderRadius: 2,
          boxShadow: "0 18px 50px -10px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        {stillLabel && (
          <span
            style={{
              position: "absolute",
              left: "50%",
              bottom: 16,
              transform: "translateX(-50%)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--paper, #FAF9F4)",
              background: accent,
              padding: "6px 12px",
              whiteSpace: "nowrap",
            }}
          >
            {stillLabel}
          </span>
        )}
      </div>

      {/* Video pinned upper-right */}
      <div
        style={{
          position: "absolute",
          right: "9%",
          top: "9%",
          bottom: "13%",
          width: "26%",
          maxWidth: 480,
          zIndex: 3,
          background: "#0a1530",
          borderRadius: 2,
          boxShadow: "0 24px 60px -12px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            viewTransitionName: "project-hero",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      {/* "Hours / to / track" rotated 90° on right edge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "3.5%",
          top: "50%",
          transform: "rotate(90deg) translateX(-50%)",
          transformOrigin: "right center",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          letterSpacing: "0.36em",
          textTransform: "uppercase",
          color: "#FAF9F4",
          opacity: 0.92,
          zIndex: 4,
          whiteSpace: "nowrap",
        }}
      >
        Hours / to / track
      </div>

      {/* Top-left documentary stamp with pulsing dot */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 40,
          zIndex: 5,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#FAF9F4",
          opacity: 0.6,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: accent,
            display: "inline-block",
            animation: "hero-pulse 2.4s ease-in-out infinite",
          }}
        />
        Las Vegas · 11.21.2024 · 22:14
      </div>

      {/* Top-right source credit */}
      {partner && (
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 40,
            zIndex: 5,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#FAF9F4",
            opacity: 0.6,
          }}
        >
          {partner}
        </div>
      )}

      {/* Live scrub bar with timecode */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 32,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "rgba(250,249,244,0.7)",
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "rgba(250,249,244,0.2)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: `${progress * 100}%`,
              background: accent,
              transition: "width 0.18s linear",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${progress * 100}%`,
              top: -2,
              width: 1,
              height: 5,
              background: accent,
            }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Film grain */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 6,
          pointerEvents: "none",
          opacity: 0.08,
          mixBlendMode: "overlay",
          backgroundImage: [
            "repeating-radial-gradient(circle at 17% 23%, rgba(255,255,255,0.5) 0, rgba(255,255,255,0) 0.7px)",
            "repeating-radial-gradient(circle at 81% 67%, rgba(255,255,255,0.5) 0, rgba(255,255,255,0) 0.7px)",
            "repeating-radial-gradient(circle at 42% 87%, rgba(255,255,255,0.4) 0, rgba(255,255,255,0) 0.6px)",
          ].join(","),
        }}
      />

      <style>{`
        @keyframes hero-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="hero-pulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
