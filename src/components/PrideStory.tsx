import Link from "next/link";
import { Fragment } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { ProjectNav } from "@/components/ProjectNav";
import type { Project } from "@/types";

type PrideStoryProps = {
  project: Project;
  prev: Pick<Project, "slug" | "title"> | null;
  next: Pick<Project, "slug" | "title"> | null;
  lensTitle: string;
};

/**
 * Bespoke "story" layout for projects that opt in via `story: true`. Rendered
 * through the same /work/[slug] route and seed data as every other native
 * project (Heath, Fitbit) — it just swaps the editorial body for a full-bleed
 * hero, storefront gallery, featured video, and five-up flower grid. All
 * layout CSS is scoped to `.pride-*` in the colocated <style> block below so no
 * other project is affected.
 */
export function PrideStory({ project, prev, next, lensTitle }: PrideStoryProps) {
  const sections = project.sections ?? [];
  const idea = sections[0];
  const storefrontSec = sections[1];
  const flowersSec = sections[2];
  const store = project.storefront ?? [];
  const storeSpan = store[0];
  const storePair = store.slice(1);
  const flowers = project.flowers ?? [];
  const titleWords = (project.headline ?? project.title).split(" ");

  return (
    <>
      <Nav />

      {/* Back link */}
      <div className="container" style={{ paddingTop: 40 }}>
        <Link
          href="/#work"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}
        >
          ← Back to work
        </Link>
      </div>

      {/* Text hero */}
      <header className="container pride-hero">
        {project.eyebrow && <div className="eyebrow pride-hero-eyebrow">{project.eyebrow}</div>}
        <h1 className="pride-hero-title">
          {titleWords.map((w, i) => (
            <span className="pride-word" key={i} style={{ animationDelay: `${0.15 + i * 0.13}s` }}>
              {w}
              {i < titleWords.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <div className="pride-hero-sub">
          <div className="pride-hero-tag">
            ROLE
            <br />
            {project.role}
            <br />
            <br />
            YEAR
            <br />
            {project.year}
          </div>
          {project.lede && <p className="pride-lede">{project.lede}</p>}
        </div>
      </header>

      {/* Full-bleed facade hero */}
      {project.heroImage && (
        <>
          <div className="pride-bleed">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.heroImage} alt={`${project.title} — storefront facade`} />
          </div>
          {project.heroCaption && <div className="pride-figcap">{project.heroCaption}</div>}
        </>
      )}

      {/* 01 — The idea */}
      {idea && (
        <section className="container pride-section">
          <div className="pride-sec-head">
            <div className="pride-sec-num">{idea.num}</div>
            <h2 className="pride-sec-title">{renderHeading(idea.heading)}</h2>
          </div>
          <div className="pride-copy">
            {idea.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* 02 — Storefront */}
      {storefrontSec && (
        <section className="container pride-section">
          <div className="pride-sec-head">
            <div className="pride-sec-num">{storefrontSec.num}</div>
            <h2 className="pride-sec-title">{renderHeading(storefrontSec.heading)}</h2>
          </div>
          <div className="pride-copy" style={{ marginBottom: 56 }}>
            {storefrontSec.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {store.length > 0 && (
            <div className="pride-gal">
              {storeSpan && (
                <figure className="pride-gal-fig span2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={storeSpan.src} alt="" />
                  {storeSpan.tag && <span className="pride-gal-tag">{storeSpan.tag}</span>}
                </figure>
              )}
              {storePair.map((shot, i) => (
                <figure className="pride-gal-fig" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt="" />
                  {shot.tag && <span className="pride-gal-tag">{shot.tag}</span>}
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 03 — Flower stories: featured video + five-up grid */}
      {flowersSec && (
        <section className="container pride-section">
          <div className="pride-sec-head">
            <div className="pride-sec-num">{flowersSec.num}</div>
            <h2 className="pride-sec-title">{renderHeading(flowersSec.heading)}</h2>
          </div>
          <div className="pride-copy">
            {flowersSec.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {project.featuredVideo && (
            <div className="pride-feature">
              <video autoPlay loop muted playsInline preload="metadata">
                <source src={project.featuredVideo} type="video/mp4" />
              </video>
              <div className="pride-feature-cap">
                {project.featuredVideoTitle && <span className="t">{project.featuredVideoTitle}</span>}
                {project.featuredVideoMeta && <span className="m">{project.featuredVideoMeta}</span>}
              </div>
            </div>
          )}

          {flowers.length > 0 && (
            <div className="pride-flowers">
              {flowers.map((f, i) => (
                <figure className="pride-flower" key={i}>
                  <div className="pride-flower-vid">
                    <video autoPlay loop muted playsInline preload="metadata">
                      <source src={f.src} type="video/mp4" />
                    </video>
                  </div>
                  <figcaption>
                    <span className="pride-flower-name">{f.name}</span>
                    <span className="pride-flower-note">{f.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Marquee */}
      {project.marquee && project.marquee.length > 0 && (
        <Marquee items={project.marquee} variant="alt" />
      )}

      {/* Credits */}
      {project.credits && project.credits.length > 0 && (
        <section className="container pride-section">
          <div className="pride-sec-head">
            <div className="pride-sec-num">04 / Credits</div>
            <h2 className="pride-sec-title">What it took.</h2>
          </div>
          <div className="pride-credits">
            {project.credits.map((c, i) => (
              <Fragment key={i}>
                <div className="pride-cred">
                  <div className="k">{c.label}</div>
                  <div className="v">{c.name}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      )}

      <ProjectNav prev={prev} next={next} lensTitle={lensTitle} />
      <Footer />

      <style>{prideCss}</style>
    </>
  );
}

/** Splits a heading on **double asterisks** and wraps the marked phrase in the hand-drawn underline. */
function renderHeading(heading: string) {
  const parts = heading.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span className="pride-marker" key={i}>
        <span className="pride-marker-content">{part}</span>
        <svg
          className="pride-marker-svg"
          viewBox="0 0 320 26"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id={`pride-rm-${i}`} x="-6%" y="-60%" width="112%" height="220%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018 0.06" numOctaves="2" seed="6" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
            </filter>
          </defs>
          <path
            d="M6,13 C62,8 112,18 170,12 C224,7 272,17 314,15"
            stroke="var(--accent)"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
            filter={`url(#pride-rm-${i})`}
          />
        </svg>
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const prideCss = `
  .pride-hero { padding-top: 72px; padding-bottom: 8px; }
  .pride-hero-eyebrow { margin-bottom: 32px; }
  .pride-hero-title {
    font-size: clamp(64px, 12vw, 176px); font-weight: 500;
    letter-spacing: -0.045em; line-height: 0.9; text-wrap: balance;
  }
  .pride-word {
    display: inline-block; opacity: 0; transform: translateY(40px);
    animation: pride-rise 0.9s var(--ease-out) forwards;
  }
  @keyframes pride-rise { to { opacity: 1; transform: translateY(0); } }
  .pride-hero-sub {
    display: grid; grid-template-columns: 100px 1fr; gap: 48px;
    margin-top: 48px; align-items: start;
  }
  .pride-hero-tag {
    font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em;
    color: var(--ink-mute); line-height: 1.9;
  }
  .pride-lede {
    font-size: clamp(20px, 2.4vw, 28px); font-weight: 500; letter-spacing: -0.02em;
    line-height: 1.2; max-width: 640px; text-wrap: balance;
  }

  .pride-bleed { width: 100%; margin-top: 56px; }
  .pride-bleed img {
    width: 100%; height: auto; display: block;
    border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink);
  }
  .pride-figcap {
    max-width: var(--container-max); margin: 14px auto 0;
    padding: 0 var(--container-pad);
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--ink-mute);
  }

  .pride-section { padding-top: 120px; padding-bottom: 120px; border-bottom: 1px solid var(--ink); }
  .pride-sec-head {
    display: grid; grid-template-columns: 100px 1fr; gap: 48px;
    align-items: start; margin-bottom: 56px;
  }
  .pride-sec-num {
    font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.12em;
    color: var(--accent); padding-top: 14px;
  }
  .pride-sec-title {
    font-size: clamp(34px, 5vw, 72px); font-weight: 500;
    letter-spacing: -0.035em; line-height: 0.98; text-wrap: balance;
  }
  .pride-copy { display: grid; grid-template-columns: 100px 1fr; gap: 48px; }
  .pride-copy p { grid-column: 2; max-width: 680px; font-size: 20px; line-height: 1.5; color: var(--ink-soft); }
  .pride-copy p + p { margin-top: 22px; }

  .pride-marker { position: relative; display: inline-block; font-weight: 600; color: var(--ink); }
  .pride-marker-content { position: relative; z-index: 2; }
  .pride-marker-svg {
    position: absolute; left: -12px; right: -12px; bottom: -8px; height: 30px;
    width: calc(100% + 24px); z-index: 1; pointer-events: none; overflow: visible;
  }

  .pride-gal {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
    background: var(--ink); border: 1px solid var(--ink);
  }
  .pride-gal-fig { position: relative; background: var(--paper); overflow: hidden; margin: 0; }
  .pride-gal-fig img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pride-gal-fig.span2 { grid-column: 1 / -1; }
  .pride-gal-tag {
    position: absolute; left: 16px; bottom: 14px;
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--paper); mix-blend-mode: difference;
  }

  .pride-feature { border: 1px solid var(--ink); margin-top: 48px; }
  .pride-feature video { width: 100%; display: block; }
  .pride-feature-cap {
    display: flex; justify-content: space-between; align-items: baseline;
    padding: 16px 20px; border-top: 1px solid var(--ink); flex-wrap: wrap; gap: 8px;
  }
  .pride-feature-cap .t { font-weight: 600; font-size: 18px; letter-spacing: -0.02em; }
  .pride-feature-cap .m {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--ink-mute);
  }

  .pride-flowers {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px;
    background: var(--ink); border: 1px solid var(--ink); margin-top: 56px;
  }
  .pride-flower { background: var(--paper); margin: 0; }
  .pride-flower-vid video { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; background: var(--paper-deep); }
  .pride-flower figcaption {
    padding: 16px 16px 20px; border-top: 1px solid var(--ink);
    display: flex; flex-direction: column; gap: 6px;
  }
  .pride-flower-name { font-weight: 600; font-size: 17px; letter-spacing: -0.02em; }
  .pride-flower-note { font-size: 13px; color: var(--ink-mute); line-height: 1.4; }

  .pride-credits { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
  .pride-cred .k {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 10px;
  }
  .pride-cred .v { font-size: 17px; line-height: 1.4; }

  @media (max-width: 900px) {
    .pride-hero-sub, .pride-sec-head, .pride-copy { grid-template-columns: 1fr; gap: 20px; }
    .pride-copy p { grid-column: 1; }
    .pride-flowers { grid-template-columns: repeat(2, 1fr); }
    .pride-gal { grid-template-columns: 1fr; }
    .pride-credits { grid-template-columns: 1fr 1fr; gap: 28px; }
    .pride-section { padding-top: 72px; padding-bottom: 72px; }
  }
`;
