import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoIServe } from "@/components/sections/WhoIServe";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

const title = "Web Design for Churches, Ministries & Nonprofits";
const description = siteConfig.ministriesDescription;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ministries" },
  openGraph: {
    type: "website",
    url: "/ministries",
    title: `${title} · ${siteConfig.name}`,
    description,
  },
};

/**
 * The ministries landing page — this is the site that lived at `/` until the
 * chooser was added, so its copy and section order are unchanged. Sections
 * default to `siteConfig`, so no content prop is needed here.
 */
export default function MinistriesPage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <FeaturedWork />
      <Testimonials />
      <WhoIServe />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
