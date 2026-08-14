/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PAGE CONTENT CONTRACT
 * ─────────────────────────────────────────────────────────────────────────────
 *  The site sells to two audiences that need different words: mission-driven
 *  organizations (/ministries) and local businesses (/business). Both are
 *  rendered by the SAME section components — only the copy changes.
 *
 *  So the sections take a `content` prop shaped like this, defaulting to the
 *  ministries config. Adding a third audience later means adding one more
 *  config file and one more route; no component work.
 *
 *  Arrays are `readonly` because the configs are declared `as const`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Link = { readonly label: string; readonly href: string };

export type PageContent = {
  readonly hero: {
    readonly eyebrow: string;
    readonly headline: string;
    /** Closing phrase of the headline rendered in italic serif. Must appear in `headline`. */
    readonly emphasis: string;
    readonly subhead: string;
    readonly primary: Link;
    readonly secondary: Link;
    /** Three short reassurances under the buttons, in this audience's language. */
    readonly features: readonly string[];
  };
  readonly trust: {
    readonly line: string;
    /** Tail of `line` rendered in full-strength ink. Must appear in `line`. */
    readonly emphasis: string;
  };
  readonly services: {
    readonly heading: string;
    /** The big serif h2 for this section. */
    readonly title: string;
    readonly intro: string;
    readonly items: readonly {
      readonly title: string;
      readonly body: string;
      readonly bullets: readonly string[];
    }[];
  };
  readonly process: {
    readonly heading: string;
    /** The big serif h2 for this section. */
    readonly title: string;
    readonly intro: string;
    readonly steps: readonly { readonly title: string; readonly body: string }[];
  };
  readonly featured: {
    readonly heading: string;
    readonly kicker: string;
    readonly title: string;
    readonly href: string;
    readonly body: string;
    readonly tags: readonly string[];
    readonly image: string;
    readonly caseStudyHref: string;
  };
  readonly proof: {
    readonly heading: string;
    readonly quote: string;
    readonly author: string;
    readonly role: string;
    readonly stats: readonly { readonly value: string; readonly label: string }[];
  };
  readonly audience: {
    readonly heading: string;
    /** The big serif h2 for this section. */
    readonly title: string;
    readonly intro: string;
    readonly items: readonly string[];
  };
  readonly about: {
    readonly heading: string;
    /** The big serif h2 for this section. */
    readonly title: string;
    readonly name: string;
    readonly body: string;
    readonly points: readonly string[];
  };
  readonly faq: {
    readonly heading: string;
    /** The big serif h2 for this section. */
    readonly title: string;
    readonly intro: string;
    readonly items: readonly { readonly q: string; readonly a: string }[];
  };
  readonly ctaBand: {
    readonly heading: string;
    readonly body: string;
    readonly cta: Link;
  };
  readonly contact: {
    readonly heading: string;
    readonly intro: string;
    readonly needOptions: readonly string[];
    readonly successTitle: string;
    readonly successBody: string;
  };
  /**
   * Optional price band. Present on the business side because a local owner's
   * first question at the counter is "what's it cost" — an unanswered price
   * ends that conversation. Omitted for ministries, where scope varies far more
   * and proposals are the norm.
   */
  readonly pricing?: {
    readonly heading: string;
    readonly intro: string;
    readonly tiers: readonly {
      readonly name: string;
      readonly price: string;
      readonly unit: string;
      readonly body: string;
      readonly bullets: readonly string[];
      readonly featured?: boolean;
    }[];
    readonly footnote: string;
  };
};
