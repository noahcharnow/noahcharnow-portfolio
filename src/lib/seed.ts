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
    body: `Huckberry sells outdoor gear to guys who like everyday style and don't mind paying for the good stuff. As Design Director I ran the campaigns that moved it, across email, web, and affiliate, for an audience north of a million.

A lot of the work was the seasonal print catalogs and gift guides. I designed the spreads, which meant figuring out how to make a pizza oven and the watch Arnold Schwarzenegger wore in Predator look like they belonged on the same page. They did, mostly.

Email and web carried the rest of the calendar. New gear every week, a brand voice that stayed put, and enough range to keep a million inboxes opening.`,
    pullQuote: "A pizza oven and Predator's watch, same page.",
    chapterEyebrow: "02 / In print",
    chapterTitle: "The catalog work.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/9e2a015a-f8cf-4248-974b-43221b83c241/08afZvnQ-YF2.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/5ab5a49a-d4a0-4a8b-bd42-480ad3dd4b42/1600x900_AS_HB_CM.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/20ecd6fd-e1e1-4747-a1c7-c3f34307d43d/e2tTqsYAwZ-i.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/f6a15a70-7a97-4eaf-a15d-0d0f91423de9/Email-copy1.gif",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/52861e77-24a5-444a-b416-ffbff7de5ca7/tDJy7sOph5-1.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/f3ec6699-58b4-4f49-8ee6-a491b2f59607/CM1.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/3684d85f-edbb-4c40-bf3d-25d85c693390/DxJ7sGI9zuGo.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595621872147-9YCRPF9GAULLGRTKIYIU/01.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595621889113-BT1XRJPV3GWP7JLCJP0U/02.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595626313396-T2CXQLC7ZIJMHA5T0SMA/03.jpg",
    ],
    captions: {
      3: "Email campaign",
      7: "Seasonal print catalog",
    },
    credits: [
      { label: "Client", name: "Huckberry" },
      { label: "Design Director", name: "Noah Charnow" },
    ],
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
    body: `Chrome makes bags for people who ride bikes in cities. The work was the brand's monthly digital campaigns, a new reason to show up in someone's inbox or on the homepage every few weeks.

My title was senior designer. We didn't have a creative director, so on the monthly campaigns and the daily work, I was one anyway. Pulling the team together, setting the direction, giving the notes, keeping it moving.

The work ran from email and homepage features to full landing pages and product launches. Same brand, a different argument each month, all of it built to sell bags to people already wearing one.`,
    pullQuote: "A new reason to show up, every month.",
    chapterEyebrow: "02 / Every month",
    chapterTitle: "Same brand, new argument.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1597679503670-EQ285K6V8YNPJ56AXE34/1700215_CHROME_2403_HP_Blog_MOCK.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1597701066818-B8EUX5KBJMRWZR16Y448/170112_Wyatte_LP_Desktop_Portfolio-%281%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1597675999156-QM4QS2W6MM5SEBIYVQ9T/email.gif",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1596942678551-2V5XBNLJJ9BVWCPRSAER/Teadwell_Big.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1596998740295-KG6XEUQ4ZEWOR282B3FO/Teadwell_System.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1596594186481-EGEW81M7O259VET8VI9Z/Chrome.jpg",
    ],
    captions: {
      0: "Homepage feature",
      1: "Landing page",
      2: "Email campaign",
    },
    credits: [
      { label: "Client", name: "Chrome Industries" },
      { label: "Senior Designer", name: "Noah Charnow" },
    ],
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
    body: `Incase makes cases and bags for the things people carry. I did layout and print design across the line, from the website graphics that went up daily to the packaging the products shipped in.

It was steady production work. Daily web assets on one end, hangtags and packaging on the other, all of it holding the same clean Incase look.`,
    pullQuote: "Daily web on one end, hangtags on the other.",
    chapterEyebrow: "02 / Off the screen",
    chapterTitle: "Down to the hangtag.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1596593181449-1IXD8PLNK9T43FLFTD8H/Incase_01.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1596593321177-5X30PRSJ93MA0V3BFIRT/Incase_02.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1596566500993-MZIGKGSG5OAOUPKM1VN9/Hangtag_Hero.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1596593691522-LSPXHKKF9ZYICZGSPMT3/Incase_Tags.jpg",
    ],
    captions: {
      0: "Website graphics",
      2: "Hangtag",
      3: "Packaging tags",
    },
    credits: [
      { label: "Client", name: "Incase" },
      { label: "Design", name: "Noah Charnow" },
    ],
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
    body: `Google decided to open retail stores around the world, which meant somebody had to write down how. I worked with a designer and a copywriter to build that system, a playbook flexible enough to travel.

The brief was to keep Google looking like Google in every city while leaving room for each location to feel local. Core identity locked, local experience open. The playbook set the rules for both.

It is a long document. Most of the work was deciding what to make a rule and what to leave to the city.`,
    pullQuote: "Wrote the rules so each city could keep a few of its own.",
    chapterEyebrow: "02 / The system",
    chapterTitle: "One playbook, every city.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071704554-RLDSFSKWM4P92HNONY15/0001.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071704994-XXULXAESQQ5JHRY16H8M/0002.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071709953-IK506A9FVZOX7HZOPZ6Q/0003.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071710121-IX84JQBEQT5BWPIO2QGW/0004.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071719431-PPWGWKXTFA8L9RT5E8CW/0005.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071720271-SKRLZ0B57RTANHQVN0KE/0006.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071721564-EJTPGGCJ4R4PHMKNGVOQ/0007.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071723370-67E8CRI6A2Y39RORQ40E/0008.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071724584-QKP2FI5S8LSHFTF0GXKS/0009.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1707071725723-MMAAO5WPCW9476QJI5W4/0010.jpg",
    ],
    captions: {
      0: "New store playbook, opening pages",
      5: "Playbook spread",
    },
    credits: [
      { label: "Client", name: "Google" },
      { label: "Creative Direction", name: "Noah Charnow" },
    ],
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
    heroImage: "/images/pride-2024/pride-hero.jpg",
    // Native "story" layout (PrideStory): full-bleed facade + storefront gallery
    // + featured Welcome All video + five-up flower grid. Assets in public/.
    story: true,
    headline: "Welcome All",
    eyebrow: "Google Store / Pride 2024 / Retail identity",
    lede: "A floral identity for Pride across Google Store. One system of flowers, rooted in Pride history, scaled to every window.",
    heroCaption: "Google Store flagship / full-facade window application",
    sections: [
      {
        num: "01 / The idea",
        heading:
          "Most Pride retail reaches for the flag. We went to the garden instead.",
        paras: [
          "The identity is built entirely from flowers. Each bloom is a soft gradient shape pulled across the full spectrum, and each one carries a piece of Pride history. Welcome All was the promise. The flowers were how we kept it.",
          "One drawing language held the whole program together, from the in-store screens to the glass on the street.",
        ],
      },
      {
        num: "02 / Storefront",
        heading: "The flowers scaled to architecture.",
        paras: [
          "Applied as window graphics across Google Store locations, the system filled glass facades from sidewalk to ceiling. Same language at every store, from the flagship to the neighborhood shop.",
        ],
      },
      {
        num: "03 / Flower stories",
        heading: "On the screens, each flower got its moment.",
        paras: [
          "Five short films, one per bloom, each pairing the gradient flower with the Pride history behind it. Quiet, looping, no sound. The welcome screen greeted everyone at the door first.",
        ],
      },
    ],
    storefront: [
      { src: "/images/pride-2024/pride-window-2.jpg", tag: "Entrance / Welcome All" },
      { src: "/images/pride-2024/pride-window-1.jpg", tag: "Storefront / Google Store" },
    ],
    featuredVideo: "/videos/pride-2024/welcome-all.mp4",
    featuredVideoTitle: "Welcome All / door screen",
    featuredVideoMeta: "In-store motion · 13s loop",
    flowers: [
      {
        src: "/videos/pride-2024/flower-violets.mp4",
        name: "Violets",
        note: "A token of love between women since Sappho.",
      },
      {
        src: "/videos/pride-2024/flower-lavender.mp4",
        name: "Lavender",
        note: "Shorthand for queer identity for over a century.",
      },
      {
        src: "/videos/pride-2024/flower-pansies.mp4",
        name: "Pansies",
        note: "A slur, reclaimed into a symbol.",
      },
      {
        src: "/videos/pride-2024/flower-carnations.mp4",
        name: "Carnations",
        note: "Oscar Wilde's green carnation, worn as a signal.",
      },
      {
        src: "/videos/pride-2024/flower-roses.mp4",
        name: "Roses",
        note: "The oldest language of love, meant for everyone.",
      },
    ],
    marquee: ["Welcome All", "Flowers rooted in Pride history"],
    credits: [
      { label: "Client", name: "Google" },
      { label: "Design", name: "Basic Agency" },
      { label: "Copywriter", name: "Andrew Couch" },
      { label: "Creative Direction", name: "Noah Charnow" },
    ],
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
    body: `The Stonewall National Monument Visitor Center opened in New York, and Google had an installation inside. My job was the billboard outside, the one announcing the grand opening, matched to the branding of the installation so the two read as one thing.

I led the design and pushed it through our in-house production team to get the artwork print ready against the opening date. Then it went up.

President Biden and Elton John were at the event. The billboard was not technically invited, but it showed up anyway.`,
    pullQuote: "Made presidential work, from a billboard.",
    chapterEyebrow: "02 / Christopher Street",
    chapterTitle: "One opening, one billboard.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/a9953a83-52ce-4320-bb59-e806d600fbef/unnamed+%283%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/230fbfa2-7994-48c9-8998-665dde75fec6/unnamed+%285%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/a330ced0-0336-45b3-b1d7-1edb6f83fc85/unnamed+%287%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/4412dc19-b096-42a0-ab92-dd66312356b9/unnamed+%284%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/43c36907-f403-4a70-907c-ada5667648ef/unnamed+%289%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/c495e642-cff3-4e1d-ac43-f97dd9840aec/unnamed+%288%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/83ad349c-2521-4d7b-bc1d-060dbb5ca5f6/%231038+Google+Approach+6.12.24+post+%28Stonewall%29.JPG",
    ],
    captions: {
      0: "Stonewall Visitor Center, NYC",
    },
    credits: [
      { label: "Client", name: "Google" },
      { label: "Creative Direction", name: "Noah Charnow" },
    ],
  },

  // --- SMALLER WEIRDER THINGS ---
  {
    slug: "somnee",
    title: "Somnee Sleep",
    client: "Somnee",
    role: "Art Direction",
    year: 2025,
    lens: "smaller-weirder-things",
    summary:
      "Paid ad campaign for a 450 dollar sleep wearable. A creative testing framework that pitted problem-solution ads against science-heavy ones, and cleared 5 percent link click-through, around four times the benchmark.",
    quote: "Built a brand for a sleep hat. No regrets.",
    heroImage:
      "https://static1.squarespace.com/static/519d2bc3e4b0f5d1146b0b21/6967c070cbbddd42a25a0d6b/6967cf78c055e87ab26b6ed6/1768500047455/SM.jpg?format=1500w",
    body: `Somnee makes a wearable that helps people sleep, priced past 450 dollars, sold to a market that has heard every sleep claim before. They handed me the paid ad campaign and asked it to move.

The plan was a creative testing framework. One side ran Problem-Solution ads aimed at the pain of chronic insomnia. The other ran Science-Heavy ads built on clinical proof. Then we let the numbers pick a winner.

The numbers were loud. Link click-through cleared 5 percent, around four times the benchmark, with some concepts hitting 7.05 percent. Cost per add-to-cart landed at 38.74 dollars, which is cheap for a 450 dollar product. Most of it came together in a day.`,
    pullQuote: "Sold a 450 dollar sleep gadget to skeptics.",
    chapterEyebrow: "02 / The test",
    chapterTitle: "Two ads, one winner.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412723570-PINH25RVYGG94IUC2XJ7/C0_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412397648-1KQXEDCKF58V98KPNF8P/2B_1.1_A_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412403255-W9UT26ISQZB9ZP3KC5ME/2B_1.1_C_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412434269-ZXFWCNBGB04IDHSL9ISV/2B_1.2_C_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412586103-EF35GADY5IWS14B3KP9U/2B_1.3_A_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412588604-FPK4T6JR58TOQVW99EEU/2B_1.3_B_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412645577-VHV1JQBBZ0FJAYNGNYET/2B_2_B_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412684658-KDCB22H1KHK1OGOCMBA3/2B_3_A_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412723670-RXUQP240Y0BJKP7324TZ/C1.1_A_4_5.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1768412740380-GA35JKX1S5TUZN82KD0J/C3.1_01_4_5.jpg",
    ],
    captions: {
      0: "Ad creative",
      5: "Creative test variant",
    },
    credits: [
      { label: "Client", name: "Somnee" },
      { label: "Art Direction", name: "Noah Charnow" },
    ],
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
    body: `Low Bar is an Oakland dive that does not entirely act like one. Killer cocktails, Chef Matt's Mexican food, and a high-class attitude in a room that still feels like a neighborhood bar. The motto is honest about it: come for the food and drinks, stay for the food and drinks.

I worked with owners Daniel and Matt to build the brand. Friendly neighborhood vibes with a refined edge, which on the page meant bold sans serif type and a flexible system that stretched from menus to neon.

It came out about as good as the corn fritters, which is the highest bar Low Bar sets.`,
    pullQuote: "An upscale dive that knows it's a dive.",
    chapterEyebrow: "02 / The room",
    chapterTitle: "Refined, but still a dive.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/180586cd-99ba-497b-b552-72e3be4792f9/317099794_683459036758535_2268801203122973050_n.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/17ae44bc-75c8-4a9b-9784-fcde41ca65b7/Menu_MOCK_01.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/5f004f20-7670-4702-8004-c80c43f72ece/241345704_280246503584018_7314737480408934963_n+%281%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/28f00512-8b56-4441-a463-95b36861f743/317550689_122869267297776_9108669775489804345_n+%281%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/245a287e-5981-4378-aaaf-a755cc30a649/image000000.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1c05d8bc-a27e-4a20-b0a0-51e0710f136c/152013676_2745533662366188_2043515722785266851_n+%281%29.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/bdf33720-fc86-4e13-8c39-c7376d27fbb3/361611695_18012656551737144_326588598104159611_n.jpg",
    ],
    captions: {
      0: "Low Bar, Oakland",
      1: "Menu design",
    },
    credits: [
      { label: "Client", name: "Low Bar, Oakland" },
      { label: "Owners", name: "Daniel & Matt" },
      { label: "Brand & Identity", name: "Noah Charnow" },
    ],
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
    body: `Upstate is a Huckberry sub-brand for high end linens and bedding, made for the part of the outdoorsman's life that happens indoors. Even the rugged ones have to dry off eventually.

Huckberry brought the idea, I brought the brand identity. They brought a product, I brought the packaging. They brought a budget, I art directed the photoshoot and helped land the launch.

The pitch was simple. Make towels and bedding feel like gear, for guys who already think of everything else that way.`,
    pullQuote: "Gear logic, applied to towels.",
    chapterEyebrow: "02 / Indoors",
    chapterTitle: "Soft goods, rugged pitch.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595020789285-O15RFM6HCNY2IYKDIS6P/Upstate_02.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595020301378-PX02O1BFCJY4ET1090JB/Upstate_Packaing.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595024303606-O2Y9YQ8WWUPU2SL50FPF/Upstate_03.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595025004354-FGOTV2C128KH719FGF3K/Upstate_05.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595025066105-PF0PAL74OAUVIM6BIE1P/Upstate_06.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595024516559-UELC1RY5MUT6TWM7379F/Upstate_04.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595025131572-93DJTQXM5Z1N0RRID4TX/Upstate_07.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595101079967-QYCXZF6XI66MD6R50Y3V/Upstate_Images_2.gif",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595025275743-W8D78ZNECNXS8O7KEX7T/Upstate.jpg",
    ],
    captions: {
      0: "Brand identity",
      1: "Packaging system",
    },
    credits: [
      { label: "Client", name: "Huckberry / Upstate" },
      { label: "Creative Direction", name: "Noah Charnow" },
    ],
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
    body: `Wills is another Huckberry sub-brand, and I ran creative direction across all of it. Identity, product, and the look that held it together.

The work built toward a product launch, from the brand identity down to the landing page that sold it. Second sub-brand, same job as the first, which is its own kind of compliment.`,
    pullQuote: "Second sub-brand, same job, done again.",
    chapterEyebrow: "02 / Round two",
    chapterTitle: "The whole brand, again.",
    gallery: [
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595182660132-EMLOUN1LU6CFS7MMAS9V/Wills_05.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595182712148-MC21Z7Q4AUGG1CE74RSY/Wills_04.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595183040729-R8BY0QATEJ9BKBKU934F/Wills_02.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595183081690-P531LWH2BCNZRJTUIUTY/Wills_06.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595183135659-WBGHPDKCCV1NSTH7X8ZW/Wills_03.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595619565005-0IRORI9YFZOEV9P70WZB/Wills_Landing_Page.jpg",
      "https://images.squarespace-cdn.com/content/v1/519d2bc3e4b0f5d1146b0b21/1595102126394-MOILAGM7A8BYWQ1C5WB3/Wills.jpg",
    ],
    captions: {
      0: "Brand identity",
      5: "Landing page",
    },
    credits: [
      { label: "Client", name: "Huckberry / Wills" },
      { label: "Creative Direction", name: "Noah Charnow" },
    ],
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
    // TODO: KEPT BRIDGED - source page is too sparse: one line of copy ("Creative Direction for Relays Sport Wireless product launch") and only two real content images (packaging front + back). Not enough for a native page. Add gallery assets and body copy, then remove externalLink.
    externalLink: "https://noah-charnow.squarespace.com/work/sol-republic-1-7x3tt",
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
    // TODO: KEPT BRIDGED - source page has 11 real logo marks but ZERO descriptive copy, so a body would have to be invented (against the rules). Image grid only. Write an intro + per-mark captions manually (filenames name real clients: Chanchos, CH/AH, Wills, Upstate, Forty Five, Low Bar, Engage, HCS, JP), then add gallery/body and remove externalLink.
    externalLink: "https://noah-charnow.squarespace.com/work/logos-1-ymrey",
  },
];
