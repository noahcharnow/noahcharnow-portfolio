import { sanityClient, isSanityConfigured } from "@/sanity/client";
import { ALL_PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY } from "@/sanity/queries";
import { SEED_PROJECTS } from "@/lib/seed";
import type { Project } from "@/types";

export async function getAllProjects(): Promise<Project[]> {
  if (!isSanityConfigured || !sanityClient) {
    return SEED_PROJECTS;
  }
  try {
    const data = await sanityClient.fetch<Project[]>(ALL_PROJECTS_QUERY);
    return data?.length ? data : SEED_PROJECTS;
  } catch (err) {
    console.warn("[sanity] fetch failed, using seed data:", err);
    return SEED_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSanityConfigured || !sanityClient) {
    return SEED_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
  try {
    const data = await sanityClient.fetch<Project | null>(
      PROJECT_BY_SLUG_QUERY,
      { slug },
    );
    return data ?? SEED_PROJECTS.find((p) => p.slug === slug) ?? null;
  } catch (err) {
    console.warn("[sanity] project fetch failed, using seed data:", err);
    return SEED_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
}
