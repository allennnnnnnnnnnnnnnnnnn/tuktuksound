import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface Credit {
  year: string;
  title: string;
  role: string;
}

export interface SiteSettings {
  _id: string;
  studioName: string;
  homepageTitle: string;
  homepageSubtitle?: string;
  heroImage?: SanityImage;
  aboutTitle?: string;
  aboutRole?: string;
  aboutBody?: PortableTextBlock[];
  aboutLocation?: string;
  aboutFormat?: string;
  aboutDaw?: string;
  aboutExpertise?: string[];
  aboutCredits?: Credit[];
  contactEmail?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  genre?: string;
  roles: string[];
  director?: string;
  production?: string;
  shortDescription: string;
  fullDescription?: PortableTextBlock[];
  coverImage: SanityImage;
  galleryImages?: SanityImage[];
  videoUrl?: string;
  featured: boolean;
  sortOrder?: number;
}
