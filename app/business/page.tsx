import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { businessContent } from "@/config/business.config";
import { getGoogleReviews } from "@/lib/google-reviews";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoIServe } from "@/components/sections/WhoIServe";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import Link from "next/link";
import { cities } from "@/config/cities";
import { Section, Kicker } from "@/components/ui/Section";

const title = "Websites for Local Businesses in Metro Detroit";
const description =
  "Fast, mobile-friendly websites for local shops, salons, auto repair, contractors, and restaurants around Metro Detroit. Fixed price, agreed before I start.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "small business website design",
    "local business website",
    "Metro Detroit web design",
    "website for auto repair shop",
    "salon website design",
    "restaurant website design",
    "contractor website design",
  ],
  alternates: { canonical: "/business" },
  openGraph: {
    type: "website",
    url: "/business",
    title: `${title} · ${siteConfig.name}`,
    description,
  },
};

/**
 * The small-business landing page. Same sections as /ministries, driven by
 * `businessContent` instead — plus a price band, which ministries does not get
 * because a local owner asks the cost in the first minute.
 */
export default async function BusinessPage() {
  // Real Google reviews when the GBP is verified and has any; otherwise the
  // component falls back to the written testimonial.
  const reviews = await getGoogleReviews();
  return (
    <>
      <Hero content={businessContent} />
      <Services content={businessContent} />
      <Pricing content={businessContent} />
      <Process content={businessContent} />
      <FeaturedWork content={businessContent} />
      <Testimonials content={businessContent} reviews={reviews} />
      <WhoIServe content={businessContent} />
      <About content={businessContent} />
      <Faq content={businessContent} />

      {/* Entry point to the per-city pages — without these links crawlers
          never reach them, and neither do visitors. */}
      <Section tone="sand">
        <Kicker>Service area</Kicker>
        <h2 className="mt-3 font-display text-[clamp(26px,4.5vw,34px)] font-medium tracking-[-0.018em]">
          Where I build.
        </h2>
        <p className="mt-3.5 max-w-[42em] text-base leading-[1.55] text-muted">
          Metro Detroit, mostly the western and downriver suburbs. Pick your city to see the
          streets and trades I work in.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/business/${c.slug}`}
                className="inline-flex rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Contact content={businessContent} />
    </>
  );
}
