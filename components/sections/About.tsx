import { siteConfig } from "@/config/site.config";
import { Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IconCheck } from "@/components/ui/icons";

export function About() {
  const { about } = siteConfig;

  return (
    <Section id="about" tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-accent/10 blur-2xl" aria-hidden />
            <PlaceholderImage label="Dustin" caption="Swap for a friendly headshot" ratio="4/3" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Kicker>{about.heading}</Kicker>
          <h2 className="mt-4 text-3xl sm:text-4xl">A developer who&apos;s part of the work.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{about.body}</p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-1">
            {about.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-fg">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <IconCheck width={15} height={15} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
