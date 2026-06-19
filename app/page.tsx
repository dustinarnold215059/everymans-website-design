import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { WhoIServe } from "@/components/sections/WhoIServe";
import { About } from "@/components/sections/About";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <FeaturedWork />
      <WhoIServe />
      <About />
      <CtaBand />
      <Contact />
    </>
  );
}
