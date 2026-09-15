export type Review = {
  /** Google review id, used as the React key and to avoid duplicates. */
  id: string;
  /** Reviewer name exactly as it appears on Google. */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date the review was written, e.g. "2026-08-14". */
  date: string;
  text: string;
};

/**
 * Google Business Profile rating summary for Ford Paving & Sealing.
 * Populated from the Google Business Profile once it is connected to the
 * Windsor google_my_business connector. The home page hides the reviews
 * section and the schema omits aggregateRating while reviewCount is 0.
 */
export const googleReviewSummary = {
  averageRating: 0,
  reviewCount: 0,
  /** Public link to the Google reviews, e.g. https://g.page/r/<id>/review */
  url: "",
};

/** Featured five-star reviews, newest first. Keep to three or four. */
export const googleReviews: Review[] = [];

export const hasReviews = googleReviewSummary.reviewCount > 0 && googleReviews.length > 0;
