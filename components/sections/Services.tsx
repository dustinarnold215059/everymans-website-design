import { siteConfig } from "@/config/site.config";
import { Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconBuild, IconCare, IconData } from "@/components/ui/icons";

const icons = [IconBuild, IconCare, IconData];

export function Services() {
  const { services } = siteConfig;

  return (
    <Section id="services" tone="paper">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[34em]">
            <Kicker>{services.heading}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(30px,5vw,40px)] font-medium leading-[1.08] tracking-[-0.018em]">
              Build it, keep it running, automate the rest.
            </h2>
          </div>
          <p className="max-w-[22em] text-base leading-[1.55] text-muted">{services.intro}</p>
        </div>
      </Reveal>

      <div className="mt-[38px] grid gap-5 md:grid-cols-3">
        {services.items.map((item, i) => {
          const Icon = icons[i] ?? IconBuild;
          return (
            <Reveal key={item.title} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-[18px] border border-line bg-surface px-[26px] pb-7 pt-[30px] transition-colors duration-200 hover:border-accent">
                <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-ink">
                  <Icon />
                </div>
                <h3 className="mt-5 text-[20px] font-extrabold tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-muted">{item.body}</p>
                <div className="mt-[18px] flex flex-col gap-[9px] border-t border-line-faint pt-[18px]">
                  {item.bullets.map((b) => (
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
          );
        })}
      </div>
    </Section>
  );
}
