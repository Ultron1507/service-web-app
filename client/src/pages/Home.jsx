import { useNavigate } from 'react-router-dom'
import ServiceGrid from '../components/booking/ServiceGrid'
import ServiceIcon from '../components/common/ServiceIcon'
import RecentWork from '../components/home/RecentWork'
import Reviews from '../components/home/Reviews'
import ContactSection from '../components/home/ContactSection'
import { serviceCategoryList } from '../data/services'

const popularServices = serviceCategoryList
  .filter(({ id }) => id !== 'renting')
  .map(({ id: categoryId, name: categoryName, services }) => ({ ...services[0], categoryId, categoryName }))

export default function Home() {
  const navigate = useNavigate()
  return <section className="home"><section className="home-hero" aria-labelledby="home-title"><p className="eyebrow"><i className="ri-shield-check-line" aria-hidden="true" />Trusted technicians</p><h1 id="home-title">Book a technician in a few taps.</h1><p>Choose a service, pick a time, and we’ll arrange a home visit.</p><div className="hero-points"><span>Upfront price</span><span>Pay later</span><span>Local help</span></div></section><div className="promo"><span><i className="ri-coupon-3-line" aria-hidden="true" /></span><div><b>20% off your first AC service</b><small>Use code TAKEWIND20 when you book</small></div></div><section className="quick-services" aria-labelledby="quick-services-heading"><div className="section-heading"><div><h2 id="quick-services-heading">What needs help?</h2><p>Choose your appliance to see available services.</p></div><button type="button" onClick={() => navigate('/services/ac')}>View services</button></div><div className="service-scroller">{serviceCategoryList.map((category) => <ServiceIcon key={category.id} icon={category.icon} label={category.name} active={category.id === 'ac'} onClick={() => navigate(`/services/${category.id}`)} />)}</div></section><section className="content-section" aria-labelledby="book-service-heading"><div className="section-heading"><div><h2 id="book-service-heading">Popular services</h2><p>Pick one to choose a convenient visit time.</p></div><span>Fast, trusted repairs</span></div><ServiceGrid services={popularServices} onBook={(service) => navigate(`/booking-confirm/${service.id}`, { state: { service } })} /></section><RecentWork /><Reviews /><ContactSection /><footer className="site-footer"><b>Take <em>Wind</em></b><span>Home service, made simple</span></footer></section>
}
