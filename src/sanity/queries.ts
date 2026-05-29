import { groq } from "next-sanity";

export const ALL_PROJECTS_QUERY = groq`
  *[_type == "project"] | order(year desc, _createdAt desc) {
    "slug": slug.current,
    title,
    client,
    role,
    year,
    lens,
    summary,
    "heroImage": heroImage.asset->url,
    accent,
    externalLink
  }
`;

export const PROJECT_BY_SLUG_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    client,
    role,
    year,
    lens,
    summary,
    body,
    "heroImage": heroImage.asset->url,
    "gallery": gallery[].asset->url,
    accent,
    externalLink
  }
`;

export const ALL_SLUGS_QUERY = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;
