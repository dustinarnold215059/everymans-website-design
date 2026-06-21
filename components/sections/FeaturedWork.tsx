import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { blurData } from "@/config/blur";
import { Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const STATS = [
  { value: "Live", label: "petition system" },
  { value: "Live", label: "bill tracker" },
  { value: "100%", label: "mobile-ready" },
];

export function FeaturedWork() {
  const { featured } = siteConfig;

  return (
    <Section id="work" tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-[50px]">
        <Reveal>
          <Kicker>{featured.kicker}</Kicker>
          <h2 className="mt-3 font-display text-[clamp(32px,5.5vw,42px)] font-medium leading-[1.06] tracking-[-0.018em]">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-[32em] text-[16.5px] leading-[1.62] text-muted">{featured.body}</p>

          <ul className="mt-[22px] flex flex-wrap gap-[9px]">
            {featured.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line bg-sand px-[13px] py-[7px] text-[13px] font-semibold text-fg"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3.5">
            <Button href={featured.caseStudyHref} variant="forest" className="px-6 py-3 text-[15px]">
              Read the case study
            </Button>
            <Button href={featured.href} variant="outline" className="px-6 py-3 text-[15px]">
              Visit the live site →
            </Button>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-card">
            <div className="flex items-center gap-[7px] border-b border-line bg-sand px-3.5 py-3">
              <span className="h-[9px] w-[9px] rounded-full bg-accent" />
              <span className="h-[9px] w-[9px] rounded-full bg-amber" />
              <span className="h-[9px] w-[9px] rounded-full bg-sage" />
            </div>
            <div className="relative aspect-[16/10] w-full bg-sand">
              <Image
                src={featured.image}
                alt={`${featured.title} homepage`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                placeholder="blur"
                blurDataURL={blurData[featured.image]}
                className="object-cover object-top"
              />
            </div>
            <div className="flex justify-between px-[26px] py-[22px]">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[22px] font-semibold text-ink-soft">{s.value}</div>
                  <div className="text-[11px] font-semibold text-faint">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
