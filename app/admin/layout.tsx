import type { Metadata } from "next";
import type { ReactNode } from "react";

// The admin must never be indexed, and robots.txt disallows it as well.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
