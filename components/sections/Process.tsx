import { siteConfig } from "@/config/site.config";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const { process } = siteConfig;

  return (
    <Section id="process" tone="sand">
      <Reveal>
        <SectionHeading kicker={process.heading} title="From first hello to a site you're proud of." intro={process.intro} />
      </Reveal>

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 80} as="li" className="h-full">
            <div className="relative flex h-full flex-col rounded-xl2 border border-line bg-paper p-6 shadow-soft">
              <span className="font-display text-3xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
