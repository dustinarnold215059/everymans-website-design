import type { Metadata } from "next";
import { caseStudiesFor } from "@/config/case-studies";
import { WorkBody } from "@/components/sections/WorkBody";

const title = "Local Business Website Case Studies";
const description =
  "A closer look at websites built for local businesses — MRA Photography and Our Family Table, captured from the live sites.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/business/work" },
  // Explicit image: declaring an openGraph block here clears the one inherited
  // from the /business segment, which would leave this page with none.
  openGraph: {
    type: "website",
    url: "/business/work",
    title,
    description,
    images: [{ url: "/business/opengraph-image", width: 1200, height: 630 }],
  },
};

/**
 * Business case studies only. `caseStudiesFor("business")` is what keeps the
 * abolition work off this page — do not swap it for the full `caseStudies`
 * array.
 */
export default function BusinessWorkPage() {
  return (
    <WorkBody
      studies={caseStudiesFor("business")}
      copy={{
        path: "/business/work",
        crumb: "Work",
        headline: "Real sites for real businesses — built to bring you work.",
        intro:
          "A closer look at what I've built for local businesses — captured from the live, in-production sites.",
        ctaHeading: "Want one like this?",
        ctaBody: "Tell me what you do and I'll tell you what it costs.",
        ctaHref: "/business#contact",
        ctaLabel: "Get a price",
        backHref: "/business",
        backLabel: "Back",
      }}
    />
  );
}
