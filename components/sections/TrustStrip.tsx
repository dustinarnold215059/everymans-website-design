import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  return (
    <div className="border-y border-line bg-sand/60">
      <Container className="py-6">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-[0.12em] text-muted">
            {siteConfig.trust.line}
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
