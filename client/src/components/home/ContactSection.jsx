import { contact } from '../../data/contact'

export default function ContactSection() {
  return <section className="contact-section" aria-labelledby="contact-heading">
    <div className="section-heading"><h2 id="contact-heading">Rate &amp; reach us</h2><span>We’re here to help</span></div>
    <a className="rate-card" href={contact.storeUrl} target="_blank" rel="noreferrer"><span><i className="ri-star-smile-line" aria-hidden="true" /></span><div><b>Enjoyed our service?</b><small>Rate Take Wind and share your experience</small></div><i className="ri-arrow-right-s-line" aria-hidden="true" /></a>
    <div className="location-card"><div className="location-copy"><span className="location-pin"><i className="ri-map-pin-2-fill" aria-hidden="true" /></span><div><b>Our location</b><small>{contact.address}</small></div></div><a href={contact.mapUrl} target="_blank" rel="noreferrer">Open map <i className="ri-external-link-line" aria-hidden="true" /></a><iframe title="Take Wind location in Jorhat, Assam" src="https://www.google.com/maps?q=Jorhat%2CAssam&output=embed" loading="lazy" /></div>
    <div className="contact-links"><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"><i className="ri-whatsapp-line" aria-hidden="true" /><span><b>WhatsApp</b><small>Chat with us</small></span></a><a href={`tel:${contact.phone}`}><i className="ri-phone-line" aria-hidden="true" /><span><b>Call us</b><small>{contact.phone}</small></span></a><a href={`mailto:${contact.email}`}><i className="ri-mail-line" aria-hidden="true" /><span><b>Email us</b><small>{contact.email}</small></span></a></div>
  </section>
}
