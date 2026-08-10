import reviews from '../../data/reviews'

export default function Reviews() {
  return <section className="content-section reviews-section"><div className="section-heading"><div><h2>What customers say</h2><p>Real feedback from local households.</p></div><span>Trusted locally</span></div><div className="reviews">{reviews.map((review) => <article className="review-card" key={review.name}><div><b>{review.name}</b><span className="stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <i className="ri-star-fill" key={index} />)}</span></div><p>“{review.quote}”</p></article>)}</div></section>
}
