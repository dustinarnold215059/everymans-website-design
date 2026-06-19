import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/icons";

export function CtaBand() {
  const { ctaBand } = siteConfig;

  return (
    <section className="bg-paper py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink px-6 py-12 text-center shadow-lift sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 80% at 80% 0%, rgba(201,99,43,0.20), transparent 60%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl text-on-ink sm:text-4xl">{ctaBand.heading}</h2>
              <p className="mx-auto mt-4 max-w-xl text-on-ink-muted">{ctaBand.body}</p>
              <div className="mt-8 flex justify-center">
                <Button href={ctaBand.cta.href} size="lg" variant="primary">
                  {ctaBand.cta.label}
                  <IconArrowRight width={18} height={18} />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
