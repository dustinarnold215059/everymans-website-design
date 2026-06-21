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
      className={cn("scroll-mt-[88px] py-16 sm:py-[74px]", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Uppercase terracotta eyebrow. On dark surfaces it uses the lighter terracotta. */
export function Kicker({ children, onInk = false }: { children: ReactNode; onInk?: boolean }) {
  return (
    <span
      className={cn(
        "text-[12.5px] font-bold uppercase tracking-[0.14em]",
        onInk ? "text-accent-soft" : "text-accent",
      )}
    >
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
          "mt-3 font-display text-[clamp(30px,5vw,40px)] font-medium leading-[1.08] tracking-[-0.018em]",
          onInk ? "text-on-ink-bright" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p className={cn("mt-3.5 text-base leading-[1.55]", onInk ? "text-on-ink-muted" : "text-muted")}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
