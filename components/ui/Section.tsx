import { cn } from "@/lib/cn";
import { Container } from "./Container";
import type { ReactNode } from "react";

type Tone = "paper" | "sand" | "ink";

const toneClasses: Record<Tone, string> = {
  paper: "bg-paper text-fg",
  sand: "bg-sand text-fg",
  ink: "bg-ink text-on-ink",
};

export function Section({
  id,
  tone = "paper",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-28", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Small eyebrow/kicker label used above section headings. */
export function Kicker({ children, onInk = false }: { children: ReactNode; onInk?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]",
        onInk ? "text-accent-soft" : "text-accent",
      )}
    >
      <span className={cn("h-px w-6", onInk ? "bg-accent-soft" : "bg-accent")} aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  onInk = false,
  className,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker ? <Kicker onInk={onInk}>{kicker}</Kicker> : null}
      <h2
        className={cn(
          "mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05]",
          onInk && "text-on-ink",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={cn("mt-4 text-lg", onInk ? "text-on-ink-muted" : "text-muted")}>{intro}</p>
      ) : null}
    </div>
  );
}
