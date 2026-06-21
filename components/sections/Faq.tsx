import { siteConfig } from "@/config/site.config";
import { Kicker } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";

export function Faq() {
  const { faq } = siteConfig;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-[88px] border-y border-line bg-sand">
      <JsonLd data={faqJsonLd} />
      <div className="mx-auto max-w-faq px-6 py-[72px] sm:px-7">
        <Reveal>
          <div className="mx-auto max-w-[30em] text-center">
            <Kicker>{faq.heading}</Kicker>
            <h2 className="mt-3 font-display text-[clamp(28px,4.5vw,38px)] font-medium leading-[1.08] tracking-[-0.018em]">
              Good questions get straight answers.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-9 flex flex-col gap-3">
            {faq.items.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="group overflow-hidden rounded-[14px] border border-line bg-surface"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[17px] font-bold text-fg marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="flex-none text-[22px] leading-none text-accent transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-[22px] text-[15px] leading-[1.62] text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
