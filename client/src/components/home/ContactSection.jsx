import { contact } from '../../data/contact'

export default function ContactSection() {
  return <section className="contact-section" aria-labelledby="contact-heading">
    <header className="contact-heading">
      <span className="contact-heading-mark"><i className="ri-customer-service-2-line" aria-hidden="true" /></span>
      <div><p>RATE &amp; REACH US</p><h2 id="contact-heading">Need help?</h2><small>We’re here to help with your service.</small></div>
    </header>

    <a className="rate-card" href={contact.storeUrl} target="_blank" rel="noreferrer">
      <span className="rate-icon"><i className="ri-star-smile-line" aria-hidden="true" /></span>
      <span className="rate-copy"><span className="rating-stars" aria-label="Five stars">★★★★★</span><b>Enjoyed our service?</b><small>Rate your experience and help us improve.</small></span>
      <span className="rate-action">Rate your service <i className="ri-arrow-right-line" aria-hidden="true" /></span>
    </a>

    <article className="location-card">
      <div className="location-copy"><span className="location-pin"><i className="ri-map-pin-2-fill" aria-hidden="true" /></span><div><small>OUR SERVICE AREA</small><b>Our Service Area</b><span>{contact.address}</span></div></div>
      <div className="location-map"><iframe title="Take Wind location in Jorhat, Assam" src="https://www.google.com/maps?q=Jorhat%2CAssam&output=embed" loading="lazy" /></div>
      <a className="map-action" href={contact.mapUrl} target="_blank" rel="noreferrer">View on Map <i className="ri-external-link-line" aria-hidden="true" /></a>
    </article>

    <div className="contact-links" aria-label="Contact options">
      <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"><i className="ri-whatsapp-line" aria-hidden="true" /><span><b>WhatsApp</b><small>Chat with us</small></span><i className="ri-arrow-right-s-line contact-arrow" aria-hidden="true" /></a>
      <a href={`tel:${contact.phone}`}><i className="ri-phone-line" aria-hidden="true" /><span><b>Call</b><small>Speak with us</small></span><i className="ri-arrow-right-s-line contact-arrow" aria-hidden="true" /></a>
      <a href={`mailto:${contact.email}`}><i className="ri-mail-line" aria-hidden="true" /><span><b>Email</b><small>Send us an email</small></span><i className="ri-arrow-right-s-line contact-arrow" aria-hidden="true" /></a>
    </div>
  </section>
}
