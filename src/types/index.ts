export type LensId =
  | "big-brands"
  | "big-campaigns"
  | "smaller-weirder-things"
  | "the-rest";

export type Lens = {
  id: LensId;
  title: string;
  blurb: string;
};

export type Credit = {
  /** Role label, e.g. "Photography", "Partner Agency", "Copywriter" */
  label: string;
  /** Name or company, e.g. "Anthony Cao", "Basic Agency" */
  name: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  role: string;
  year: number;
  lens: LensId;
  summary: string;
  /** One-line Brand Daddy aside that appears below the title on hover. */
  quote?: string;
  /** Hero image URL (Squarespace CDN, Sanity, or local /public path). */
  heroImage: string;
  /** Optional full-bleed video URL. Renders as an editorial body section. */
  video?: string;
  /** Optional case study body. Paragraphs separated by blank lines. */
  body?: string;
  /** Optional gallery image URLs. */
  gallery?: string[];
  /** Optional captions for gallery images, keyed by index. */
  captions?: Record<number, string>;
  /** Optional pull quote shown as an editorial moment between image groups. */
  pullQuote?: string;
  /** Optional chapter title shown on the full-bleed chapter break section. */
  chapterTitle?: string;
  /** Optional chapter eyebrow text (e.g. "02 / SELECTED FRAMES"). */
  chapterEyebrow?: string;
  /** Optional credits list shown near the bottom of the project page. */
  credits?: Credit[];
  /** Optional accent color for the project page, hex. */
  accent?: string;
  /** Optional external link if the case study lives elsewhere. */
  externalLink?: string;
};
