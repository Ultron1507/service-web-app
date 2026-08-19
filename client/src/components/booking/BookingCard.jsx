export default function BookingCard({ categoryName, serviceName, icon, description, variant, onBook }) {
  const isRental = variant === 'rental'
  return <article className={`booking-card${isRental ? ' booking-card-rental' : ''}`}><div className="booking-icon"><i className={icon} aria-hidden="true" /></div>{categoryName && <small className="service-category">{categoryName}</small>}<h3>{serviceName}</h3>{description && <small className="service-description">{description}</small>}<button type="button" onClick={onBook} aria-label={`Book ${serviceName}`}>Book now</button></article>
}
