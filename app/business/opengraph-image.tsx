import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Every Man's Website Design — websites for local businesses in Metro Detroit.";
export const size = ogSize;
export const contentType = ogContentType;

/**
 * Business card. Must never name the ministry work — this is the image that
 * shows when a local-business prospect shares the page or texts the link.
 */
export default function BusinessOpengraphImage() {
  return renderOgImage({
    tagline: "Your customers look you up before they call.",
    subline: "Auto repair · Salons · Restaurants · Contractors · Metro Detroit",
  });
}
