import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-muted">
        The link may be old or the page may have moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/" size="lg">
          Back home
        </Button>
        <Button href="/#contact" size="lg" variant="outline">
          Contact me
        </Button>
      </div>
    </Container>
  );
}
