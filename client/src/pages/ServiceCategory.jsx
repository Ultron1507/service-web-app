import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookingCard from '../components/booking/BookingCard'
import { serviceCategories } from '../data/services'
import { getServices } from '../services/api'

export default function ServiceCategory() {
  const { category } = useParams()
  const navigate = useNavigate()
  const serviceCategory = serviceCategories[category] || serviceCategories.ac
  const [services, setServices] = useState([])
  useEffect(() => { getServices().then((response) => setServices(response.data.services)).catch(() => setServices([])) }, [])
  const available = serviceCategory.services.map((service) => ({ ...service, ...(services.find((item) => item.slug === service.id) || {}), serviceName: services.find((item) => item.slug === service.id)?.name || service.serviceName }))
  return <section className="category-page"><header className="category-heading"><button type="button" onClick={() => navigate(-1)} aria-label="Go back"><i className="ri-arrow-left-line" /></button><span className="booking-icon"><i className={serviceCategory.icon} /></span><div><h1>{serviceCategory.name}</h1><p>Step 1: choose the help you need</p></div></header><div className="category-grid">{available.map((service) => <BookingCard key={service.id} {...service} categoryName={serviceCategory.name} onBook={() => navigate(`/booking-confirm/${service.slug || service.id}`, { state: { service: { ...service, categoryName: serviceCategory.name } } })} />)}</div></section>
}
