import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { businessContent } from "@/config/business.config";
import { cities, getCity } from "@/config/cities";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Kicker, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const title = `Website Design in ${city.name}, MI`;
  const description = `Fast, mobile-friendly websites for ${city.name} businesses — ${city.trades
    .slice(0, 3)
    .join(", ")} and more. Fixed price from ${businessContent.pricing?.tiers[0]?.price}, built and maintained by one person.`;

  return {
    title,
    description,
    keywords: [
      `web design ${city.name}`,
      `website design ${city.name} MI`,
      `${city.name} web designer`,
      `small business website ${city.name}`,
    ],
    alternates: { canonical: `/business/${city.slug}` },
    openGraph: {
      type: "website",
      url: `/business/${city.slug}`,
      title,
      description,
      images: [{ url: "/business/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

/**
 * One landing page per service-area city.
 *
 * The top of the page is genuinely city-specific — real commercial corridors
 * and the trades that are actually thick on the ground there — and the rest
 * reuses the business sections. That distinction matters: a page that only
 * swaps a city name into boilerplate is a doorway page, and Google treats it
 * as one.
 */
export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const others = cities.filter((c) => c.slug !== city.slug);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — ${city.name}`,
    url: `${siteUrl}/business/${city.slug}`,
    email: siteConfig.email,
    areaServed: { "@type": "City", name: `${city.name}, MI` },
    serviceType: "Website design and maintenance for local businesses",
    priceRange: `${businessContent.pricing?.tiers[0]?.price}+`,
    provider: { "@type": "Person", name: "Dustin" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Local business", item: `${siteUrl}/business` },
      {
        "@type": "ListItem",
        position: 2,
        name: city.name,
        item: `${siteUrl}/business/${city.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section id="top" className="scroll-mt-[88px] border-b border-line">
        <Container className="pb-14 pt-16 sm:pt-20">
          <Reveal>
            <Kicker>Websites for {city.name} businesses</Kicker>
            <h1 className="mt-3 max-w-4xl font-display text-[clamp(34px,6vw,52px)] font-medium leading-[1.05] tracking-[-0.02em]">
              Your {city.inline} customers look you up before they call.{" "}
              <span className="italic text-ink-soft">Give them something to find.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[18px] leading-[1.6] text-muted">{city.note}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[18px] border border-line bg-surface px-[26px] py-6">
                <h2 className="text-[15px] font-extrabold tracking-[-0.01em]">
                  Where I work in {city.inline}
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-muted">
                  {city.corridors.slice(0, -1).join(", ")} and {city.corridors.at(-1)}.
                </p>
              </div>
              <div className="rounded-[18px] border border-line bg-surface px-[26px] py-6">
                <h2 className="text-[15px] font-extrabold tracking-[-0.01em]">
                  Who I build for here
                </h2>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-muted">
                  {city.trades.slice(0, -1).join(", ")} and {city.trades.at(-1)}.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="#pricing" size="lg" variant="primary">
                See the price
              </Button>
              <Button href="#contact" size="lg" variant="outline">
                Get a price for your shop
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Services content={businessContent} />
      <Pricing content={businessContent} />
      <Process content={businessContent} />
      <FeaturedWork content={businessContent} />
      <Faq content={businessContent} />

      <Section tone="sand">
        <Kicker>Service area</Kicker>
        <h2 className="mt-3 font-display text-[clamp(26px,4.5vw,34px)] font-medium tracking-[-0.018em]">
          I also build for shops in these cities.
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {others.map((c) => (
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
