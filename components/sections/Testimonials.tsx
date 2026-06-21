import { siteConfig } from "@/config/site.config";
import { Section, Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const { proof } = siteConfig;

  return (
    <Section id="proof" tone="ink">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal>
          <Kicker onInk>{proof.heading}</Kicker>
          <figure className="mt-6">
            <blockquote className="font-display text-2xl leading-snug text-on-ink sm:text-3xl">
              <span aria-hidden className="text-accent">“</span>
              {proof.quote}
              <span aria-hidden className="text-accent">”</span>
            </blockquote>
            <figcaption className="mt-6">
              <span className="block font-semibold text-on-ink">{proof.author}</span>
              <span className="block text-sm text-on-ink-muted">{proof.role}</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={100}>
          <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {proof.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl2 border border-on-ink/15 bg-ink-soft px-5 py-4"
              >
                <dt className="font-display text-2xl text-accent-soft">{s.value}</dt>
                <dd className="mt-1 text-sm text-on-ink-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
