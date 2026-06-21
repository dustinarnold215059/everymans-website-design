import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function WhoIServe() {
  const { audience } = siteConfig;

  return (
    <section id="who" className="pb-16">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[30em] text-center">
            <Kicker>{audience.heading}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(28px,4.5vw,38px)] font-medium leading-[1.08] tracking-[-0.018em]">
              If your work matters, your website should too.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3">
            {audience.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-surface px-[22px] py-3 text-[15px] font-bold text-fg"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
