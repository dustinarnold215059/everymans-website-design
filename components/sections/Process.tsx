import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const { process } = siteConfig;

  return (
    <section id="process" className="mt-6 scroll-mt-[70px] bg-ink text-on-ink">
      <Container className="py-[74px]">
        <Reveal>
          <div className="max-w-[38em]">
            <Kicker onInk>{process.heading}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(30px,5vw,40px)] font-medium leading-[1.08] tracking-[-0.018em] text-on-ink-bright">
              From first hello to a site you&apos;re proud of.
            </h2>
            <p className="mt-3.5 text-[16.5px] leading-[1.55] text-on-ink-muted">{process.intro}</p>
          </div>
        </Reveal>

        <div className="mt-[42px] grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <div className="border-t-2 border-sage-deep pt-5">
                <div className="font-display text-[34px] text-sage">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-2.5 text-[18px] font-extrabold text-on-ink-bright">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-on-ink-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
