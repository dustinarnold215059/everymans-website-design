import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhoIServe } from "@/components/sections/WhoIServe";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Process />
      <FeaturedWork />
      <Testimonials />
      <WhoIServe />
      <About />
      <Faq />
      <CtaBand />
      <Contact />
    </>
  );
}
