import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/config/case-studies";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section, Kicker } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { IconCheck, IconArrowUpRight, IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Every Man's Website Design — including Abolish Abortion Michigan, built from the ground up on Next.js and Vercel.",
  alternates: { canonical: "/work" },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/work` },
  ],
};

const workJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: caseStudies.map((cs, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: cs.name,
      url: cs.url,
      image: `${siteUrl}${cs.image}`,
      description: cs.summary,
      dateCreated: cs.year,
      creator: { "@type": "Person", name: "Dustin" },
      keywords: cs.stack.join(", "),
    },
  })),
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={workJsonLd} />
      {/* Page header */}
      <section className="border-b border-line bg-paper">
        <Container className="pb-12 pt-16 sm:pt-20">
          <Reveal>
            <Kicker>Selected work</Kicker>
            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-5xl">
              Real sites for real missions — built to last and easy to run.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted">
              A closer look at what I&apos;ve built — captured from the live, in-production site.
            </p>
          </Reveal>
        </Container>
      </section>

      {caseStudies.map((cs, idx) => (
        <Section key={cs.slug} id={cs.slug} tone={idx % 2 === 0 ? "paper" : "sand"}>
          <Reveal>
            <div className="flex flex-col gap-2">
              <Kicker>Case study</Kicker>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl">{cs.name}</h2>
                <a
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-soft"
                >
                  {new URL(cs.url).host}
                  <IconArrowUpRight width={15} height={15} />
                </a>
              </div>
              <p className="mt-2 max-w-3xl text-lg text-muted">{cs.summary}</p>
              <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm text-muted">
                <span>
                  <span className="font-semibold text-ink">Year:</span> {cs.year}
                </span>
                <span>
                  <span className="font-semibold text-ink">Role:</span> {cs.role}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Hero screenshot */}
          <Reveal delay={60} className="mt-10">
            <div className="rounded-xl2 border border-line bg-paper p-3 shadow-soft">
              <Screenshot
                src={cs.image}
                alt={`${cs.name} — homepage`}
                ratio="16/9"
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </Reveal>

          {/* Problem / What I built / Stack */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <h3 className="text-xl">The problem</h3>
              <p className="mt-3 leading-relaxed text-muted">{cs.problem}</p>

              <h3 className="mt-8 text-xl">The stack</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-fg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="text-xl">What I built</h3>
              <ul className="mt-4 space-y-3">
                {cs.built.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-fg">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                      <IconCheck width={15} height={15} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Gallery */}
          <Reveal className="mt-12">
            <h3 className="text-xl">Screenshot gallery</h3>
            <p className="mt-2 text-sm text-muted">Captured from the live site.</p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {cs.gallery.map((g) => (
                <figure key={g.label}>
                  <Screenshot src={g.image} alt={`${cs.name} — ${g.label}`} ratio="16/10" />
                  <figcaption className="mt-2.5 text-sm text-muted">
                    <span className="font-medium text-ink">{g.label}.</span> {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </Section>
      ))}

      {/* Closing CTA */}
      <Section tone="ink">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl text-on-ink sm:text-4xl">Want one like this?</h2>
            <p className="mt-3 max-w-xl text-on-ink-muted">
              Tell me about your mission and I&apos;ll show you what&apos;s possible.
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="/#contact" size="lg" variant="primary">
              Start a project
              <IconArrowRight width={18} height={18} />
            </Button>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-on-ink/30 px-6 py-3.5 text-base font-semibold text-on-ink hover:bg-on-ink/10"
            >
              Back home
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
