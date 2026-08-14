import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Every Man's Website Design — custom websites built and maintained by one person.";
export const size = ogSize;
export const contentType = ogContentType;

/** Site-wide card. Names no audience — it is inherited by shared pages. */
export default function OpengraphImage() {
  return renderOgImage({
    tagline: "Custom websites, built and maintained by one person.",
    subline: "No templates · Fixed price · You own everything",
  });
}
