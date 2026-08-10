import { useNavigate, useParams } from 'react-router-dom'
import BookingCard from '../components/booking/BookingCard'
import { serviceCategories } from '../data/services'

export default function ServiceCategory() {
  const { category } = useParams()
  const navigate = useNavigate()
  const serviceCategory = serviceCategories[category] || serviceCategories.ac
  return <section className="category-page"><header className="category-heading"><button type="button" onClick={() => navigate(-1)} aria-label="Go back"><i className="ri-arrow-left-line" /></button><span className="booking-icon"><i className={serviceCategory.icon} /></span><div><h1>{serviceCategory.name}</h1><p>Step 1: choose the help you need</p></div></header><div className="category-grid">{serviceCategory.services.map((service) => <BookingCard key={service.id} {...service} categoryName={serviceCategory.name} onBook={() => navigate(`/booking-confirm/${service.id}`, { state: { service: { ...service, categoryName: serviceCategory.name } } })} />)}</div></section>
}
