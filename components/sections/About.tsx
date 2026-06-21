import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="scroll-mt-[88px] pb-[74px] pt-10">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-[50px]">
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div
                className="relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[20px] border border-line"
                style={{ background: "linear-gradient(160deg, #20493A, #163029)" }}
                role="img"
                aria-label="Placeholder — replace with a friendly headshot of Dustin"
              >
                <svg width="62%" viewBox="0 0 100 120" fill="none" className="opacity-[0.92]" aria-hidden>
                  <circle cx="50" cy="42" r="22" fill="#2E5848" />
                  <path d="M14 120c0-22 16-36 36-36s36 14 36 36" fill="#2E5848" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-surface/[0.92] px-3.5 py-2 text-[12px] font-bold text-ink">
                    Placeholder · swap for a friendly headshot
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <Kicker>{about.heading}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(30px,5vw,40px)] font-medium leading-[1.08] tracking-[-0.018em]">
              A developer who&apos;s part of the work.
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
