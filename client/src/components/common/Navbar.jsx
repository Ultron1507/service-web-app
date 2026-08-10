import { Link } from 'react-router-dom'
import { contact } from '../../data/contact'

const logo = '/take-wind-logo.png'

export default function Navbar() {
  return <header className="topbar"><Link className="topbar-brand" to="/home" aria-label="Take Wind home"><img className="nav-logo" src={logo} alt="" /><span className="brand-copy"><strong>Take <em>Wind</em></strong><small className="brand-location"><i className="ri-map-pin-2-fill" aria-hidden="true" />Jorhat, Assam</small></span></Link><nav className="support-actions" aria-label="Contact us"><a className="support phone" href={`tel:${contact.phone}`} aria-label="Call support"><i className="ri-phone-line" aria-hidden="true" /></a><a className="support whatsapp" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><i className="ri-whatsapp-line" aria-hidden="true" /></a></nav></header>
}
