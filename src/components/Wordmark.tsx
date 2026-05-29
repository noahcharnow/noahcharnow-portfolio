import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 17,
        letterSpacing: "-0.025em",
      }}
      aria-label="Noah Charnow, home"
    >
      <span
        aria-hidden="true"
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--accent)",
          animation: "wordmark-pulse 2.4s ease-in-out infinite",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      <span>Noah Charnow</span>
      <style>{`
        @keyframes wordmark-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </Link>
  );
}
