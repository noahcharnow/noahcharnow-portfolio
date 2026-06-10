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

  /**
   * Opt-in flag for the bespoke "story" layout (full-bleed hero + storefront
   * gallery + featured video + five-up flower grid). Rendered by PrideStory
   * through the same /work/[slug] route and seed-data wiring as every other
   * native project; the fields below only apply when this is set.
   */
  story?: boolean;
  /** Giant hero headline for the story layout; falls back to `title`. */
  headline?: string;
  /** Lede paragraph shown beside the title on the story hero. */
  lede?: string;
  /** Caption under the full-bleed hero image (story layout). */
  heroCaption?: string;
  /** Eyebrow line above the title (e.g. "Google Store / Pride 2024 / Retail identity"). */
  eyebrow?: string;
  /** Numbered editorial sections for the story layout. */
  sections?: StorySection[];
  /** Storefront gallery: first item spans full width, the rest pair up below. */
  storefront?: StoreShot[];
  /** Featured video shown full width above the flower grid. */
  featuredVideo?: string;
  /** Caption title for the featured video (e.g. "Welcome All / door screen"). */
  featuredVideoTitle?: string;
  /** Caption meta for the featured video (e.g. "In-store motion · 13s loop"). */
  featuredVideoMeta?: string;
  /** Five-up looping video grid, one entry per bloom. */
  flowers?: Flower[];
  /** Marquee phrases scrolled in the accent band. */
  marquee?: string[];
};

export type StorySection = {
  /** Mono section number, e.g. "01 / The idea". */
  num: string;
  /** Heading. Wrap a phrase in **double asterisks** to give it the hand-drawn marker underline. */
  heading: string;
  /** Body paragraphs. */
  paras: string[];
};

export type StoreShot = {
  src: string;
  /** Corner tag overlaid on the image, e.g. "Install / Mountain View". */
  tag?: string;
};

export type Flower = {
  src: string;
  name: string;
  note: string;
};
