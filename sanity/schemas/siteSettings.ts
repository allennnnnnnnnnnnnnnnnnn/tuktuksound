import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Makes this a singleton — only one document of this type allowed
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({
      name: "studioName",
      title: "Studio Name",
      type: "string",
      description: "Displayed in the navbar and page titles (e.g. TukTuk Studio)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homepageTitle",
      title: "Homepage Title",
      type: "string",
      description: "The large hero title on the homepage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homepageSubtitle",
      title: "Homepage Subtitle",
      type: "string",
      description: "The tagline below the hero title (e.g. Film Sound Design & Post-Production)",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      description: "Optional: replaces the dark gradient background on the homepage hero",
      options: { hotspot: true },
    }),
    defineField({
      name: "aboutTitle",
      title: "About Page — Title",
      type: "string",
      description: "Large heading on the About page",
    }),
    defineField({
      name: "aboutBody",
      title: "About Page — Body Text",
      type: "array",
      of: [{ type: "block" }],
      description: "Main bio text on the About page. Use the toolbar to add bold, italics, etc.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Email shown on the Contact page and footer (e.g. hello@tuktuksound.com)",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      description: "Full Instagram profile URL (e.g. https://instagram.com/tuktuksound)",
    }),
    defineField({
      name: "imdbUrl",
      title: "IMDb URL",
      type: "url",
      description: "Full IMDb profile URL",
    }),
    defineField({
      name: "vimeoUrl",
      title: "Vimeo URL",
      type: "url",
      description: "Full Vimeo profile URL",
    }),
  ],
  preview: {
    select: { title: "studioName" },
    prepare({ title }) {
      return { title: title || "Site Settings" };
    },
  },
});
