/**
 * Case studies that power the /work page.
 * Add a new object to this array to publish another case study — no component
 * edits required. `slug` must be unique.
 */

export type CaseStudy = {
  slug: string;
  name: string;
  url: string;
  summary: string;
  year: string;
  role: string;
  /** The problem the organization came in with. */
  problem: string;
  /** What I designed and built. */
  built: string[];
  /** Hero screenshot for the case study (path under /public). */
  image: string;
  /** The tech behind it. */
  stack: string[];
  /** Screenshot gallery. */
  gallery: { label: string; caption: string; image: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "abolish-abortion-michigan",
    name: "Abolish Abortion Michigan",
    url: "https://abolishabortionmichigan.com",
    summary:
      "A complete advocacy site built from the ground up — petitions, a bill tracker, donations, and live news — fast, secure, and mobile-friendly.",
    image: "/work/aam-home.png",
    year: "2025",
    role: "Design, build, and ongoing maintenance",
    problem:
      "A growing abolition movement needed a single, trustworthy home online: a place to gather petition signatures, track legislation, explain what they believe, take donations securely, and keep supporters current — without a developer on staff and without a slow, generic template.",
    built: [
      "Petition system for gathering and managing signatures",
      "Abolition-bill tracker so supporters can follow legislation",
      "Gospel and \"what we believe\" sections that state the mission plainly",
      "Live news and events kept current without touching code",
      "Clean, secure donation flow",
      "Mobile-first layout — most supporters arrive on a phone",
    ],
    stack: [
      "Next.js (App Router) + TypeScript",
      "Tailwind CSS",
      "Deployed on Vercel",
      "Resend for transactional email",
      "Upstash Redis rate limiting on forms",
      "Security headers + spam protection",
    ],
    gallery: [
      { label: "Home", caption: "Landing page and primary call to action", image: "/work/aam-home.png" },
      { label: "The petition", caption: "Petition page with a live signature count", image: "/work/aam-petition.png" },
      { label: "Abolition bills", caption: "Explaining and tracking abolition legislation", image: "/work/aam-bills.png" },
      { label: "Donate", caption: "Clean donation flow and supporter messaging", image: "/work/aam-donate.png" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
