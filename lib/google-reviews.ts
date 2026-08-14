import { siteConfig } from "@/config/site.config";

/**
 * Google reviews for the proof section.
 *
 * MRA does this with Prisma and a nightly import; this site has no database, so
 * it fetches at render time and leans on Next's fetch cache instead. One call a
 * day, which sits inside the free tier.
 *
 * Returns an empty array whenever it is not configured, the place has no
 * reviews yet, or Google errors — the caller falls back to the written
 * testimonial. A proof section that renders empty is worse than one that
 * renders the fallback.
 *
 * Uses Places API (New); Google no longer grants new projects access to the
 * legacy Places API. Note Google's terms cap caching of Places content at 30
 * days, which the one-day revalidate is comfortably inside.
 */

const PLACES_URL = "https://places.googleapis.com/v1/places";
const REVALIDATE_SECONDS = 60 * 60 * 24; // 1 day

export type GoogleReview = {
  id: string;
  rating: number;
  text: string;
  author: string;
  /** Initials for the avatar circle. */
  initials: string;
  publishedAt: string;
};

type PlacesReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
  publishTime?: string;
};

type PlacesResponse = {
  reviews?: PlacesReview[];
  rating?: number;
  userRatingCount?: number;
};

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "★";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export type ReviewsResult = {
  reviews: GoogleReview[];
  rating: number | null;
  total: number | null;
};

const EMPTY: ReviewsResult = { reviews: [], rating: null, total: null };

export async function getGoogleReviews(minRating = 4): Promise<ReviewsResult> {
  const placeId = siteConfig.googlePlaceId?.trim();
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !key) return EMPTY;

  let data: PlacesResponse;
  try {
    const res = await fetch(`${PLACES_URL}/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        // Only what is rendered — every extra field costs money.
        "X-Goog-FieldMask": "reviews,rating,userRatingCount",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return EMPTY;
    data = (await res.json()) as PlacesResponse;
  } catch {
    return EMPTY;
  }

  const reviews = (data.reviews ?? [])
    .map((r): GoogleReview | null => {
      const text = (r.text?.text ?? r.originalText?.text ?? "").trim();
      const author = (r.authorAttribution?.displayName ?? "").trim();
      const rating = r.rating ?? 0;
      if (!text || !author || rating < minRating) return null;
      return {
        id: r.name ?? `${author}-${r.publishTime ?? ""}`,
        rating,
        text,
        author,
        initials: initialsOf(author),
        publishedAt: r.publishTime ?? "",
      };
    })
    .filter((r): r is GoogleReview => r !== null);

  return {
    reviews,
    rating: typeof data.rating === "number" ? data.rating : null,
    total: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
  };
}
