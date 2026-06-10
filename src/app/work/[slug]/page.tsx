import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectNav } from "@/components/ProjectNav";
import { PrideStory } from "@/components/PrideStory";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getLens } from "@/lib/lenses";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.heroImage ? [project.heroImage] : [],
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  if (project.externalLink) {
    redirect(project.externalLink);
  }

  const lens = getLens(project.lens);
  const allProjects = await getAllProjects();
  const inLens = allProjects.filter((p) => p.lens === project.lens);
  const idx = inLens.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? inLens[idx - 1] : null;
  const next = idx < inLens.length - 1 ? inLens[idx + 1] : null;

  // Story layout (e.g. Pride 2024): same route + seed wiring, bespoke body.
  if (project.story) {
    return (
      <PrideStory project={project} prev={prev} next={next} lensTitle={lens?.title ?? ""} />
    );
  }

  const bodyParas = (project.body ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const gallery = project.gallery ?? [];
  const captions = project.captions ?? {};
  const accent = project.accent ?? "var(--accent)";

  const lead = gallery[0];
  const gridBig = gallery[1];
  const gridSmall1 = gallery[2];
  const gridSmall2 = gallery[3];
  const pairLeft = gallery[4];
  const pairRight = gallery[5];
  const breakout = gallery[6];
  // Video breakouts (Fitbit) lead the chapter; image breakouts (Heath, McLaren) keep their later slot.
  const breakoutIsVideo = !!breakout && isVideoSrc(breakout);
  const finalLeft = gallery[7];
  const finalMid = gallery[8];
  const finalRight = gallery[9];

  return (
    <>
      <Nav />

      {/* Award-tier hero. If video present → composition; else 21:9 image */}
      <ProjectHero
        imageUrl={project.heroImage}
        alt={project.title}
        videoUrl={project.video}
        partner={project.client}
        accent={project.accent}
      />

      {/* Back link */}
      <div className="container" style={{ paddingTop: 56 }}>
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

      {/* Asymmetric title block */}
      <section className="section section--no-border" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 40 }}>
            {lens?.title} / {project.year}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)", gap: 64, alignItems: "end" }}>
            <h1 className="hero-display">{project.title}</h1>
            <p style={{ fontSize: "clamp(20px, 1.9vw, 26px)", fontWeight: 400, lineHeight: 1.35, color: "var(--ink-soft)", textWrap: "pretty" }}>
              {project.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section style={{ padding: "32px 0" }}>
        <div className="container">
          <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
            <Meta label="Client" value={project.client} />
            <Meta label="Role" value={project.role} />
            <Meta label="Year" value={String(project.year)} />
            <Meta label="Lens" value={lens?.title ?? "—"} />
          </dl>
        </div>
      </section>

      {/* Intro paragraph + lead image */}
      {(bodyParas[0] || lead) && (
        <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: lead ? "1fr 2fr" : "1fr", gap: 64, alignItems: "start" }}>
              {bodyParas[0] && (
                <div>
                  <span style={{ display: "block", marginBottom: 28, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
                    01 / The work
                  </span>
                  <p style={{ fontSize: "clamp(20px, 1.8vw, 24px)", lineHeight: 1.4, color: "var(--ink)", fontWeight: 400, textWrap: "pretty" }}>
                    {bodyParas[0]}
                  </p>
                </div>
              )}
              {lead && <CaptionedImage src={lead} caption={captions[0]} />}
            </div>
          </div>
        </section>
      )}

      {/* Complex grid: 1 big + 2 stacked */}
      {gridBig && gridSmall1 && gridSmall2 && (
        <section style={{ paddingBottom: 96 }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)", gridTemplateRows: "1fr 1fr", gap: 16 }}>
              <div style={{ gridRow: "1 / 3", height: "100%" }}>
                <CaptionedImage src={gridBig} caption={captions[1]} fillHeight />
              </div>
              <div><CaptionedImage src={gridSmall1} caption={captions[2]} /></div>
              <div><CaptionedImage src={gridSmall2} caption={captions[3]} /></div>
            </div>
          </div>
        </section>
      )}

      {/* Middle body paragraph */}
      {bodyParas[1] && (
        <section style={{ paddingTop: 48, paddingBottom: 96 }}>
          <div className="container">
            <p style={{ maxWidth: 720, fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.35, fontWeight: 400, color: "var(--ink-soft)", textWrap: "pretty" }}>
              {bodyParas[1]}
            </p>
          </div>
        </section>
      )}

      {/* Pull quote moment */}
      {project.pullQuote && (
        <section style={{ padding: "120px 0", background: "var(--paper)" }}>
          <div className="container">
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <span aria-hidden="true" style={{ display: "block", marginBottom: 24, fontSize: "clamp(48px, 6vw, 88px)", fontWeight: 500, lineHeight: 0.8, color: accent, letterSpacing: "-0.04em" }}>
                &ldquo;
              </span>
              <p style={{ fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1.05, color: "var(--ink)", textWrap: "balance" }}>
                {project.pullQuote}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Chapter break */}
      {project.chapterTitle && (
        <section style={{ background: accent, color: "var(--paper)", padding: "140px 0", marginBottom: 96 }}>
          <div className="container">
            {project.chapterEyebrow && (
              <span style={{ display: "block", marginBottom: 32, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.78 }}>
                {project.chapterEyebrow}
              </span>
            )}
            <h2 style={{ fontSize: "clamp(56px, 9vw, 144px)", fontWeight: 500, letterSpacing: "-0.045em", lineHeight: 0.92, textWrap: "balance" }}>
              {project.chapterTitle}
            </h2>
          </div>
        </section>
      )}

      {/* Video breakout leads the chapter (Fitbit only) */}
      {breakout && breakoutIsVideo && (
        <BreakoutMedia src={breakout} caption={captions[6]} />
      )}

      {/* Asymmetric pair */}
      {pairLeft && pairRight && (
        <section style={{ paddingBottom: 96 }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 16, alignItems: "start" }}>
              <CaptionedImage src={pairLeft} caption={captions[4]} />
              <CaptionedImage src={pairRight} caption={captions[5]} />
            </div>
          </div>
        </section>
      )}

      {/* Closing punchline */}
      {bodyParas[2] && (
        <section style={{ paddingTop: 48, paddingBottom: 96 }}>
          <div className="container">
            <p style={{ maxWidth: 920, fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.15, color: "var(--ink)", textWrap: "balance" }}>
              {bodyParas[2]}
            </p>
          </div>
        </section>
      )}

      {/* Full-bleed breakout (image breakouts keep their later slot) */}
      {breakout && !breakoutIsVideo && (
        <BreakoutMedia src={breakout} caption={captions[6]} />
      )}

      {/* Final triptych at varied widths */}
      {finalLeft && finalMid && finalRight && (
        <section style={{ paddingBottom: 96 }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 2fr", gap: 16, alignItems: "start" }}>
              <CaptionedImage src={finalLeft} caption={captions[7]} />
              <CaptionedImage src={finalMid} caption={captions[8]} />
              <CaptionedImage src={finalRight} caption={captions[9]} />
            </div>
          </div>
        </section>
      )}

      {/* Credits */}
      {project.credits && project.credits.length > 0 && (
        <section style={{ padding: "64px 0 96px", borderTop: "1px solid var(--ink)" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 48, alignItems: "start" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)", paddingTop: 8 }}>
                Credits
              </span>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "20px 32px", maxWidth: 560 }}>
                {project.credits.map((credit, i) => (
                  <Fragment key={i}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)", paddingTop: 4 }}>
                      {credit.label}
                    </span>
                    <span style={{ fontSize: 18, fontWeight: 500 }}>{credit.name}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <ProjectNav prev={prev} next={next} lensTitle={lens?.title ?? ""} />
      <Footer />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt style={{ marginBottom: 6, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
        {label}
      </dt>
      <dd style={{ fontSize: 16, color: "var(--ink)", fontWeight: 500 }}>{value}</dd>
    </div>
  );
}

function CaptionText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "block", marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-mute)" }}>
      {children}
    </span>
  );
}

function CaptionedImage({ src, caption, fillHeight }: { src: string; caption?: string; fillHeight?: boolean }) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", height: fillHeight ? "100%" : "auto" }}>
      {isVideoSrc(src) ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterFor(src)}
          style={{ width: "100%", height: fillHeight ? "100%" : "auto", objectFit: "cover", background: "var(--paper-deep)", display: "block" }}
        >
          <source src={src} type={videoType(src)} />
        </video>
      ) : (
        <img src={src} alt="" style={{ width: "100%", height: fillHeight ? "100%" : "auto", objectFit: fillHeight ? "cover" : "contain", background: "var(--paper-deep)", display: "block" }} />
      )}
      {caption && (<figcaption><CaptionText>{caption}</CaptionText></figcaption>)}
    </figure>
  );
}

function BreakoutMedia({ src, caption }: { src: string; caption?: string }) {
  return (
    <section style={{ marginBottom: 96 }}>
      {isVideoSrc(src) ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterFor(src)}
          style={{ width: "100%", height: "78vh", minHeight: 520, objectFit: "cover", background: "var(--paper-deep)", display: "block" }}
        >
          <source src={src} type={videoType(src)} />
        </video>
      ) : (
        <img src={src} alt="" style={{ width: "100%", height: "78vh", minHeight: 520, objectFit: "cover", background: "var(--paper-deep)", display: "block" }} />
      )}
      {caption && (
        <div className="container" style={{ paddingTop: 12 }}>
          <CaptionText>{caption}</CaptionText>
        </div>
      )}
    </section>
  );
}

/** Gallery sources ending in .mp4/.webm render as inline looping video instead of an image. */
const VIDEO_SRC_RE = /\.(mp4|webm)$/i;

function isVideoSrc(src: string) {
  return VIDEO_SRC_RE.test(src);
}

function posterFor(src: string) {
  return src.replace(VIDEO_SRC_RE, "-poster.jpg");
}

function videoType(src: string) {
  return src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4";
}
