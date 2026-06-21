import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { Button } from "@/components/ui/Button";
import { IconArrowUpRight } from "@/components/ui/icons";

const REASSURANCE = [
  "I read and reply to every message myself",
  "Straight talk on scope, timeline, and price",
  "No obligation — just a conversation",
];

export function Contact() {
  const { contact } = siteConfig;

  return (
    <section id="contact" className="scroll-mt-[88px]">
      <Container className="py-[74px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-[54px]">
          <Reveal className="min-w-0">
            <Kicker>Contact</Kicker>
            <h2 className="mt-3 font-display text-[clamp(32px,5.5vw,44px)] font-medium leading-[1.05] tracking-[-0.02em]">
              {contact.heading}
            </h2>
            <p className="mt-[18px] max-w-[32em] text-[17px] leading-[1.62] text-muted">{contact.intro}</p>

            <div className="mt-[26px] flex flex-col gap-[13px]">
              {REASSURANCE.map((line) => (
                <span key={line} className="flex items-center gap-[11px] text-[15px] font-semibold">
                  <span className="text-ink-soft" aria-hidden>
                    ✦
                  </span>
                  {line}
                </span>
              ))}
            </div>

            {siteConfig.booking.url ? (
              <div className="mt-[30px] rounded-[14px] border border-line bg-sand p-5">
                <p className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-faint">
                  Prefer to talk it through?
                </p>
                <Button href={siteConfig.booking.url} variant="outline" size="md" className="mt-3">
                  {siteConfig.booking.label}
                  <IconArrowUpRight width={16} height={16} />
                </Button>
              </div>
            ) : null}

            <div className="mt-[30px] rounded-[14px] border border-line bg-sand px-[22px] py-[18px]">
              <div className="text-[12.5px] font-bold uppercase tracking-[0.08em] text-faint">Prefer email?</div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 inline-block break-words border-b-2 border-accent text-[16px] font-bold text-ink"
              >
                {siteConfig.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={80} className="min-w-0">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
