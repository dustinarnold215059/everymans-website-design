import { siteConfig } from "@/config/site.config";
import { Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IconArrowRight, IconArrowUpRight } from "@/components/ui/icons";

export function FeaturedWork() {
  const { featured } = siteConfig;

  return (
    <Section id="work" tone="ink">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="rounded-xl2 border border-on-ink/15 bg-ink-soft p-3 shadow-lift">
            <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
              <span className="h-2.5 w-2.5 rounded-full bg-on-ink/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-on-ink/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-on-ink/20" />
              <span className="ml-3 h-5 flex-1 rounded-full bg-on-ink/10" />
            </div>
            <PlaceholderImage
              label="Abolish Abortion Michigan"
              caption="Swap for a real homepage screenshot"
              ratio="16/10"
              tone="dark"
            />
          </div>
        </Reveal>

        <Reveal delay={80} className="order-1 lg:order-2">
          <Kicker onInk>{featured.kicker}</Kicker>
          <h2 className="mt-4 text-3xl text-on-ink sm:text-4xl">{featured.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-on-ink-muted">{featured.body}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {featured.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-on-ink/20 px-3 py-1 text-xs font-medium text-on-ink-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={featured.caseStudyHref} variant="primary" size="lg">
              Read the case study
              <IconArrowRight width={18} height={18} />
            </Button>
            <Button href={featured.href} variant="onInk" size="lg">
              Visit the live site
              <IconArrowUpRight width={16} height={16} />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
