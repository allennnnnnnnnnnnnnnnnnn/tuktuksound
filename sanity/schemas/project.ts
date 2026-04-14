import { defineField, defineType } from "sanity";

const ROLE_OPTIONS = [
  { title: "Sound Design", value: "Sound Design" },
  { title: "Foley", value: "Foley" },
  { title: "Dialogue Edit", value: "Dialogue Edit" },
  { title: "Re-recording Mix", value: "Re-recording Mix" },
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      description: "The name of the film or project",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Auto-generated from the title. Used in the URL: /portfolio/[slug]",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      description: "Release or completion year (e.g. 2024)",
      validation: (Rule) => Rule.required().min(1900).max(2099),
    }),
    defineField({
      name: "genre",
      title: "Genre / Format",
      type: "string",
      description: "e.g. Feature Film, Short Film, Documentary, Art Film",
    }),
    defineField({
      name: "roles",
      title: "Roles",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ROLE_OPTIONS,
        layout: "grid",
      },
      description: "Select all the roles you performed on this project",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "director",
      title: "Director",
      type: "string",
      description: "Director's name",
    }),
    defineField({
      name: "production",
      title: "Production Company",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "One or two sentences. Shown on the portfolio grid cards.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Full project write-up shown on the project detail page.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main image shown on portfolio cards and the project detail hero",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Brief description of the image for accessibility",
            },
          ],
        },
      ],
      description: "Additional stills shown at the bottom of the project page",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (Embed)",
      type: "url",
      description:
        "YouTube or Vimeo embed URL. YouTube: https://www.youtube.com/embed/VIDEO_ID — Vimeo: https://player.vimeo.com/video/VIDEO_ID",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      description: "If checked, this project appears in the Featured section on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first in the portfolio. Leave empty to sort by year.",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "coverImage",
      featured: "featured",
    },
    prepare({ title, year, media, featured }) {
      return {
        title: `${featured ? "★ " : ""}${title}`,
        subtitle: year ? String(year) : "",
        media,
      };
    },
  },
});
