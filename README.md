# Noah Charnow Portfolio

The next version of noahcharnow.com. Replaces the Squarespace site with a Next.js + Sanity + Netlify build.

## What's in here

- **Next.js 15** (App Router, TypeScript, React 19 RC)
- **Sanity** for content (embedded studio at `/studio`)
- **Framer Motion** for the cursor-follow preview
- **Switzer + JetBrains Mono** loaded from Fontshare / Google Fonts
- Hand-written CSS with brand tokens. No Tailwind.

Brand tokens follow the `noah-charnow-brand` skill, with one deliberate divergence: the canvas color is `#FAF9F4` (near-white warm) instead of the default paper cream `#F4EFE6`. This is the portfolio-specific variant. Everything else (Signal Orange `#EE4D1B`, Deep Ink `#0F0E0D`, Switzer, JetBrains Mono, hairline borders, no em dashes, pulsing dot wordmark) stays.

## Architecture

```
src/
├── app/
│   ├── layout.tsx              root layout, metadata, fonts
│   ├── page.tsx                homepage
│   ├── globals.css             tokens, type scale, marquee, base
│   ├── studio/[[...tool]]/     embedded Sanity Studio at /studio
│   └── work/[slug]/            dynamic project pages
├── components/
│   ├── Nav.tsx                 sticky top nav with wordmark
│   ├── Wordmark.tsx            name + pulsing orange dot
│   ├── Hero.tsx                top of page, big display headline
│   ├── Marquee.tsx             horizontal scrolling text bar
│   ├── LensBar.tsx             the 4-lens nav (Big Brands, etc)
│   ├── WorkSection.tsx         lens orchestration + cursor reveal
│   ├── About.tsx               about block
│   └── Footer.tsx              mono links + location
├── sanity/
│   ├── client.ts               next-sanity client, image url builder
│   ├── queries.ts              GROQ queries
│   └── schemas/
│       ├── index.ts
│       └── project.ts          project document schema
├── lib/
│   ├── lenses.ts               the 4 lens definitions (hard-coded)
│   ├── projects.ts             data layer with Sanity → seed fallback
│   └── seed.ts                 local project data (used pre-Sanity)
└── types/index.ts              shared TS types
```

## Setup (first time)

```bash
# 1. Install
npm install

# 2. Copy env file (Sanity vars are optional for first launch)
cp .env.local.example .env.local

# 3. Run dev server
npm run dev
```

The site will boot at `http://localhost:3000` using local seed data. The 8 projects from the current Squarespace site are pre-loaded across the four lenses.

## Wiring Sanity (when ready)

1. Create a free Sanity project at [sanity.io](https://sanity.io). Pick "production" as the dataset name.
2. Grab the Project ID from your Sanity dashboard.
3. Paste it into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
4. Restart `npm run dev`.
5. Go to `http://localhost:3000/studio` to manage projects. The schema is already wired up. Add your projects one at a time, upload hero images directly in the studio.
6. The site will switch from seed data to Sanity automatically the moment a project ID is present.

You can keep seed data in place as a safety net. The data layer falls back to seed automatically if Sanity is unreachable.

## Deploying to Netlify

1. Push this repo to GitHub.
2. Connect the repo to Netlify (New site from Git).
3. Netlify will detect the `netlify.toml` and the Next.js plugin.
4. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to Netlify's environment variables (Site settings → Build & deploy → Environment).
5. Point `noahcharnow.com` at the Netlify site once the Porkbun transfer finishes.

## The cursor-follow preview

`WorkSection.tsx` is one client component that holds three pieces of shared state: the active lens, the hovered row index, and a Framer Motion spring tracking the mouse position. The preview image is a fixed-position element offset 24px right and 120px above the cursor. Hovering a row sets the index; leaving the list nulls it; the spring values stay smooth via stiffness/damping tuned to feel like Snellenberg's, not stiff like a tooltip.

Tweaking knobs are in the file: `stiffness`, `damping`, and the position offset (`mouseX.set(e.clientX + 24)`).

## Adding a project

**With Sanity wired up**: open `/studio`, click "Project" in the sidebar, fill in the form, publish.

**Without Sanity** (during early dev): add an entry to `src/lib/seed.ts`. The shape is documented in `src/types/index.ts`.

## Migrating from Squarespace

Each project in the seed list currently links to its existing Squarespace URL via `externalLink`. When a project gets a real page in this site, delete the `externalLink` field and the project page route will render natively instead of redirecting.

Order of operations to fully cut over:
1. Get this deployed to Netlify on a temp domain (e.g. `noahcharnow.netlify.app`).
2. Move the Porkbun domain DNS to point at Netlify.
3. Build out real project pages one at a time, removing `externalLink` as each lands.
4. Once all 8 are on the new site, decommission the Squarespace site.

## Things that are intentionally stubbed

- Project pages currently show metadata + hero image + a "Full case study coming soon" stub. The case study body will come from Sanity's Portable Text once you start authoring inside the studio.
- No analytics yet. Add Plausible or Vercel Analytics when you're ready.
- No contact form. Footer mailto handles inbound for now.
- Images for seed data are referenced at `/images/*.jpg` paths but the files aren't included. Either drop hero JPGs into `public/images/` or wire up Sanity for real assets. Until then the cursor-preview will show empty frames.

## Domain note

The Porkbun transfer of noahcharnow.com (Order ID 10397347) is in progress. Once it lands, point an A record at Netlify's load balancer and add the domain in Netlify site settings. Squarespace can be cancelled the day this site goes live there.
