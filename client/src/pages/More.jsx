import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContextValue'
import { contact } from '../data/contact'

export default function More() {
  const { logout } = useAuth(); const navigate = useNavigate()
  const signOut = () => { logout(); navigate('/', { replace: true }) }
  return <section className="more-page"><header className="page-heading"><h1>More</h1></header><p className="more-intro">Need a hand? Reach our friendly team or manage your account below.</p><div className="more-list"><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"><span><i className="ri-customer-service-2-line" aria-hidden="true" /></span>Help and support <i className="ri-arrow-right-s-line" aria-hidden="true" /></a><a href={`tel:${contact.phone}`}><span><i className="ri-phone-line" aria-hidden="true" /></span>Call us <i className="ri-arrow-right-s-line" aria-hidden="true" /></a><a href={contact.storeUrl} target="_blank" rel="noreferrer"><span><i className="ri-star-line" aria-hidden="true" /></span>Rate your experience <i className="ri-arrow-right-s-line" aria-hidden="true" /></a><button type="button" className="logout-row" onClick={signOut}><span><i className="ri-logout-box-r-line" aria-hidden="true" /></span>Log out <i className="ri-arrow-right-s-line" aria-hidden="true" /></button></div></section>
}
