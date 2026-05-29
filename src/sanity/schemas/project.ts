import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Designer, Creative Direction, Brand System, etc.",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (r) => r.required().min(2000).max(2099),
    }),
    defineField({
      name: "lens",
      title: "Lens",
      type: "string",
      options: {
        list: [
          { title: "Big Brands", value: "big-brands" },
          { title: "Big Campaigns", value: "big-campaigns" },
          { title: "Smaller Weirder Things", value: "smaller-weirder-things" },
          { title: "The Rest", value: "the-rest" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "One or two lines. Shows in the project list and hover preview.",
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "body",
      title: "Case study body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "accent",
      title: "Accent color (hex)",
      type: "string",
      description: "Optional. Overrides Signal Orange on the project page.",
    }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "url",
      description: "Fallback URL while project page is still on Squarespace.",
    }),
  ],
  preview: {
    select: { title: "title", client: "client", media: "heroImage" },
    prepare: ({ title, client, media }) => ({
      title,
      subtitle: client,
      media,
    }),
  },
});
