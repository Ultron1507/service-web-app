import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceGrid from '../components/booking/ServiceGrid'
import ServiceIcon from '../components/common/ServiceIcon'
import RecentWork from '../components/home/RecentWork'
import Reviews from '../components/home/Reviews'
import ContactSection from '../components/home/ContactSection'
import { serviceCategoryList } from '../data/services'
import { getServices } from '../services/api'

const popularServices = serviceCategoryList.filter(({ id }) => id !== 'renting').map(({ id: categoryId, name: categoryName, services }) => ({ ...services[0], categoryId, categoryName }))

export default function Home() {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  useEffect(() => { getServices().then((response) => setServices(response.data.services)).catch(() => setServices([])) }, [])
  const available = popularServices.map((service) => ({ ...service, ...(services.find((item) => item.slug === service.id) || {}), serviceName: services.find((item) => item.slug === service.id)?.name || service.serviceName }))
  return <section className="home"><section className="home-hero" aria-labelledby="home-title"><div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" /><div className="hero-content"><p className="eyebrow"><i className="ri-shield-check-line" aria-hidden="true" />Trusted technicians</p><h1 id="home-title">Book home service without the hassle.</h1><p>Choose a service and a convenient day—we’ll take care of the rest.</p><div className="hero-points"><span><i className="ri-map-pin-line" aria-hidden="true" />Local help</span><span><i className="ri-verified-badge-line" aria-hidden="true" />Vetted pros</span></div></div><i className="hero-tool ri-tools-line" aria-hidden="true" /></section><div className="promo"><span><i className="ri-calendar-check-line" aria-hidden="true" /></span><div><b>Easy service booking</b><small>Choose a time that works for you</small></div></div><section className="quick-services" aria-labelledby="quick-services-heading"><div className="section-heading"><div><h2 id="quick-services-heading">What needs help?</h2><p>Choose your appliance to see available services.</p></div><button type="button" onClick={() => navigate('/services/ac')}>View services</button></div><div className="service-scroller">{serviceCategoryList.map((category) => <ServiceIcon key={category.id} icon={category.icon} label={category.name} active={category.id === 'ac'} onClick={() => navigate(`/services/${category.id}`)} />)}</div></section><section className="content-section" aria-labelledby="book-service-heading"><div className="section-heading"><div><h2 id="book-service-heading">Popular services</h2><p>Pick one to choose a convenient visit time.</p></div><span>Fast, trusted repairs</span></div><ServiceGrid services={available} onBook={(service) => navigate(`/booking-confirm/${service.slug || service.id}`, { state: { service } })} /></section><RecentWork /><Reviews /><ContactSection /><footer className="site-footer"><b>Take <em>Wind</em></b><span>Home service, made simple</span><p>Created by <strong>Puspita</strong></p></footer></section>
}
