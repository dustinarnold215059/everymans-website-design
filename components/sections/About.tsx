import { siteConfig } from "@/config/site.config";
import type { PageContent } from "@/config/page-content";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About({ content = siteConfig }: { content?: PageContent }) {
  const { about } = content;

  return (
    <section id="about" className="scroll-mt-[88px] pb-[74px] pt-10">
      <Container>
        {/* Single column until there is a real headshot — a placeholder portrait
            reads as an unfinished site, which is the opposite of the pitch. */}
        <div className="max-w-[52em]">
          <Reveal delay={80}>
            <Kicker>{about.heading}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(30px,5vw,40px)] font-medium leading-[1.08] tracking-[-0.018em]">
              {about.title}
            </h2>
            <p className="mt-[18px] max-w-[36em] text-[17px] leading-[1.66] text-muted">{about.body}</p>
            <div className="mt-6 flex flex-col gap-3">
              {about.points.map((p) => (
                <span key={p} className="flex items-start gap-3 text-[15px] font-semibold">
                  <span className="mt-px text-accent" aria-hidden>
                    ✦
                  </span>
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
