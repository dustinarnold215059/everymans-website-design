import { renderOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Every Man's Website Design — websites for ministries and nonprofits.";
export const size = ogSize;
export const contentType = ogContentType;

export default function MinistriesOpengraphImage() {
  return renderOgImage({
    tagline: "Websites that do the work — built by someone who gets the mission.",
    subline: "Churches · Ministries · Nonprofits · Abolition · Mission-driven causes",
  });
}
