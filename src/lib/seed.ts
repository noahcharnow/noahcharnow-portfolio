import type { Project } from "@/types";

/**
 * Seed projects. Native (locally-rendered) project pages: McLaren, Heath Ceramics.
 * All other projects redirect to their Squarespace page via `externalLink`
 * until they're built out natively.
 */
export const SEED_PROJECTS: Project[] = [
  // --- BIG BRANDS ---
  {
    slug: "fitbit",
    title: "Fitbit",
    client: "Fitbit / Google",
    role: "Creative Lead",
    year: 2023,
    lens: "big-brands",
    summary:
      "Brand guidelines, Fall 2022 style guide, POP lookbook, and social content for Fitbit under Google.",
    quote: "Made Google's least Google thing.",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/186f5433-edc3-428b-b23d-e770216f0e68/Frame+8.png",
    body: `Google bought Fitbit and then needed Fitbit to still look like Fitbit. That was the brief, more or less. Keep the brand people already trusted, work in enough Google to show who owned it now, and stop well before a fitness tracker started to feel like a settings menu.

What we landed on was an 80/20 split. Eighty percent Fitbit, twenty percent Google, enough of both that nobody squinted at the shelf trying to figure out what they were holding. The first real test was Fall 2022: four products that were never meant to launch together, each with its own visual identity, all shipping at once. I built the style guide that made them behave like one family, then carried it across web, email, retail fixtures, and digital ads until the whole season matched.

Retail was the part that fought back. Nobody walks over to a Fitbit display looking for a Google watch, so the point of purchase lookbook had to seat both brands on one fixture without either one elbowing the other off. Social I art directed on set, knocking out multiple shots a day with Han and Haley. The system held. Largely because somebody had to keep holding it, and that was me.`,
    pullQuote: "Enough Google to belong, enough Fitbit to survive.",
    chapterEyebrow: "02 / On the shelf",
    chapterTitle: "Two brands, one shelf.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1706470630433-L79KDAO6AM70FSHYTB55/01.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1706470642769-P3GP5E1O70WPM5J7KQP3/09.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1706577904211-9V31DCF2UIV647KS9E6F/0005.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1706577908668-NCPNXT3CO34KLSNHWF4D/0012.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1706631646813-E4P4PLT2957Y6JEJQ16Z/F23_POP_Lookbook_FINAL_083023_page-0004.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1706631670863-2BVSQI3AK11W2ZAAW9YA/F23_POP_Lookbook_FINAL_083023_page-0010.jpg",
      "/videos/Fitbit_Retail_Display_01.mp4",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/cd049887-ace9-4a5a-b8bf-be8fe43889ca/IMG_2973.png",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/efce39b8-c770-4ca2-b261-d643d0a499da/IMG_2975.png",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/ffdd598f-96a6-41ad-99ab-ae6faaeec58b/IMG_2977.png",
    ],
    captions: {
      1: "Brand guidelines, 80/20 system",
      3: "Fall 2022 style guide",
      5: "Point of purchase lookbook",
      8: "Social shoot, art directed on set",
    },
    credits: [
      { label: "Client", name: "Fitbit / Google" },
      { label: "Creative Lead", name: "Noah Charnow" },
      { label: "Art Direction", name: "Han Nguyen" },
      { label: "Art Direction", name: "Haley Bergman" },
    ],
  },
  {
    slug: "heath-ceramics",
    title: "Heath Ceramics",
    client: "Heath Ceramics",
    role: "Senior Designer",
    year: 2013,
    lens: "big-brands",
    summary:
      "Rebuilt the brand's web presence with Basic Agency, then ran the creative team that populated it. Off-screen work followed: signage, windows, packaging, print catalogs.",
    quote: "Got my hands dirty. Literally.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c071777457389a3afff3/1768407153355/Heath.jpg?format=2500w",
    body: `Happy Gilmore once said, "Hey, why don't I just go eat some hay, make things out of clay, lay by the bay? I just may!" And that's exactly what I did metaphorically during my time at the historic brand who's been pumping things out of clay since 1948.

Instead of eating hay, I led a team of in-house designers and contractors. Instead of making things out of clay, I was making creative strategies for Heath's first ever non-clay goods like cut and sew bags, flatware, and more. Instead of laying by the bay I shot lifestyle and product photography, created packaging systems, a brand identity system for Heath's sub-brands, built design systems for various events, and crafted a variety of print material, retail graphics, and web assets.

I grew up in a high school ceramics studio. Took the class all four years until my teacher stopped giving me assignments. Working at Heath felt like designing for a brand I was already inside of. The discipline of making things that have to live in a hand, on a wall, in a window. Not a screen.`,
    pullQuote: "Some things won't fit on a screen.",
    chapterEyebrow: "02 / Off-screen",
    chapterTitle: "In the hand.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595972451879-RJTLVR1HJ55B7A6BDW1Q/Heath.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595891620582-EXVU4OX71CA7F1XDO9AQ/Heath_Poster.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595891712788-JBBJGOQH8SGVR4NJQ7CO/65563235_501036683983348_8154760254124446794_n.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595973282275-KMQOZ2XLLAS39QD5RHRN/heathsews_65300437_178635499819258_1534915944353552083_n.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595812686279-3W70N4F65RHRC6HAURIW/Heath_Clay_Studio_BiFold.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595812774608-JNZONK34T9I3KRZKI1TS/Heath_Sews_BiFold.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595973154159-NCHUZVG5OGWN8K02DION/Heath.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595891620582-EXVU4OX71CA7F1XDO9AQ/Heath_Poster.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595973478795-MJGK4DQR4H641MT2VFWN/IMG_0885.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595972451879-RJTLVR1HJ55B7A6BDW1Q/Heath.jpg",
    ],
    captions: {
      1: "Print campaign, 2013",
      4: "Clay Studio bifold catalog",
      5: "Heath Sews bifold catalog",
      8: "Behind the scenes",
    },
    credits: [
      { label: "Client", name: "Heath Ceramics" },
      { label: "Partner Agency", name: "Basic" },
      { label: "Collaborator", name: "House Industries" },
      { label: "Senior Designer", name: "Noah Charnow" },
    ],
  },
  {
    slug: "huckberry",
    title: "Huckberry",
    client: "Huckberry",
    role: "Design Director",
    year: 2019,
    lens: "big-brands",
    summary:
      "Email, web, and affiliate campaigns for over a million guys getting outfitted and inspired for their next move.",
    quote: "Sold a lot of pants to bearded men.",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/bd216ee8-1db8-418d-b19a-14261429daaf/c77zeaPlj1nZ.jpg",
    externalLink: "https://noahcharnow.com/work/huckberry-n9d4g",
  },
  {
    slug: "chrome-industries",
    title: "Chrome Industries",
    client: "Chrome Industries",
    role: "Senior Designer",
    year: 2016,
    lens: "big-brands",
    summary:
      "Monthly digital campaigns and full brand oversight for the bike-bag maker.",
    quote: "Bags. For bikes. For bars.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c072a756fd2a42c2674f/1768407155145/Chrome.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/chrome-industries-1-2s6cr",
  },
  {
    slug: "incase",
    title: "Incase",
    client: "Incase",
    role: "Design",
    year: 2015,
    lens: "big-brands",
    summary:
      "Layout and print design for daily website graphics through to packaging.",
    quote: "Made the case for cases.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c072d17db30d32fe6f3e/1768407154889/Incase.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/incase-1-btk4g",
  },
  {
    slug: "google-store-playbook",
    title: "Google New Store Playbook",
    client: "Google",
    role: "Creative Direction",
    year: 2024,
    lens: "big-brands",
    summary:
      "Retail playbook for Google's new store rollouts. Visual standards, in-store moments, the works.",
    quote: "Wrote the rules. Some people followed them.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c072777457389a3afffa/1768407154643/IMG_5011.JPG?format=1500w",
    externalLink: "https://noahcharnow.com/work/google-1-ytl59",
  },

  // --- BIG CAMPAIGNS ---
  {
    slug: "mclaren",
    title: "Google x McLaren",
    client: "Via @mclaren on IG",
    role: "Creative Direction & Design",
    year: 2024,
    lens: "big-campaigns",
    summary:
      "24 hours, zero brief, Lando Norris, and a McLaren race car. Pitched, designed, and got Pixel graphics track-ready on the fly.",
    quote: "Designed a race car overnight. No notes.",
    accent: "#EE4D1B",
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/6055e18f-ce17-4555-84a3-a92b8ef26cf8/GczhZhXbcAAsQWD.jpg?format=2500w",
    video: "/videos/mclaren-hero.mp4",
    body: `24 hours, zero brief, Lando Norris, and a McLaren race car.

We had one day to turn "put Google Pixel on the car" into an actual designed graphics package the car wears on track. Pitched the creative, designed it, sent it to McLaren overnight, and the car was on track the next day wearing it.

Evidently, "yesterday" is a real deadline in the world of creating graphics for race cars. Who knew.`,
    pullQuote: "No briefing. No asset library. No second draft.",
    chapterEyebrow: "02 / Selected",
    chapterTitle: "On track.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/8994f541-7dda-44f6-b6aa-dc77bb1157dc/GczhZhWaAAAVIbG.jpeg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1739992999564-6HYIWDVBFRY5O6P9I5L4/1.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1739992999737-KWJRU1M7K4YA8D576BSL/2.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1739993001092-CDFZL6MM6YC1P8KXM4LR/3.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/8fe009f0-f75e-4b1e-a5a0-23d3468835ba/GczhZhLbcAQ2yJF.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1739993001265-QNK0BJ093SXZZCW9J5BH/4.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1739993002191-4KOAP9WHI4HRFCD7KCL2/5.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1739993002634-EXYS98ZJ30T2G53V2PGU/6.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1739993003288-X02TZBQQDPKIUOQRAX5T/7.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/cc2f70bd-e556-46bd-9ffc-0af4d7610d37/GczhZhPbcAM51kf.jpeg?format=2500w",
    ],
    captions: {
      0: "Pixel x McLaren livery, Las Vegas GP, 2024",
      2: "Graphics package, sheet 02",
      4: "Wrap detail, mid-stint",
      7: "Pit lane, race morning",
    },
    credits: [
      { label: "Client", name: "Google" },
      { label: "Partner", name: "McLaren Racing" },
      { label: "Talent", name: "Lando Norris" },
      { label: "Creative Direction", name: "Noah Charnow" },
    ],
  },
  {
    slug: "pride-2024",
    title: "Google Pride 2024",
    client: "Google",
    role: "Creative Direction",
    year: 2024,
    lens: "big-campaigns",
    summary:
      "Stepped into a half-finished Pride retail campaign, perked up the flowers, and got it out the door with Basic Agency.",
    quote: "Picked up where the last guy left off.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c070a756fd2a42c26747/1768407153118/PXL_20240531_083919169.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/pride-2024-fr9s7",
  },
  {
    slug: "stonewall",
    title: "Stonewall Powered by Google",
    client: "Google",
    role: "Creative Direction",
    year: 2024,
    lens: "big-campaigns",
    summary:
      "Led the NYC billboard for the Stonewall National Monument Visitor Center's grand opening, matched to the in-venue Google installation.",
    quote: "Yelled at New York from a billboard.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c071cbbddd42a25a0d75/1768407153619/unnamed+%286%29.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/stonewall-scdx4",
  },

  // --- SMALLER WEIRDER THINGS ---
  {
    slug: "somnee",
    title: "Somnee Sleep",
    client: "Somnee",
    role: "Brand System",
    year: 2024,
    lens: "smaller-weirder-things",
    summary:
      "Brand system for a sleep-tech startup. Off-the-beaten-path territory and exactly the kind of weird I like.",
    quote: "Built a brand for a sleep hat. No regrets.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967cf78c055e87ab26b6ed6/1768500047455/SM.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/somnee",
  },
  {
    slug: "low-bar",
    title: "Low Bar",
    client: "Low Bar, Oakland",
    role: "Brand & Identity",
    year: 2020,
    lens: "smaller-weirder-things",
    summary:
      "Brand work for Oakland's hidden gem. An upscale dive that makes putting on pants feel good.",
    quote: "Helped a dive bar pretend it wasn't a dive bar.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c071777457389a3afff8/1768407154130/LB.gif?format=1500w",
    externalLink: "https://noahcharnow.com/work/lowbar-yt87n",
  },
  {
    slug: "upstate",
    title: "Upstate",
    client: "Huckberry / Upstate",
    role: "Creative Direction",
    year: 2018,
    lens: "smaller-weirder-things",
    summary:
      "Huckberry sub-brand for high-end linens and bedding. Even the manliest of men have to dry off eventually.",
    quote: "Fancy towels for outdoorsy guys.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c073d17db30d32fe6f40/1768407155394/Upstate_Cover.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/upstate-cszd6",
  },
  {
    slug: "wills",
    title: "Wills",
    client: "Huckberry / Wills",
    role: "Creative Direction",
    year: 2018,
    lens: "smaller-weirder-things",
    summary:
      "Huckberry sub-brand. Oversaw all aspects of the brand and led a successful product launch.",
    quote: "Second verse, same as the first.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c073a756fd2a42c26750/1768407155645/Wills_Cover.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/wills-4y9jw",
  },

  // --- THE REST ---
  {
    slug: "sol-republic",
    title: "Sol Republic",
    client: "Sol Republic",
    role: "Creative Direction",
    year: 2016,
    lens: "the-rest",
    summary:
      "Creative direction for the Relays Sport Wireless product launch.",
    quote: "Headphones that wanted to be loud about being loud.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c072cbbddd42a25a0d78/1768407154391/SR.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/sol-republic-1-7x3tt",
  },
  {
    slug: "logos",
    title: "Logos",
    client: "Various",
    role: "Identity",
    year: 2022,
    lens: "the-rest",
    summary:
      "A grab bag of logo and identity marks across years and clients.",
    quote: "A bunch of marks. From a bunch of years.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967c073d17db30d32fe6f41/1768407155893/11_Logo.jpg?format=1500w",
    externalLink: "https://noahcharnow.com/work/logos-1-ymrey",
  },
];
