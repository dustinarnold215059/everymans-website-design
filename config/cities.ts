/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SERVICE-AREA CITIES — powers /business/[city]
 * ─────────────────────────────────────────────────────────────────────────────
 *  One landing page per city so the site can rank for "web design <city>",
 *  which is how a local owner actually searches.
 *
 *  The corridors and trades below are REAL — pulled from a survey of ~7,300
 *  businesses across these cities, not invented. That matters: a page that
 *  names Warren Ave and Schaefer Rd reads as local knowledge, while a page that
 *  swaps the city name into boilerplate is a doorway page and Google treats it
 *  as one. If you add a city, use streets you can actually point at.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type City = {
  readonly slug: string;
  readonly name: string;
  /** How it reads mid-sentence: "shops in <inline>". */
  readonly inline: string;
  /** Main commercial corridors, most businesses first. */
  readonly corridors: readonly string[];
  /** Trades that are thick on the ground here, in plain words. */
  readonly trades: readonly string[];
  /** One true, specific line about the local business landscape. */
  readonly note: string;
};

export const cities: readonly City[] = [
  {
    slug: "dearborn",
    name: "Dearborn",
    inline: "Dearborn",
    corridors: ["Michigan Ave", "Schaefer Rd", "Warren Ave", "Greenfield Rd"],
    trades: ["auto repair shops", "clothing stores", "restaurants", "movers"],
    note: "The Michigan Ave, Schaefer and Warren corridors are among the densest stretches of independent, owner-run storefronts anywhere in the metro — and a lot of them have no website at all.",
  },
  {
    slug: "detroit",
    name: "Detroit",
    inline: "Detroit",
    corridors: ["Warren Ave", "Michigan Ave", "Joy Rd", "Greenfield Rd"],
    trades: ["auto repair shops", "car dealers", "restaurants", "barber shops"],
    note: "West-side commercial strips like Warren and Joy carry hundreds of independent shops. Most are busy and well-reviewed; far fewer have anything for a customer to find online.",
  },
  {
    slug: "livonia",
    name: "Livonia",
    inline: "Livonia",
    corridors: ["Five Mile Rd", "Middlebelt Rd", "Plymouth Rd", "Schoolcraft"],
    trades: ["dental and medical practices", "auto repair shops", "physical therapists", "salons"],
    note: "Livonia runs heavily to independent practices and service businesses along Five Mile, Middlebelt and Plymouth Rd — the kind that live or die on being findable when someone needs them.",
  },
  {
    slug: "westland",
    name: "Westland",
    inline: "Westland",
    corridors: ["Wayne Rd", "Warren Rd", "Ford Rd", "Middlebelt Rd"],
    trades: ["auto repair shops", "salons and barber shops", "dental practices", "laundromats"],
    note: "The Wayne Rd and Ford Rd strips are packed with owner-operated shops. Plenty of them have hundreds of Google reviews and nowhere to send a customer afterward.",
  },
  {
    slug: "canton",
    name: "Canton",
    inline: "Canton",
    corridors: ["Canton Center Rd", "Ford Rd", "Lilley Rd", "Cherry Hill Rd"],
    trades: ["dental practices", "salons", "restaurants", "auto repair shops"],
    note: "Canton's business is spread across plazas on Ford, Canton Center and Lilley rather than one main street — which makes being findable online matter more, not less.",
  },
  {
    slug: "plymouth",
    name: "Plymouth",
    inline: "Plymouth",
    corridors: ["Main St", "Ann Arbor Rd", "Ann Arbor Trail", "Haggerty Rd"],
    trades: ["salons", "dental practices", "restaurants", "auto repair shops"],
    note: "Downtown Plymouth trades on foot traffic and word of mouth, but visitors still look a place up before they drive out — and the Ann Arbor Rd businesses depend on search entirely.",
  },
  {
    slug: "taylor",
    name: "Taylor",
    inline: "Taylor",
    corridors: ["Ecorse Rd", "Telegraph Rd", "Goddard Rd", "Van Born Rd"],
    trades: ["auto repair shops", "dental practices", "movers", "restaurants"],
    note: "Telegraph and Ecorse carry a long run of independent trades and service businesses, weighted heavily toward automotive.",
  },
  {
    slug: "dearborn-heights",
    name: "Dearborn Heights",
    inline: "Dearborn Heights",
    corridors: ["Ford Rd", "Van Born Rd", "Telegraph Rd", "Warren St"],
    trades: ["auto repair shops", "restaurants", "salons", "contractors"],
    note: "Ford Rd and Telegraph are the spine here, with a steady mix of family-run shops and trades working mostly on referral.",
  },
  {
    slug: "redford",
    name: "Redford Township",
    inline: "Redford",
    corridors: ["Plymouth Rd", "Five Mile Rd", "Telegraph Rd", "Six Mile Rd"],
    trades: ["auto repair shops", "salons", "contractors", "restaurants"],
    note: "Plymouth Rd and Telegraph run through most of Redford's commercial base — small, long-established shops that have never needed to advertise.",
  },
  {
    slug: "garden-city",
    name: "Garden City",
    inline: "Garden City",
    corridors: ["Ford Rd", "Middlebelt Rd", "Inkster Rd", "Warren Rd"],
    trades: ["auto repair shops", "salons", "dental practices", "restaurants"],
    note: "A compact city where nearly everything sits on Ford or Middlebelt — which means your competition is whoever shows up first when someone searches.",
  },
  {
    slug: "ypsilanti",
    name: "Ypsilanti",
    inline: "Ypsilanti",
    corridors: ["Michigan Ave", "Washtenaw Ave", "Ecorse Rd", "Huron St"],
    trades: ["auto repair shops", "barber shops", "restaurants", "salons"],
    note: "Depot Town and the Michigan Ave strip run on independents, and a student-heavy customer base looks everything up on a phone first.",
  },
  {
    slug: "inkster",
    name: "Inkster",
    inline: "Inkster",
    corridors: ["Michigan Ave", "Inkster Rd", "Middlebelt Rd", "Cherry Hill Rd"],
    trades: ["auto repair shops", "hair salons", "barber shops", "restaurants"],
    note: "A high share of Inkster's businesses are owner-run with no web presence at all — among the highest I've measured anywhere in the metro.",
  },
  {
    slug: "northville",
    name: "Northville",
    inline: "Northville",
    corridors: ["Main St", "Seven Mile Rd", "Six Mile Rd", "Center St"],
    trades: ["salons", "dental practices", "physical therapists", "restaurants"],
    note: "Downtown Northville is a destination, and destinations get looked up before anyone gets in the car.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
