import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { businessContent } from "@/config/business.config";
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
export default function BusinessPage() {
  return (
    <>
      <Hero content={businessContent} />
      <Services content={businessContent} />
      <Pricing content={businessContent} />
      <Process content={businessContent} />
      <FeaturedWork content={businessContent} />
      <Testimonials content={businessContent} />
      <WhoIServe content={businessContent} />
      <About content={businessContent} />
      <Faq content={businessContent} />
      <Contact content={businessContent} />
    </>
  );
}
