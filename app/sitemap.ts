import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { cities } from "@/config/cities";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/ministries`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/business`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/business/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...cities.map((c) => ({
      url: `${base}/business/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
