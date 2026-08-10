import BookingCard from './BookingCard'
export default function ServiceGrid({ services, onBook }) {
  return <div className="service-grid">{services.map((service) => <BookingCard key={service.id} {...service} onBook={() => onBook(service)} />)}</div>
}
