export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--ink)",
        padding: "48px 0",
        background: "var(--paper)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}
      >
        <span>© Noah Charnow {new Date().getFullYear()}</span>
        <div style={{ display: "flex", gap: 32 }}>
          <a href="https://www.linkedin.com/in/noahcharnow" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a
            href="https://www.etsy.com/shop/noahcharnow"
            target="_blank"
            rel="noreferrer"
          >
            Etsy
          </a>
          <a href="mailto:noah@noahcharnow.com">Email</a>
        </div>
        <span>San Diego / Available</span>
      </div>
    </footer>
  );
}
