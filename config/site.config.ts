/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EVERY MAN'S WEBSITE DESIGN — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit copy and branding HERE. You should rarely need to open a component.
 *
 *  - `theme.colors` is read by tailwind.config.ts, so changing a hex value
 *    re-skins the whole site (use `bg-ink`, `text-accent`, etc. in components).
 *  - Everything else is plain text/links rendered by the sections.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  // ── Brand / meta ──────────────────────────────────────────────────────────
  name: "Every Man's Website Design",
  shortName: "Every Man's",
  domain: "everymanswebsitedesign.com",
  url: "https://everymanswebsitedesign.com",
  email: "Dustin.t.arnold215059@gmail.com", // shown on the site + Contact section
  tagline: "Websites that do the work — built by someone who gets the mission.",
  description:
    "I design, build, and maintain fast, modern websites for ministries, nonprofits, and mission-driven causes — and because I'm part of the work, you're not explaining your mission to a stranger.",
  ogImageAlt: "Every Man's Website Design — websites for mission-driven organizations.",

  // ── Brand palette ─────────────────────────────────────────────────────────
  // Deep evergreen anchor + warm clay accent + warm neutrals.
  // Swap any value and the whole site follows. (No generic-startup purple here.)
  theme: {
    colors: {
      ink: "#13302A", // deep evergreen — primary anchor (headers, dark bands)
      "ink-soft": "#1F4A40", // lighter evergreen for layered dark surfaces
      accent: "#C9632B", // warm clay/amber — CTAs, highlights
      "accent-soft": "#E08A4E", // hover / softer accent
      paper: "#FBF8F2", // warm off-white page background
      sand: "#F1E9DA", // warm tint for alternating sections / cards
      line: "#E2D8C5", // hairline borders on light surfaces
      fg: "#1A1A17", // body text on light
      muted: "#5F584C", // secondary text on light
      "on-ink": "#F4EFE6", // text on dark evergreen
      "on-ink-muted": "#AEC2B8", // secondary text on dark evergreen
    },
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  primaryCta: { label: "Start a project", href: "/#contact" },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Web design for mission-driven organizations",
    headline: "Websites that do the work — built by someone who gets the mission.",
    subhead:
      "I design, build, and maintain fast, modern websites for ministries, nonprofits, and causes that matter — and because I'm part of the work, you're not explaining your mission to a stranger.",
    primary: { label: "See my work", href: "/#work" },
    secondary: { label: "Start a project", href: "/#contact" },
  },

  // ── Trust strip ───────────────────────────────────────────────────────────
  trust: {
    line: "Trusted to build for organizations like Abolish Abortion Michigan.",
  },

  // ── Services ──────────────────────────────────────────────────────────────
  services: {
    heading: "What I do",
    intro: "Three ways I help mission-driven organizations show up well online.",
    items: [
      {
        title: "Website Design & Build",
        body: "Custom, modern, mobile-friendly sites built to convert: petitions and signups, donations, events, and content that's easy to update. Fixed-price projects with no surprises.",
        bullets: ["Petitions & signups", "Donations & events", "Easy content updates"],
      },
      {
        title: "Website Care Plans",
        body: "Ongoing hosting oversight, security, backups, domain & email, and content updates for a flat monthly fee — so no one on your team has to think about it.",
        bullets: ["Security & backups", "Domain & email", "Flat monthly fee"],
      },
      {
        title: "Automation & Data",
        body: "Tired of manual spreadsheets, reporting, or copy-paste work? I automate the busywork behind your organization, drawing on a data-analytics background.",
        bullets: ["Reporting automation", "Data pipelines", "Less manual work"],
      },
    ],
  },

  // ── Featured work (home) ──────────────────────────────────────────────────
  featured: {
    heading: "Featured work",
    kicker: "Case study",
    title: "Abolish Abortion Michigan",
    href: "https://abolishabortionmichigan.com",
    body: "A complete site built from the ground up — a petition system, abolition-bill tracker, gospel and \"what we believe\" sections, live news and events, and a clean donation flow. Fast, secure, mobile-friendly, and deployed on Vercel.",
    tags: ["Next.js", "Vercel", "Petitions", "Donations", "Bill tracker"],
    image: "/work/aam-home.png",
    caseStudyHref: "/work",
  },

  // ── Who I serve ───────────────────────────────────────────────────────────
  audience: {
    heading: "Who I serve",
    intro: "If your work matters, your website should too.",
    items: [
      "Churches",
      "Ministries",
      "Nonprofits",
      "Abolition groups",
      "Small mission-driven businesses",
    ],
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    heading: "About",
    name: "Dustin",
    body: "I'm Dustin — a developer and data analyst who builds websites for organizations and causes I actually care about. I combine clean, modern web design with an analytics background, so I can build the site and automate the manual work behind it. I work with churches, ministries, nonprofits, and abolition groups, and I'm part of those communities myself.",
    points: [
      "Built Abolish Abortion Michigan from the ground up",
      "Data + automation background, not just pretty pages",
      "Part of the communities I build for",
    ],
  },

  // ── CTA band ──────────────────────────────────────────────────────────────
  ctaBand: {
    heading: "Tell me what you need and I'll show you what's possible.",
    body: "No jargon, no pressure — just a straight conversation about your mission and your site.",
    cta: { label: "Start a project", href: "/#contact" },
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    heading: "Start a project",
    intro:
      "Tell me a little about your organization and what you need. I read every message myself and reply personally.",
    needOptions: [
      "New website",
      "Redesign",
      "Ongoing care",
      "Automation",
      "Not sure",
    ],
    successTitle: "Thanks — message received.",
    successBody:
      "I'll get back to you personally, usually within a day or two. If it's urgent, email me directly.",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    blurb:
      "Fast, modern websites for ministries, nonprofits, and mission-driven causes.",
    credit: {
      label: "Proudly built Abolish Abortion Michigan",
      href: "https://abolishabortionmichigan.com",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

// Re-export the palette so non-Tailwind code (e.g. OG images) can read the same values.
export const themeColors = siteConfig.theme.colors;
