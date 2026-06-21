import Image from "next/image";
import { cn } from "@/lib/cn";
import { blurData } from "@/config/blur";

/**
 * A real screenshot rendered with next/image, framed to match PlaceholderImage.
 * Images live in /public (served same-origin, so the CSP stays tight).
 */
export function Screenshot({
  src,
  alt,
  ratio = "16/10",
  tone = "light",
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  ratio?: "16/10" | "16/9" | "4/3" | "1/1";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const dark = tone === "dark";
  const blur = blurData[src];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl2 border",
        dark ? "border-on-ink/15 bg-ink-soft" : "border-line bg-sand",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 1024px) 100vw, 720px"}
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur}
        className="object-cover object-top"
      />
    </div>
  );
}
