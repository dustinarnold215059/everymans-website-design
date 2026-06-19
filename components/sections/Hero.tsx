import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { IconArrowRight, IconBolt, IconShield, IconCheck } from "@/components/ui/icons";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative overflow-hidden">
      {/* warm, low-key background wash — no generic purple gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 85% 0%, rgba(201,99,43,0.10), transparent 60%)," +
            "radial-gradient(70% 60% at 0% 10%, rgba(19,48,42,0.06), transparent 55%)",
        }}
      />

      <Container className="pb-16 pt-16 sm:pt-20 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {hero.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-6 text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">
                {hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.subhead}</p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={hero.primary.href} size="lg" variant="primary">
                  {hero.primary.label}
                  <IconArrowRight width={18} height={18} />
                </Button>
                <Button href={hero.secondary.href} size="lg" variant="ghost">
                  {hero.secondary.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                <li className="inline-flex items-center gap-2">
                  <IconBolt width={18} height={18} className="text-accent" />
                  Fast, Lighthouse-friendly
                </li>
                <li className="inline-flex items-center gap-2">
                  <IconShield width={18} height={18} className="text-accent" />
                  Secure by default
                </li>
                <li className="inline-flex items-center gap-2">
                  <IconCheck width={18} height={18} className="text-accent" />
                  Built &amp; maintained by me
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={150} className="relative">
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-ink/5 blur-2xl" aria-hidden />
              <div className="rounded-xl2 border border-line bg-paper p-3 shadow-lift">
                {/* faux browser chrome */}
                <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="ml-3 h-5 flex-1 rounded-full bg-sand" />
                </div>
                <Screenshot
                  src={siteConfig.featured.image}
                  alt={`${siteConfig.featured.title} — homepage built by ${siteConfig.name}`}
                  ratio="16/10"
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>

              {/* floating proof chip */}
              <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-line bg-paper px-4 py-3 shadow-soft sm:block">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Live project</p>
                <p className="text-sm font-semibold text-ink">Abolish Abortion Michigan</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
