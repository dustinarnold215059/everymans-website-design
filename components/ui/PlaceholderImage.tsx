import { cn } from "@/lib/cn";

/**
 * A clearly-labeled placeholder you can swap for a real screenshot/photo.
 *
 * To replace: drop your image in /public and swap this component for:
 *   <Image src="/work/aam-home.png" alt="…" width={1280} height={800} className="…" />
 * (next/image is already a dependency.)
 */
export function PlaceholderImage({
  label,
  caption,
  ratio = "16/10",
  tone = "light",
  className,
}: {
  label: string;
  caption?: string;
  ratio?: "16/10" | "16/9" | "4/3" | "1/1";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl2 border",
        dark ? "border-on-ink/15 bg-ink-soft" : "border-line bg-sand",
        className,
      )}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`${label} (placeholder image — replace with a real screenshot)`}
    >
      {/* subtle hatch so it reads as an intentional placeholder, not a broken image */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: dark
            ? "repeating-linear-gradient(135deg, rgba(244,239,230,0.06) 0 1px, transparent 1px 12px)"
            : "repeating-linear-gradient(135deg, rgba(19,48,42,0.05) 0 1px, transparent 1px 12px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
            dark ? "bg-on-ink/10 text-on-ink-muted" : "bg-paper/70 text-muted",
          )}
        >
          Placeholder · swap me
        </span>
        <span className={cn("font-display text-lg", dark ? "text-on-ink" : "text-ink")}>
          {label}
        </span>
        {caption ? (
          <span className={cn("max-w-xs text-sm", dark ? "text-on-ink-muted" : "text-muted")}>
            {caption}
          </span>
        ) : null}
      </div>
    </div>
  );
}
