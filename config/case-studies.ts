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
  {
    slug: "mra-photography",
    name: "MRA Photography",
    url: "https://www.photographymra.com",
    summary:
      "A working Metro Detroit photography business: portfolio galleries, plain-English pricing, an inquiry form that gets answered, private client galleries with downloads, and online payments.",
    image: "/work/mra-home.jpg",
    year: "2026",
    role: "Design, build, and ongoing maintenance",
    problem:
      "A busy local photographer was running her business out of DMs and email threads. Clients could not see pricing without asking, galleries were shared as expiring links, deposits were chased by hand, and every inquiry meant another back-and-forth before a date was even held. She needed the site to handle the first half of every booking so she could be out shooting instead of typing.",
    built: [
      "Portfolio galleries that load fast on a phone, where most clients look",
      "Pricing published up front, so the first conversation is not about cost",
      "Inquiry form that reaches her instantly and is easy to reply to",
      "Private client galleries with downloads, delivered when she chooses",
      "Deposits and remaining balances paid online instead of chased",
      "Google reviews pulled in automatically so the newest ones always show",
    ],
    stack: [
      "Next.js (App Router) + TypeScript",
      "Tailwind CSS",
      "Deployed on Vercel",
      "Postgres for bookings, galleries, and contracts",
      "Stripe for deposits and balance payments",
      "Cloudinary for image delivery",
      "Bot protection on public forms",
    ],
    gallery: [
      { label: "Home", caption: "Portfolio-first landing page built for phones", image: "/work/mra-home.jpg" },
      { label: "Portfolio", caption: "Galleries that show the work without a login", image: "/work/mra-portfolio.jpg" },
      { label: "Investment", caption: "Pricing published up front, no email required", image: "/work/mra-investment.jpg" },
    ],
  },
  {
    slug: "arnold-family-recipes",
    name: "Our Family Table",
    url: "https://arnoldfamilyrecipes.org",
    summary:
      "A private family cookbook: recipes with accounts and permissions, themed collections, and printable cookbooks — everything the family has ever cooked for each other, in one place.",
    image: "/work/afr-home.jpg",
    year: "2026",
    role: "Design and build",
    problem:
      "Family recipes were scattered across index cards, phone photos, and a few half-remembered phone calls. Some were already lost. The family needed somewhere private to put all of it — searchable, editable by more than one person, and durable enough that the next generation still has it.",
    built: [
      "Recipes anyone in the family can add and edit, with their own account",
      "Collections that group recipes by occasion, cook, or season",
      "Printable cookbooks assembled from the recipes already in the site",
      "Private by default — accounts, not a public blog",
      "Search that works across ingredients and names",
    ],
    stack: [
      "Next.js (App Router) + TypeScript",
      "Tailwind CSS",
      "Deployed on Vercel",
      "Postgres with user accounts and permissions",
      "Image uploads and optimization",
    ],
    gallery: [
      { label: "Home", caption: "The family table, kept in one place", image: "/work/afr-home.jpg" },
      { label: "Recipes", caption: "Searchable recipes anyone in the family can add", image: "/work/afr-recipes.jpg" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
