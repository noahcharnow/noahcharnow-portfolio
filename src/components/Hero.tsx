export function Hero() {
  return (
    <section
      className="section section--no-border"
      style={{ paddingTop: 120, paddingBottom: 80 }}
    >
      <div className="container">
        <p
          className="eyebrow"
          style={{ marginBottom: 32 }}
        >
          Creative Director / San Diego / Available
        </p>
        <h1 className="hero-display">
          Brand systems, campaigns,<br />
          and the rest.
        </h1>
        <p
          className="sub-headline"
          style={{
            marginTop: 48,
            maxWidth: 720,
            color: "var(--ink-soft)",
          }}
        >
          Fifteen years inside the brand teams at Fitbit, Heath Ceramics,
          Huckberry, Chrome Industries, and Sol Republic. Now freelance.
        </p>
      </div>
    </section>
  );
}
