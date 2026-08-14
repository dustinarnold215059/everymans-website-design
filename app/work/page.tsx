import type { Metadata } from "next";
import { caseStudiesFor } from "@/config/case-studies";
import { WorkBody } from "@/components/sections/WorkBody";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Every Man's Website Design — including Abolish Abortion Michigan, built from the ground up on Next.js and Vercel.",
  alternates: { canonical: "/work" },
  // Outside the /ministries segment, so the ministry card must be named.
  openGraph: {
    type: "website",
    url: "/work",
    images: [{ url: "/ministries/opengraph-image", width: 1200, height: 630 }],
  },
};

/**
 * Ministries case studies. Kept at `/work` rather than `/ministries/work`
 * because this URL is already indexed. The business side has its own page at
 * `/business/work` and the two never link to each other.
 */
export default function WorkPage() {
  return (
    <WorkBody
      studies={caseStudiesFor("ministries")}
      copy={{
        path: "/work",
        crumb: "Work",
        headline: "Real sites for real missions — built to last and easy to run.",
        intro:
          "A closer look at what I've built — captured from the live, in-production site.",
        ctaHeading: "Want one like this?",
        ctaBody: "Tell me about your mission and I'll show you what's possible.",
        ctaHref: "/ministries#contact",
        ctaLabel: "Start a project",
        backHref: "/ministries",
        backLabel: "Back",
      }}
    />
  );
}
