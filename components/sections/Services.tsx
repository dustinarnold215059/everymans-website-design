import { siteConfig } from "@/config/site.config";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconBrowser, IconShield, IconBolt, IconCheck } from "@/components/ui/icons";

const icons = [IconBrowser, IconShield, IconBolt];

export function Services() {
  const { services } = siteConfig;

  return (
    <Section id="services" tone="paper">
      <Reveal>
        <SectionHeading kicker={services.heading} title="Build it, keep it running, automate the rest." intro={services.intro} />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.items.map((item, i) => {
          const Icon = icons[i] ?? IconBrowser;
          return (
            <Reveal key={item.title} delay={i * 80} className="h-full">
              <article className="group flex h-full flex-col rounded-xl2 border border-line bg-paper p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-on-ink">
                  <Icon width={24} height={24} />
                </div>
                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-fg">
                      <IconCheck width={16} height={16} className="shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
