import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

// These env vars are set in .env.local and on Vercel
const projectId = 'rsklboh3'
const dataset = 'production'

export default defineConfig({
  // The basePath must match the Next.js route where Studio is mounted
  basePath: "/studio",

  projectId,
  dataset,
  title: "TukTuk Studio CMS",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings — only one document, no list view
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Site Settings")
              ),

            S.divider(),

            // Projects list
            S.listItem()
              .title("Projects")
              .schemaType("project")
              .child(S.documentTypeList("project").title("All Projects")),
          ]),
    }),

    // GROQ query explorer — helpful for debugging
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
