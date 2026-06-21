import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const { proof } = siteConfig;

  const emph = "we never had to explain ourselves.";
  const idx = proof.quote.lastIndexOf(emph);
  const pre = idx >= 0 ? proof.quote.slice(0, idx) : proof.quote;
  const hasEmph = idx >= 0;

  return (
    <section id="proof" className="pb-16">
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 rounded-[22px] border border-line bg-sand px-8 py-10 sm:px-11 sm:py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-[46px]">
            <div>
              <Kicker>{proof.heading}</Kicker>
              <blockquote className="mt-[18px] font-display text-[clamp(22px,3.5vw,27px)] font-normal leading-[1.32] tracking-[-0.01em]">
                &ldquo;{pre}
                {hasEmph && <span className="italic text-ink-soft">{emph}</span>}&rdquo;
              </blockquote>
              <div className="mt-[22px] flex items-center gap-3">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-ink text-[15px] font-extrabold text-on-ink">
                  AAM
                </div>
                <div>
                  <div className="text-[14.5px] font-bold">{proof.author}</div>
                  <div className="text-[12.5px] text-faint">{proof.role}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              {proof.stats.map((s) => (
                <div key={s.label} className="rounded-[14px] border border-line bg-surface px-5 py-[18px]">
                  <div className="font-display text-[30px] font-semibold text-ink-soft">{s.value}</div>
                  <div className="mt-0.5 text-[13.5px] font-semibold text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
