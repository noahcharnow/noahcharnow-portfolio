import Image from "next/image";

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-num">02 / About</span>
          <h2 className="section-title">Quick version.</h2>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 48,
            alignItems: "flex-start",
          }}
        >
          <Image
            src="/noah2-cream.jpg"
            alt="Noah Charnow"
            width={400}
            height={400}
            sizes="320px"
            style={{
              width: 320,
              maxWidth: "100%",
              height: "auto",
              display: "block",
              background: "#FAF9F4",
            }}
          />
          <div style={{ flex: "1 1 360px", maxWidth: 720 }}>
            <p
              style={{
                fontSize: "clamp(22px, 2.4vw, 28px)",
                lineHeight: 1.4,
                color: "var(--ink-soft)",
                fontWeight: 400,
                marginBottom: 32,
                textWrap: "balance",
              }}
            >
              Senior creative director, San Diego. Fifteen years inside the
              brand teams at Fitbit, Heath Ceramics, Huckberry, Chrome
              Industries, and Sol Republic. Now running freelance and
              productized services.
            </p>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                color: "var(--ink-soft)",
                marginBottom: 16,
              }}
            >
              The work covers brand systems, identity, campaigns, and social.
              The throughline is craft. Sometimes the answer is a 200-page
              style guide. Sometimes it&apos;s one Instagram post that does
              the job of a media plan.
            </p>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                color: "var(--ink-soft)",
              }}
            >
              For new work, retainer or project-based, write me at{" "}
              <a
                href="mailto:noahcharnow@gmail.com"
                style={{
                  color: "var(--accent)",
                  borderBottom: "1px solid var(--accent)",
                }}
              >
                noahcharnow@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
