export interface Project {
  slug: string;
  title: string;
  year: number;
  role: string[];
  genre: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  stills: string[];
  videoUrl: string;
  director: string;
  production: string;
}

export const projects: Project[] = [
  {
    slug: "last-light",
    title: "Last Light",
    year: 2024,
    role: ["Sound Design", "Re-recording Mix"],
    genre: "Feature Film",
    description:
      "A slow-burn thriller set across the rural landscapes of Jeju Island, where silence becomes the most terrifying weapon.",
    longDescription:
      "Last Light required building a sonic world from near-silence — the sparse, wind-swept texture of Jeju Island's coastline forming the film's emotional foundation. Every creak, distant wave, and breath was meticulously crafted to serve the story's creeping dread. The final mix was completed in Dolby Atmos, placing the audience inside the protagonist's unraveling psyche.",
    thumbnail:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    stills: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Park Ji-won",
    production: "Hive Pictures",
  },
  {
    slug: "quiet-frequency",
    title: "Quiet Frequency",
    year: 2024,
    role: ["Foley", "Dialogue Editing"],
    genre: "Short Film",
    description:
      "A deaf musician's journey to compose her final symphony — told entirely through vibration, texture, and felt sound.",
    longDescription:
      "Quiet Frequency presented an extraordinary challenge: how do you design sound for a film about a character who cannot hear? The approach was to craft sound from her physical perspective — vibrations through floors, resonance through surfaces, the tactile sensation of music. Foley was recorded using unconventional materials to capture how sound 'feels' rather than how it sounds.",
    thumbnail:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    stills: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Kim Soo-yeon",
    production: "Murmur Films",
  },
  {
    slug: "iron-season",
    title: "Iron Season",
    year: 2023,
    role: ["Sound Design", "Foley", "Re-recording Mix"],
    genre: "Feature Film",
    description:
      "A war epic spanning three generations — the soundscape of trauma, memory, and an impossible homecoming.",
    longDescription:
      "Iron Season demanded a layered approach to historical sound design, reconstructing the acoustic environments of three distinct time periods. Period-accurate weapons, vehicles, and ambiences were sourced and custom-built. The modern sequences contrast deliberately with hyper-clean, almost sterile sound design — the scrubbed, numb quality of someone who has forgotten how to feel.",
    thumbnail:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80",
    stills: [
      "https://images.unsplash.com/photo-1517976384346-3136801d605d?w=1200&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Choi Dong-hoon",
    production: "Stone & Salt Productions",
  },
  {
    slug: "the-cartographer",
    title: "The Cartographer",
    year: 2023,
    role: ["Dialogue Editing", "Sound Design"],
    genre: "Documentary",
    description:
      "A meditative documentary following an elderly mapmaker on his final expedition into unmapped territory.",
    longDescription:
      "The Cartographer required preserving the intimacy of field recordings captured in remote locations across Mongolia and northern China. Dialogue editing focused on maintaining the authenticity of these environments while ensuring clarity. Ambient design layered the vast, breathing quality of open landscapes against the fragile sounds of the mapmaker's tools and movements.",
    thumbnail:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
    stills: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Lee Yeon-ji",
    production: "Compass Documentary",
  },
  {
    slug: "pale-architecture",
    title: "Pale Architecture",
    year: 2022,
    role: ["Sound Design", "Foley"],
    genre: "Art Film",
    description:
      "An experimental art film exploring the relationship between urban structures and human isolation.",
    longDescription:
      "Pale Architecture pushed sound design into purely abstract territory. Concrete and glass became instruments — buildings were recorded as enormous resonant chambers, and the resulting material was processed and recomposed into a quasi-musical score that exists somewhere between soundtrack and soundscape. The foley was performed live during recording sessions to capture spontaneous sonic relationships.",
    thumbnail:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    stills: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Ahn Jae-hong",
    production: "Void Cinema",
  },
  {
    slug: "monsoon-child",
    title: "Monsoon Child",
    year: 2022,
    role: ["Re-recording Mix", "Dialogue Editing"],
    genre: "Feature Film",
    description:
      "A coming-of-age drama set during the monsoon season in a coastal fishing village — rain as character.",
    longDescription:
      "Rain is the protagonist in Monsoon Child. The mixing philosophy treated the monsoon not as weather but as emotional narrator — its intensity rising and falling with the story's emotional beats, sometimes overwhelming dialogue, sometimes retreating to reveal silence. The mix was engineered to work across theatrical and streaming formats, ensuring the rain's texture survived compression.",
    thumbnail:
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&q=80",
    stills: [
      "https://images.unsplash.com/photo-1528184039801-de67c3aad2a7?w=1200&q=80",
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1200&q=80",
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    director: "Jung Woo-sung",
    production: "Harbor Films",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
