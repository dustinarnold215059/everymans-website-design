import { siteConfig } from "@/config/site.config";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconChurch,
  IconHeart,
  IconUsers,
  IconFlag,
  IconStore,
} from "@/components/ui/icons";

const icons = [IconChurch, IconHeart, IconUsers, IconFlag, IconStore];

export function WhoIServe() {
  const { audience } = siteConfig;

  return (
    <Section id="who" tone="sand">
      <Reveal>
        <SectionHeading kicker={audience.heading} title="If your work matters, your website should too." intro={audience.intro} />
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {audience.items.map((item, i) => {
          const Icon = icons[i] ?? IconUsers;
          return (
            <Reveal key={item} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col items-start gap-3 rounded-xl2 border border-line bg-paper p-5 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent">
                  <Icon width={22} height={22} />
                </span>
                <span className="text-sm font-semibold text-ink">{item}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
