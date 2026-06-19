import type { SVGProps } from "react";

/** Small, consistent line-icon set. Inherit color via `currentColor`. */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconBrowser(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export function IconChurch(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M12 2v4M10 4h4" />
      <path d="M12 6l5 4v10H7V10l5-4z" />
      <path d="M10 20v-4a2 2 0 014 0v4" />
    </svg>
  );
}

export function IconHeart(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M12 20s-7-4.3-9-9a4.5 4.5 0 018-3 4.5 4.5 0 018 3c-2 4.7-9 9-9 9z" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0112 0M16 5.5a3 3 0 010 5.8M21 20a6 6 0 00-4-5.6" />
    </svg>
  );
}

export function IconFlag(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M5 21V4M5 4h11l-1.5 3L16 10H5" />
    </svg>
  );
}

export function IconStore(props: IconProps) {
  return (
    <svg {...base} {...props} aria-hidden>
      <path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16" />
      <path d="M9 20v-5h6v5" />
    </svg>
  );
}
