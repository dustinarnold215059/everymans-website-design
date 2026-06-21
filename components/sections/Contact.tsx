import { siteConfig } from "@/config/site.config";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { Button } from "@/components/ui/Button";
import { IconCheck, IconArrowUpRight } from "@/components/ui/icons";

export function Contact() {
  const { contact } = siteConfig;

  return (
    <Section id="contact" tone="sand">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="min-w-0">
          <SectionHeading kicker="Contact" title={contact.heading} intro={contact.intro} />

          <ul className="mt-8 space-y-4">
            {[
              "I read and reply to every message myself",
              "Straight talk on scope, timeline, and price",
              "No obligation — just a conversation",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[15px] text-fg">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <IconCheck width={15} height={15} />
                </span>
                {line}
              </li>
            ))}
          </ul>

          {siteConfig.booking.url ? (
            <div className="mt-8 rounded-xl2 border border-line bg-paper p-5">
              <p className="text-sm text-muted">Prefer to talk it through?</p>
              <Button href={siteConfig.booking.url} variant="ghost" size="md" className="mt-3">
                {siteConfig.booking.label}
                <IconArrowUpRight width={16} height={16} />
              </Button>
            </div>
          ) : null}

          <div className="mt-8 rounded-xl2 border border-line bg-paper p-5">
            <p className="text-sm text-muted">Prefer email?</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1 block break-words font-display text-lg text-ink hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="min-w-0">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
