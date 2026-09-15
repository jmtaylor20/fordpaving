import { googleReviewSummary, googleReviews, hasReviews } from "./reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden="true">{"★".repeat(rating)}</span>
      <span aria-hidden="true" className="stars-empty">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Google reviews band for the home page. Renders nothing until reviews exist. */
export function ReviewsSection() {
  if (!hasReviews) return null;
  const { averageRating, reviewCount, url } = googleReviewSummary;

  return (
    <section className="section reviews-section" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow eyebrow--light">Customer reviews</span>
            <h2 id="reviews-heading">Rated by the people who drive on it.</h2>
          </div>
          <div className="review-summary">
            <strong>{averageRating.toFixed(1)}</strong>
            <div>
              <Stars rating={Math.round(averageRating)} />
              <p>
                {reviewCount} Google {reviewCount === 1 ? "review" : "reviews"}
              </p>
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-link text-link--light">
                  Read them on Google <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <div className={`review-grid${googleReviews.length === 1 ? " review-grid--single" : ""}`}>
          {googleReviews.map((review) => (
            <blockquote key={review.id} className="review-card">
              <Stars rating={review.rating} />
              <p>{review.text}</p>
              <footer>
                <strong>{review.author}</strong>
                <span>Google review, {formatDate(review.date)}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
