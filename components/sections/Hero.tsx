import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { blurData } from "@/config/blur";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = ["Fast, Lighthouse-friendly", "Secure by default", "Built & maintained by me"];

export function Hero() {
  const { hero, trust, featured } = siteConfig;

  // Italicize the closing phrase of the headline, per the design.
  const emph = "gets the mission.";
  const idx = hero.headline.lastIndexOf(emph);
  const pre = idx >= 0 ? hero.headline.slice(0, idx) : hero.headline;
  const hasEmph = idx >= 0;

  return (
    <section id="top" className="relative scroll-mt-[88px]">
      <Container className="pb-10 pt-[72px] lg:pb-[40px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-[9px] rounded-full bg-accent-tint px-3.5 py-[7px] text-[12.5px] font-bold tracking-[0.02em] text-accent-hover">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {hero.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-[22px] font-display text-[clamp(36px,7vw,58px)] font-medium leading-[1.04] tracking-[-0.02em]">
                {pre}
                {hasEmph && <span className="italic text-ink-soft">{emph}</span>}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-[30em] text-[19px] leading-[1.6] text-muted">{hero.subhead}</p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-[30px] flex flex-wrap gap-3.5">
                <Button href={hero.primary.href} size="lg" variant="primary">
                  {hero.primary.label}
                </Button>
                <Button href={hero.secondary.href} size="lg" variant="outline">
                  {hero.secondary.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-[34px] flex flex-wrap gap-x-[22px] gap-y-3">
                {FEATURES.map((f) => (
                  <span key={f} className="flex items-center gap-2 text-[14px] font-semibold text-muted">
                    <span className="text-ink-soft" aria-hidden>
                      ✦
                    </span>
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Faux-browser preview with the real AAM screenshot */}
          <Reveal delay={150} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 z-0 h-[130px] w-[130px]"
              style={{ background: "radial-gradient(circle, #EAD8C9 0%, transparent 70%)" }}
            />
            <div className="relative z-[1] overflow-hidden rounded-[16px] border border-line bg-surface shadow-float animate-float motion-reduce:animate-none">
              <div className="flex items-center gap-[7px] border-b border-line bg-sand px-3.5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                <span className="h-2.5 w-2.5 rounded-full bg-sage" />
                <span className="ml-2.5 flex h-[18px] flex-1 items-center rounded-md bg-paper px-2.5 text-[10.5px] font-semibold text-faint">
                  abolishabortionmichigan.com
                </span>
              </div>
              <div className="relative aspect-[16/11] w-full bg-sand">
                <Image
                  src={featured.image}
                  alt={`${featured.title} — homepage built by ${siteConfig.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  placeholder="blur"
                  blurDataURL={blurData[featured.image]}
                  className="object-cover object-top"
                />
              </div>
            </div>
            <p className="relative z-[1] mt-4 text-center text-[13px] font-semibold text-faint">
              {trust.line.replace(/Abolish Abortion Michigan\.?$/, "")}
              <span className="text-fg">Abolish Abortion Michigan.</span>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
