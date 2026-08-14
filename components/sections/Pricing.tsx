import type { PageContent } from "@/config/page-content";
import { Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Price band. Only rendered when the audience's content defines `pricing` —
 * the business side does, ministries does not, because a local owner asks
 * "what's it cost" in the first minute and a proposal-only answer ends it.
 */
export function Pricing({ content }: { content: PageContent }) {
  const { pricing } = content;
  if (!pricing) return null;

  return (
    <Section id="pricing" tone="sand">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[34em]">
            <Kicker>{pricing.heading}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(30px,5vw,40px)] font-medium leading-[1.08] tracking-[-0.018em]">
              One number, agreed before I start.
            </h2>
          </div>
          <p className="max-w-[22em] text-base leading-[1.55] text-muted">{pricing.intro}</p>
        </div>
      </Reveal>

      <div className="mt-[38px] grid gap-5 md:grid-cols-2">
        {pricing.tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 80} className="h-full">
            <article
              className={
                tier.featured
                  ? "flex h-full flex-col rounded-[18px] border-2 border-accent bg-surface px-[26px] pb-7 pt-[30px]"
                  : "flex h-full flex-col rounded-[18px] border border-line bg-surface px-[26px] pb-7 pt-[30px]"
              }
            >
              <h3 className="text-[20px] font-extrabold tracking-[-0.01em]">{tier.name}</h3>

              <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[clamp(34px,6vw,44px)] font-medium leading-none tracking-[-0.02em] text-ink">
                  {tier.price}
                </span>
                <span className="text-[14px] font-semibold text-faint">{tier.unit}</span>
              </p>

              <p className="mt-4 flex-1 text-[14.5px] leading-[1.6] text-muted">{tier.body}</p>

              <div className="mt-[18px] flex flex-col gap-[9px] border-t border-line-faint pt-[18px]">
                {tier.bullets.map((b) => (
                  <span key={b} className="flex gap-[9px] text-[13.5px] font-semibold text-fg">
                    <span className="text-accent" aria-hidden>
                      →
                    </span>
                    {b}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[18px] border border-line bg-surface px-[26px] py-6">
          <p className="max-w-[38em] text-[14.5px] leading-[1.6] text-muted">{pricing.footnote}</p>
          <Button href="#contact" variant="primary" size="md">
            Get a price
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
