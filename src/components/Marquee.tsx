type MarqueeProps = {
  items: string[];
  variant?: "default" | "alt";
};

export function Marquee({ items, variant = "default" }: MarqueeProps) {
  const set = (
    <div className="marquee-set">
      {items.map((item, i) => (
        <span key={`set-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 40 }}>
          <span>{item}</span>
          <span className="marquee-dot" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee${variant === "alt" ? " marquee--alt" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {set}
        {set}
        {set}
      </div>
    </div>
  );
}
