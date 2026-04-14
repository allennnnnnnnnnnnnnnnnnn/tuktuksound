/**
 * This route mounts the Sanity Studio at /studio.
 * The [[...tool]] catch-all lets the Studio handle its own internal routing.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
