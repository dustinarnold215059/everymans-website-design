/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SMALL-BUSINESS CONTENT — powers /business
 * ─────────────────────────────────────────────────────────────────────────────
 *  Same components as /ministries, different words. This side speaks to auto
 *  shops, salons, restaurants and contractors — people who are busy, get most
 *  work by word of mouth, and have heard a website pitch before.
 *
 *  Tone rules that matter here:
 *    - No "mission", no "cause", no ministry language. That is the other page.
 *    - Lead with what their CUSTOMER sees, not with design.
 *    - Never imply their business is failing. Most of these owners are busy and
 *      well-reviewed; the gap is that none of it is visible online.
 *    - Say the price. A local owner's first question is "what's it cost," and
 *      an unanswered price ends the conversation.
 *
 *  Pricing is set against 2026 Detroit market rates — see the note above the
 *  `pricing` block for the reasoning. Change the numbers there.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { PageContent } from "./page-content";

export const businessContent = {
  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Websites for local businesses",
    headline: "Your customers look you up before they call. Give them something to find.",
    emphasis: "Give them something to find.",
    subhead:
      "I build fast, mobile-friendly websites for local shops, salons, contractors, and restaurants around Metro Detroit — so the people already searching for you can see your work, your hours, and how to reach you.",
    primary: { label: "See a real example", href: "/business#work" },
    secondary: { label: "Get a price", href: "/business#contact" },
    features: ["Works on every phone", "The site is yours to keep", "One person to call"],
  },

  trust: {
    line: "Built and maintained for local businesses like MRA Photography.",
    emphasis: "MRA Photography.",
  },

  // ── Services ──────────────────────────────────────────────────────────────
  services: {
    heading: "What I do",
    title: "Build it, keep it running, get you found.",
    intro: "Three things that put a local business in front of the people already looking for it.",
    items: [
      {
        title: "Website Design & Build",
        body: "A clean, fast site that works on a phone, shows what you do, and makes it easy to call or book you. Fixed price, agreed before I start — no hourly surprises.",
        bullets: ["Works on phones first", "Click-to-call and directions", "Photos of your actual work"],
      },
      {
        title: "Website Care Plans",
        body: "Hosting, security, backups, domain and email, and content changes for one flat monthly fee. You call or text me when something needs updating and it gets done.",
        bullets: ["Security & backups", "Domain & email handled", "Updates without a ticket system"],
      },
      {
        title: "Getting Found on Google",
        body: "Your Google listing is usually the first thing a customer sees — often before your website. I make sure it points somewhere real, matches your site, and shows the right hours, photos, and phone number.",
        bullets: ["Google listing cleaned up", "Hours & photos current", "Reviews working for you"],
      },
    ],
  },

  // ── How it works ──────────────────────────────────────────────────────────
  process: {
    heading: "How it works",
    title: "From first hello to a site that brings you work.",
    intro: "Four steps, and I do the heavy lifting. You keep running your business.",
    steps: [
      {
        title: "Talk",
        body: "Fifteen minutes, in person or on the phone. What you do, who your customers are, and what you want the site to actually accomplish.",
      },
      {
        title: "Price",
        body: "I send one clear number and exactly what it covers. No packages you have to decode, no hourly meter running.",
      },
      {
        title: "Build",
        body: "I write the words, lay out the pages, and use your real photos. You review it before anything goes live. Most sites take two to three weeks.",
      },
      {
        title: "Launch & care",
        body: "It goes live on your own domain, and I stay on to handle hosting, security, and updates — so you never have to think about it again.",
      },
    ],
  },

  // ── Featured work ─────────────────────────────────────────────────────────
  featured: {
    heading: "Featured work",
    kicker: "Case study",
    title: "MRA Photography",
    href: "https://www.photographymra.com",
    body: "A working Metro Detroit photography business: portfolio galleries, transparent pricing, an inquiry form that actually gets answered, private client galleries with downloads, and online payments. Built to book clients while she's out shooting.",
    tags: ["Booking inquiries", "Client galleries", "Online payments", "Google reviews", "Next.js"],
    image: "/work/mra-home.jpg",
    caseStudyHref: "/business/work",
    stats: [
      { value: "Live", label: "booking inquiries" },
      { value: "Live", label: "client galleries" },
      { value: "100%", label: "mobile-ready" },
    ],
  },

  // ── Proof ─────────────────────────────────────────────────────────────────
  proof: {
    heading: "Proof, not promises",
    quote:
      "People find me on Google, look at the galleries, and send an inquiry before I've even talked to them. The site does the first conversation for me.",
    emphasis: "The site does the first conversation for me.",
    initials: "MRA",
    author: "MRA Photography",
    role: "Metro Detroit",
    stats: [
      { value: "2–3 weeks", label: "Typical build, start to live" },
      { value: "Phone-first", label: "Most of your customers arrive on one" },
      { value: "You own it", label: "Your domain, your site, no lock-in" },
    ],
  },

  // ── Who I serve ───────────────────────────────────────────────────────────
  audience: {
    heading: "Who I build for",
    title: "If people are already looking for you, be there.",
    intro: "Local businesses whose customers are already searching for them.",
    items: [
      "Auto repair & body shops",
      "Salons & barbershops",
      "Restaurants & bakeries",
      "Contractors & trades",
      "Cleaners & laundromats",
      "Shops & storefronts",
    ],
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  // Set against the 2026 Detroit market: freelance small-business sites run
  // $1,500–$4,500 (agencies $3,000–$10,000), maintenance plans $50–$150/mo.
  //
  // $1,500 sits at the accessible end of that band on purpose. The door-knock
  // list is owner-operated shops in Dearborn, Inkster, Westland and Taylor —
  // a number that ends the conversation at the counter is worth nothing, and
  // "starting at" leaves room to quote higher for booking or e-commerce.
  // $75/mo is mid-band and a clean figure to say out loud.
  pricing: {
    heading: "What it costs",
    intro:
      "One fixed price for the build, one flat fee to keep it running. You'll know the number before I start.",
    tiers: [
      {
        name: "Website",
        price: "$1,500",
        unit: "starting, one time",
        body: "A complete site built around your business: the pages you need, your photos, your hours, and a clear way for customers to reach you. Fixed price agreed up front.",
        bullets: [
          "Designed and built from scratch — no template",
          "Works properly on phones",
          "Click-to-call, directions, and contact form",
          "Your domain, set up and pointed",
          "Live in two to three weeks",
        ],
        featured: true,
      },
      {
        name: "Care Plan",
        price: "$75",
        unit: "per month",
        body: "Hosting, security, backups, domain and email, and content changes. Optional, cancel anytime — you own the site either way.",
        bullets: [
          "Hosting and security handled",
          "Backups running automatically",
          "Domain and email managed",
          "Content updates when you need them",
          "One person to call, not a help desk",
        ],
      },
    ],
    footnote:
      "Bigger jobs — online booking, e-commerce, client logins — are quoted separately, still at a fixed price.",
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    heading: "About",
    title: "One person builds it. The same person answers the phone.",
    name: "Dustin",
    body:
      "I'm Dustin. I build websites for local businesses around Metro Detroit — one person, start to finish, so you're not handed off to an account manager or waiting on a ticket queue. I've got a data and automation background too, which means I can build the site and then take the manual busywork behind it off your plate.",
    points: [
      "One person builds it and one person maintains it — me",
      "Fixed price agreed before any work starts",
      "You own the domain, the site, and the content",
    ],
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: {
    heading: "Questions, answered",
    title: "Good questions get straight answers.",
    intro: "The things owners usually ask before we start.",
    items: [
      {
        q: "How much does a website cost?",
        a: "See the pricing above — a build starts at a fixed price, and the care plan is a flat monthly fee. The final number depends on how many pages you need and whether you want extras like online booking or payments. You'll get one clear number before I start, and it doesn't move.",
      },
      {
        q: "I get all my work by word of mouth. Why do I need a website?",
        a: "Word of mouth still works — but the person who was referred to you usually looks you up before they call. If there's nothing to find, or the link on your Google listing is broken, that referral goes cold. A site doesn't replace word of mouth; it keeps the referrals you're already earning from leaking away.",
      },
      {
        q: "How long does it take?",
        a: "Most sites go live in two to three weeks from our first conversation. The part that slows it down is usually gathering photos and details from you, so the faster you get me those, the faster it launches.",
      },
      {
        q: "Do I own the website?",
        a: "Yes. The domain, the site, and the content are yours, on your accounts. If you ever want to take it elsewhere you can, and I'll help you move it. There's no contract holding it hostage.",
      },
      {
        q: "I already have a website. Can you fix it?",
        a: "Usually, yes. Sometimes the fix is small — a broken link on your Google listing, or a site that doesn't work on phones. Sometimes it's easier to rebuild. I'll tell you honestly which one you're looking at, even when it's the cheaper answer.",
      },
      {
        q: "My nephew could build one on Wix for free. Why pay you?",
        a: "If you've got someone who will actually keep it updated, use them — I mean that. The build isn't the hard part. What usually happens is the site goes up, then he gets busy or moves, and two years later your hours are wrong, the phone number is old, and nobody knows the login. You also end up on an address with the builder's name in the middle of it, which tells customers you didn't finish. What you're paying me for is that it gets built properly once and then stays right, with one person to call when it doesn't.",
      },
      {
        q: "How do I know you'll still be around in a year?",
        a: "Fair question, and here's the honest answer: you don't, so I build it so it doesn't matter. The domain and the site are on your accounts, not mine. It's built on standard tools any web developer can pick up — no proprietary system that only I can touch. The care plan is month to month with no contract. If I vanished tomorrow you'd still own everything and could hand it to anyone.",
      },
      {
        q: "What if I don't have any photos?",
        a: "That's normal. We can start with what you have, and I'll tell you exactly which few shots would make the biggest difference. A handful of decent phone photos of your actual work beats stock photography every time.",
      },
    ],
  },

  // ── CTA band ──────────────────────────────────────────────────────────────
  ctaBand: {
    heading: "Tell me what you do and I'll tell you what it costs.",
    body: "No jargon, no pressure, no long sales process — just a straight answer and a number.",
    cta: { label: "Get a price", href: "/business#contact" },
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    heading: "Tell me what you do and I'll tell you what it costs.",
    intro:
      "No jargon, no pressure — just a straight conversation about your business and a clear number. I read every message myself and reply personally, usually the same day.",
    needOptions: [
      "New website",
      "Fix or rebuild my current site",
      "Google listing help",
      "Ongoing care",
      "Not sure yet",
    ],
    successTitle: "Message sent.",
    successBody:
      "Thanks for reaching out — I'll read it myself and get back to you personally, usually within a day.",
  },
} as const satisfies PageContent;
