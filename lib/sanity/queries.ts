import { client } from "./client";
import type { SiteSettings, Project } from "./types";

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  _id, studioName, homepageTitle, homepageSubtitle, heroImage,
  aboutTitle, aboutRole, aboutBody, aboutLocation, aboutFormat, aboutDaw,
  aboutExpertise, aboutCredits,
  contactEmail, instagramUrl, facebookUrl
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
}

const PROJECT_FIELDS = `_id, title, slug, year, genre, roles, director, production, shortDescription, coverImage, featured, sortOrder`;

export async function getAllProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project"] | order(sortOrder asc, year desc) { ${PROJECT_FIELDS} }`,
    {}, { next: { revalidate: 60 } }
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    `*[_type == "project" && featured == true] | order(sortOrder asc, year desc)[0...3] { ${PROJECT_FIELDS} }`,
    {}, { next: { revalidate: 60 } }
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!slug) return null;
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, year, genre, roles, director, production,
      shortDescription, fullDescription, coverImage, galleryImages, videoUrl, featured, sortOrder
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
    {}, { next: { revalidate: 60 } }
  );
  return results.map((r) => r.slug);
}

export async function getAllSoundLibraries() {
  return client.fetch(
    `*[_type == "soundLibrary"] | order(sortOrder asc) {
      _id, title, slug, description, coverImage, downloadUrl,
      releaseYear, trackCount, fileFormat
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}
