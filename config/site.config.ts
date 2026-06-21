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
  email: "Everymanswebsitedesign@gmail.com", // shown on the site + Contact section
  tagline: "Websites that do the work — built by someone who gets the mission.",
  description:
    "I design, build, and maintain fast, modern websites for ministries, nonprofits, and mission-driven causes — and because I'm part of the work, you're not explaining your mission to a stranger.",
  ogImageAlt: "Every Man's Website Design — websites for mission-driven organizations.",

  // ── Brand palette ─────────────────────────────────────────────────────────
  // Deep evergreen anchor + warm clay accent + warm neutrals.
  // Swap any value and the whole site follows. (No generic-startup purple here.)
  theme: {
    colors: {
      // ── surfaces ──
      paper: "#F4EFE4", // canvas / page background (warm cream)
      surface: "#FCFAF3", // cards, form, browser frames
      sand: "#EFE8D8", // alternating sections, chips, FAQ band
      // ── forest (primary dark) ──
      ink: "#163029", // header text / dark sections / footer / primary buttons
      "ink-soft": "#20493A", // forest hover; serif accent text
      sage: "#7FA98C", // footer headings, process numbers, muted accents
      "sage-deep": "#2E5848", // dividers on dark
      // ── terracotta (accent) ──
      accent: "#C5532E", // primary accent, CTA, eyebrows, arrows
      "accent-hover": "#A8431F", // hover for terracotta button
      "accent-soft": "#E2A86B", // lighter terracotta (eyebrow on dark, hover on dark)
      "accent-tint": "#EAD8C9", // hero badge background / glow
      // ── text ──
      fg: "#1C1A15", // primary text
      muted: "#5A554A", // secondary body copy
      faint: "#837C6E", // captions, labels
      "on-ink": "#EFE6D2", // text on forest
      "on-ink-bright": "#FCFAF3", // headings on forest
      "on-ink-muted": "#A9BBB0", // footer / process body text on dark
      // ── lines / misc ──
      line: "#E2D9C5", // card / input borders
      "line-faint": "#ECE3D0", // inner dividers in cards
      amber: "#E0B23E", // browser-frame middle dot
    },
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
  ],
  primaryCta: { label: "Start a project", href: "/#contact" },

  // ── Booking ───────────────────────────────────────────────────────────────
  // Optional "Book a call" link. Paste your Cal.com / Calendly URL here to show
  // a booking button next to the contact form. Leave url empty to hide it.
  booking: {
    url: "", // e.g. "https://cal.com/dustin/intro" or "https://calendly.com/…"
    label: "Book a 15-min call",
  },

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

  // ── How it works ──────────────────────────────────────────────────────────
  process: {
    heading: "How it works",
    intro: "A simple, predictable path from first conversation to launch — and beyond.",
    steps: [
      {
        title: "Talk",
        body: "We start with a short, no-pressure conversation about your mission, your goals, and what your site needs to do.",
      },
      {
        title: "Design",
        body: "I map the pages and write a clear, fixed-price proposal — then design a clean, on-brand look before any code is written.",
      },
      {
        title: "Build",
        body: "I build a fast, secure, mobile-first site with the features you need: petitions, donations, events, and content you can update.",
      },
      {
        title: "Launch & care",
        body: "We launch on your domain, and I stay on for hosting, security, backups, and updates — so you never think about it.",
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

  // ── Social proof (testimonial + metrics) ──────────────────────────────────
  // Replace the placeholder quote with a real one when you have it. Update the
  // stats to whatever numbers you want to stand behind.
  proof: {
    heading: "Proof, not promises",
    quote:
      "Dustin built our site from the ground up and still keeps it running. He understood the mission from day one — we never had to explain ourselves.",
    author: "Abolish Abortion Michigan",
    role: "Client · placeholder quote — swap for a real testimonial",
    stats: [
      { value: "100%", label: "Custom-built — no templates" },
      { value: "Next.js", label: "Modern, fast, and secure" },
      { value: "Always on", label: "Hosting, security & updates handled" },
    ],
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

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: {
    heading: "Questions, answered",
    intro: "The things people usually want to know before reaching out.",
    items: [
      {
        q: "How much does a website cost?",
        a: "Most projects are fixed-price, so you know the number before we start — no hourly surprises. The total depends on scope (pages, features like petitions or donations, and integrations). Tell me what you need and I'll send a clear proposal.",
      },
      {
        q: "How long does it take?",
        a: "A typical site takes a few weeks from our first conversation to launch, depending on scope and how quickly we can gather your content. I'll give you a realistic timeline in the proposal.",
      },
      {
        q: "Do I own the website?",
        a: "Yes. You own the site, the domain, and the content. Everything lives on your accounts — I just build and maintain it. There's no lock-in.",
      },
      {
        q: "What happens after launch?",
        a: "You can take it from there, or put it on a Care Plan and I'll handle hosting, security, backups, domain & email, and content updates for a flat monthly fee.",
      },
      {
        q: "Do you only work with abolition groups?",
        a: "No — I work with churches, ministries, nonprofits, abolition groups, and small mission-driven organizations. If your work matters and you need it done right, let's talk.",
      },
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
    heading: "Tell me what you need and I'll show you what's possible.",
    intro:
      "No jargon, no pressure — just a straight conversation about your mission and your site. I read every message myself and reply personally.",
    needOptions: [
      "New website",
      "Redesign",
      "Ongoing care",
      "Automation",
      "Not sure",
    ],
    successTitle: "Message sent.",
    successBody:
      "Thanks for reaching out — I'll read it myself and get back to you personally, usually within a day.",
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
