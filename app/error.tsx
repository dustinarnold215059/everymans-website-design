"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to the console / monitoring.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
        Something broke
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium sm:text-5xl">Well, that wasn&apos;t supposed to happen.</h1>
      <p className="mt-4 max-w-md text-muted">
        A hiccup on my end. Try again, and if it keeps happening, send me a quick note.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()} size="lg">
          Try again
        </Button>
        <Button href="/#contact" size="lg" variant="outline">
          Contact me
        </Button>
      </div>
    </Container>
  );
}
