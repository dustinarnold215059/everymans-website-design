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
import { IconCheck, IconArrowUpRight } from "@/components/ui/icons";

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

const h3 = "text-[20px] font-extrabold tracking-[-0.01em]";

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={workJsonLd} />

      <section className="border-b border-line bg-paper">
        <Container className="pb-12 pt-16 sm:pt-20">
          <Reveal>
            <Kicker>Selected work</Kicker>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(34px,6vw,52px)] font-medium leading-[1.05] tracking-[-0.02em]">
              Real sites for real missions — built to last and easy to run.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
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
                <h2 className="font-display text-[clamp(28px,5vw,40px)] font-medium tracking-[-0.018em]">
                  {cs.name}
                </h2>
                <a
                  href={cs.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-hover"
                >
                  {new URL(cs.url).host}
                  <IconArrowUpRight width={15} height={15} />
                </a>
              </div>
              <p className="mt-2 max-w-3xl text-lg text-muted">{cs.summary}</p>
              <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1 text-sm text-muted">
                <span>
                  <span className="font-bold text-ink">Year:</span> {cs.year}
                </span>
                <span>
                  <span className="font-bold text-ink">Role:</span> {cs.role}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60} className="mt-10">
            <div className="rounded-[18px] border border-line bg-surface p-3 shadow-soft">
              <Screenshot
                src={cs.image}
                alt={`${cs.name} — homepage`}
                ratio="16/9"
                priority={idx === 0}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <h3 className={h3}>The problem</h3>
              <p className="mt-3 leading-relaxed text-muted">{cs.problem}</p>

              <h3 className={`${h3} mt-8`}>The stack</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cs.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-sand px-3 py-1 text-xs font-semibold text-fg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={80}>
              <h3 className={h3}>What I built</h3>
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

          <Reveal className="mt-12">
            <h3 className={h3}>Screenshot gallery</h3>
            <p className="mt-2 text-sm text-muted">Captured from the live site.</p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {cs.gallery.map((g) => (
                <figure key={g.label}>
                  <Screenshot src={g.image} alt={`${cs.name} — ${g.label}`} ratio="16/10" />
                  <figcaption className="mt-2.5 text-sm text-muted">
                    <span className="font-bold text-ink">{g.label}.</span> {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </Section>
      ))}

      <Section tone="ink">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-[clamp(28px,5vw,38px)] font-medium text-on-ink-bright">
              Want one like this?
            </h2>
            <p className="mt-3 max-w-xl text-on-ink-muted">
              Tell me about your mission and I&apos;ll show you what&apos;s possible.
            </p>
          </div>
          <div className="flex gap-3">
            <Button href="/#contact" size="lg" variant="primary">
              Start a project
            </Button>
            <Button href="/" size="lg" variant="onInk">
              Back home
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
