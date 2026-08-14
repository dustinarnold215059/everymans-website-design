import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { businessContent } from "@/config/business.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const title = "Web Design for Ministries & Local Businesses";
const description =
  "I build fast, modern websites two ways: for churches, ministries and nonprofits, and for local businesses around Metro Detroit. Pick the one that sounds like you.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: `${title} · ${siteConfig.name}`, description },
};

/**
 * The chooser. Two audiences need different words, so rather than compromise on
 * one homepage that half-speaks to each, this page asks one question and sends
 * the visitor to a landing page written for them.
 *
 * Deliberately short: it is a signpost, not a sales page.
 *
 * The cards are text-only on purpose. They previously carried a screenshot of
 * each side's case study, but the ministries one renders "ABOLISH ABORTION
 * MICHIGAN" in large type — and this page is what anyone typing the bare domain
 * lands on, including a local-business prospect. Nothing here names either
 * client.
 */
const DOORS = [
  {
    href: "/ministries",
    kicker: "Churches, ministries & nonprofits",
    title: "My work has a mission.",
    body: siteConfig.hero.subhead,
    points: ["Petitions & signups", "Donations & events", "Content you can update"],
    cta: "For ministries",
  },
  {
    href: "/business",
    kicker: "Local businesses",
    title: "My customers need to find me.",
    body: businessContent.hero.subhead,
    points: ["Works on phones first", "Click-to-call & directions", "Fixed price, said up front"],
    cta: "For local business",
  },
] as const;

export default function ChooserPage() {
  return (
    <section id="top" className="scroll-mt-[88px]">
      <Container className="py-16 sm:py-[74px]">
        <Reveal>
          <div className="max-w-[36em]">
            <Kicker>Every Man&apos;s Website Design</Kicker>
            <h1 className="mt-3 font-display text-[clamp(34px,6vw,52px)] font-medium leading-[1.06] tracking-[-0.022em]">
              I build websites two ways.{" "}
              <span className="italic text-ink-soft">Which one sounds like you?</span>
            </h1>
            <p className="mt-5 text-[18px] leading-[1.6] text-muted">
              Same person, same care, different words — because a church and an auto shop are not
              trying to say the same thing.
            </p>
          </div>
        </Reveal>

        <div className="mt-[46px] grid gap-6 lg:grid-cols-2">
          {DOORS.map((door, i) => (
            <Reveal key={door.href} delay={i * 90} className="h-full">
              <Link
                href={door.href}
                className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface transition-colors duration-200 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="flex flex-1 flex-col px-[26px] pb-7 pt-[30px]">
                  <Kicker>{door.kicker}</Kicker>
                  <h2 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-[-0.015em]">
                    {door.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14.5px] leading-[1.6] text-muted">{door.body}</p>

                  <div className="mt-[18px] flex flex-col gap-[9px] border-t border-line-faint pt-[18px]">
                    {door.points.map((p) => (
                      <span key={p} className="flex gap-[9px] text-[13.5px] font-semibold text-fg">
                        <span className="text-accent" aria-hidden>
                          →
                        </span>
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-ink px-[18px] py-[10px] text-[14.5px] font-bold text-on-ink-bright transition-colors group-hover:bg-ink-soft">
                      {door.cta}
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-[14.5px] text-muted">
            Not sure which?{" "}
            <Button href={`mailto:${siteConfig.email}`} variant="outline" size="md" className="ml-1 align-middle">
              Just ask me
            </Button>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
