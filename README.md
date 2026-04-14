# TukTuk Studio — Portfolio Website with Sanity CMS

**Allen Kang | Film Sound Design & Post-Production**
[tuktuksound.com](https://tuktuksound.com)

---

## Overview

This is a Next.js 14 portfolio site for TukTuk Studio, now powered by **Sanity** as a headless CMS. All content — project entries, site text, contact info, and images — can be edited without touching code.

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **CMS**: Sanity v3
- **Deployment**: Vercel

---

## Environment Variables

You need these in two places: your local `.env.local` file and your Vercel project settings.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID (from sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Almost always `production` |

Create a `.env.local` file at the project root (copy from `.env.local.example`):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Step-by-Step Setup

### 1. Create a Sanity account and project

1. Go to [sanity.io](https://sanity.io) and sign up (free)
2. Click **"New project"**
3. Name it `TukTuk Studio`
4. Choose dataset name: `production`
5. Copy your **Project ID** from the dashboard URL or the project settings page

### 2. Install dependencies

```bash
cd tuktuk-studio
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Add your domain to Sanity CORS settings

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Open your project → **API** tab → **CORS Origins**
3. Add these origins:
   - `http://localhost:3000` (for local development)
   - `https://tuktuksound.com` (your live domain)
   - `https://tuktuk-studio.vercel.app` (your Vercel preview URL if applicable)
4. Check **"Allow credentials"** for each

### 5. Run locally

```bash
npm run dev
```

- **Website**: http://localhost:3000
- **CMS Studio**: http://localhost:3000/studio

---

## Populating Content in Sanity

### First: Create Site Settings

1. Open http://localhost:3000/studio
2. Click **"Site Settings"** in the left sidebar
3. Fill in:
   - Studio Name: `TukTuk Studio`
   - Homepage Title: `TukTuk`
   - Homepage Subtitle: `Film Sound Design & Post-Production`
   - About Title: `Allen Kang`
   - About Body: paste your bio text (supports bold, italic, paragraphs)
   - Contact Email: `hello@tuktuksound.com`
   - Instagram URL: `https://instagram.com/yourhandle`
4. Click **Publish**

### Second: Add Projects

1. Click **"Projects"** in the left sidebar
2. Click **"Create new"** (top right)
3. Fill in all fields:
   - Title, Year, Genre
   - Roles (checkboxes)
   - Director, Production Company
   - Short Description (shown on cards)
   - Full Description (rich text, shown on detail page)
   - Cover Image (upload from your computer)
   - Gallery Images (optional, multiple images)
   - Video URL (YouTube or Vimeo embed URL)
   - **Featured**: check this to show on homepage
   - Sort Order: `1`, `2`, `3`... to control order
4. Click **Publish**

---

## Deployment to Vercel

### Option A — GitHub (recommended)

1. Push this project to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repository
4. Before clicking Deploy, click **"Environment Variables"** and add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
   NEXT_PUBLIC_SANITY_DATASET = production
   ```
5. Click **Deploy**

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

When prompted for environment variables, enter both Sanity vars.

Then deploy to production:

```bash
vercel --prod
```

### Adding your custom domain

1. Vercel dashboard → your project → **Settings → Domains**
2. Add `tuktuksound.com` and `www.tuktuksound.com`
3. Update your DNS registrar with the records Vercel shows
4. SSL is automatic

### Add Vercel env vars after deployment

If you forgot to add them during setup:
1. Vercel dashboard → project → **Settings → Environment Variables**
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
3. Redeploy: Vercel dashboard → **Deployments** → click the latest → **Redeploy**

---

## How to Access and Use the CMS

**URL**: `https://tuktuksound.com/studio`

You'll need to log in with the same Sanity account used to create the project.

### What you can edit without code

| What | Where in Studio | Effect on site |
|---|---|---|
| Homepage title | Site Settings → Homepage Title | Big hero text |
| Homepage subtitle | Site Settings → Homepage Subtitle | Tagline below title |
| Hero background image | Site Settings → Hero Image | Optional cinematic image behind hero |
| About page bio | Site Settings → About Body | All text on the About page |
| Contact email | Site Settings → Contact Email | Email on Contact page + footer |
| Instagram link | Site Settings → Instagram URL | Instagram link in footer + contact |
| All projects | Projects section | Entire portfolio grid |
| Project images | Project → Cover Image / Gallery Images | Cards + detail page |
| Project description | Project → Short / Full Description | Card snippet + detail page |
| Featured projects | Project → Featured checkbox | Homepage "Recent Projects" section |
| Project order | Project → Sort Order field | Order in portfolio grid |

### Editing step-by-step

**To update the homepage text:**
1. Studio → Site Settings
2. Change Homepage Title or Subtitle
3. Click Publish → site updates within 60 seconds

**To update the About page bio:**
1. Studio → Site Settings → About Body
2. Type or paste your text (use the toolbar for bold, italic, paragraphs)
3. Click Publish

**To add a new project:**
1. Studio → Projects → Create new
2. Fill in all fields
3. Upload the cover image (drag and drop or click to browse)
4. Check "Featured on Homepage" if you want it on the home page
5. Click Publish

**To change which projects appear on the homepage:**
1. Studio → Projects → click the project you want featured
2. Toggle "Featured on Homepage" on or off
3. Publish

**To reorder the portfolio:**
1. Studio → Projects → click a project
2. Change "Sort Order" to a number (1 = first, 2 = second, etc.)
3. Publish

**To update the contact email:**
1. Studio → Site Settings
2. Change Contact Email
3. Publish — updates everywhere instantly

---

## Project Structure

```
tuktuk-studio/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home — reads from Sanity
│   ├── globals.css
│   ├── not-found.tsx
│   ├── about/page.tsx                # About — reads aboutBody from Sanity
│   ├── portfolio/
│   │   ├── page.tsx                  # Portfolio grid — reads all projects
│   │   └── [slug]/page.tsx           # Project detail — reads by slug
│   ├── contact/page.tsx              # Contact — reads email/social from Sanity
│   └── studio/[[...tool]]/page.tsx   # Sanity Studio mounted here
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx                    # Now reads email/social from Sanity
│   ├── ProjectCard.tsx               # Shared project card component
│   └── ScrollReveal.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts                 # Sanity client singleton
│   │   ├── image.ts                  # Image URL builder
│   │   ├── queries.ts                # All GROQ queries
│   │   └── types.ts                  # TypeScript types
│   └── projects.ts                   # (kept for reference, no longer used)
├── sanity/
│   └── schemas/
│       ├── index.ts                  # Schema registry
│       ├── siteSettings.ts           # Site Settings schema
│       └── project.ts                # Project schema
├── sanity.config.ts                  # Sanity Studio config
├── sanity.cli.ts                     # Sanity CLI config
├── next.config.mjs                   # Includes cdn.sanity.io image domain
├── .env.local.example                # Copy this to .env.local
└── README.md
```

---

## Content Revalidation

Pages revalidate (re-fetch from Sanity) every **60 seconds** automatically. So after you Publish in the Studio, the live site updates within one minute — no redeploy needed.

If you want instant updates, you can set up [Sanity webhooks with Vercel Deploy Hooks](https://www.sanity.io/docs/webhooks) — but for most use cases, 60-second caching is fine.

---

## Adding More Content Types (Optional, for developers)

To add a new schema (e.g., "Testimonials"):
1. Create `sanity/schemas/testimonial.ts`
2. Add it to `sanity/schemas/index.ts`
3. Add a query in `lib/sanity/queries.ts`
4. Use it in a page component

---

## License

Private — All rights reserved.
© 2025 Allen Kang / TukTuk Studio
