import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "forest" | "outline" | "onInk";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "px-[18px] py-[10px] text-[14.5px]",
  lg: "px-[26px] py-[15px] text-[15.5px]",
};

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-ink-bright hover:bg-accent-hover shadow-cta",
  forest: "bg-ink text-on-ink-bright hover:bg-ink-soft",
  outline:
    "bg-transparent text-ink border-[1.5px] border-ink hover:bg-ink hover:text-on-ink-bright",
  onInk:
    "bg-transparent text-on-ink border border-on-ink/30 hover:border-on-ink hover:bg-on-ink/10",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

/** Renders an <a> (via next/link) when `href` is set, otherwise a <button>. */
export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  children,
  ...rest
}: CommonProps &
  ({ href: string } | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }))) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (href) {
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
