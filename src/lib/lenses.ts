import type { Lens } from "@/types";

export const LENSES: Lens[] = [
  {
    id: "big-brands",
    title: "Big Brands",
    blurb: "Brand systems for companies people have heard of.",
  },
  {
    id: "big-campaigns",
    title: "Big Campaigns",
    blurb: "The moments where a brand had to show up loudest.",
  },
  {
    id: "smaller-weirder-things",
    title: "Smaller Weirder Things",
    blurb: "Side quests, oddballs, and things that needed a hand.",
  },
  {
    id: "the-rest",
    title: "The Rest",
    blurb: "Honest enough to be its own category.",
  },
];

export function getLens(id: string): Lens | undefined {
  return LENSES.find((l) => l.id === id);
}
