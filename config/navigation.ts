/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  AUDIENCES
 * ─────────────────────────────────────────────────────────────────────────────
 *  The site serves two audiences with their own landing page, nav, and calls to
 *  action. `/` is a chooser that sends people to one of them.
 *
 *  The Header picks an audience from the current pathname, so adding a third
 *  means adding an entry here plus a route — no component changes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type AudienceKey = "ministries" | "business";

export type Audience = {
  readonly key: AudienceKey;
  readonly base: string;
  /** Short label used on the cross-link to the other audience. */
  readonly switchLabel: string;
  /** Sits under the wordmark; must match the audience, not the other one. */
  readonly tagline: string;
  readonly nav: readonly { readonly label: string; readonly href: string }[];
  readonly cta: { readonly label: string; readonly href: string };
};

export const AUDIENCES: Record<AudienceKey, Audience> = {
  ministries: {
    key: "ministries",
    base: "/ministries",
    switchLabel: "Churches & nonprofits",
    tagline: "Mission-driven web",
    nav: [
      { label: "Services", href: "/ministries#services" },
      { label: "Process", href: "/ministries#process" },
      { label: "Work", href: "/ministries#work" },
      { label: "Case study", href: "/work" },
      { label: "About", href: "/ministries#about" },
    ],
    cta: { label: "Start a project", href: "/ministries#contact" },
  },
  business: {
    key: "business",
    base: "/business",
    switchLabel: "Local business",
    tagline: "Websites for local business",
    nav: [
      { label: "Services", href: "/business#services" },
      { label: "Pricing", href: "/business#pricing" },
      { label: "Work", href: "/business#work" },
      { label: "Case study", href: "/work" },
      { label: "About", href: "/business#about" },
    ],
    cta: { label: "Get a price", href: "/business#contact" },
  },
};

/** Which audience a path belongs to, or null on the chooser and shared pages. */
export function audienceFor(pathname: string): Audience | null {
  if (pathname.startsWith("/business")) return AUDIENCES.business;
  if (pathname.startsWith("/ministries")) return AUDIENCES.ministries;
  return null;
}

export function otherAudience(key: AudienceKey): Audience {
  return key === "business" ? AUDIENCES.ministries : AUDIENCES.business;
}
