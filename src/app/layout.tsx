import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://noahcharnow.com"),
  title: {
    default: "Noah Charnow / Creative Director",
    template: "%s / Noah Charnow",
  },
  description:
    "Noah Charnow is a freelance creative director in San Diego. Fifteen years of brand work for Fitbit, Heath Ceramics, Huckberry, Chrome Industries, and others.",
  openGraph: {
    title: "Noah Charnow / Creative Director",
    description: "Brand systems, campaigns, and the rest.",
    url: "https://noahcharnow.com",
    siteName: "Noah Charnow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noah Charnow / Creative Director",
    description: "Brand systems, campaigns, and the rest.",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
