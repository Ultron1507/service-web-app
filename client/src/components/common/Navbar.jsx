import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { contact } from '../../data/contact'
import { getNotifications, markAllNotificationsRead } from '../../services/api'

const logo = '/take-wind-logo.png'

export default function Navbar() {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(() => { getNotifications().then((response) => setNotifications(response.data.notifications || [])).catch(() => {}) }, [])
  const toggleNotifications = async () => { const nextOpen = !open; setOpen(nextOpen); if (nextOpen && notifications.some((item) => !item.isRead)) { await markAllNotificationsRead().catch(() => {}); setNotifications((items) => items.map((item) => ({ ...item, isRead: true }))) } }
  const unread = notifications.filter((item) => !item.isRead).length
  return <header className="topbar"><Link className="topbar-brand" to="/home" aria-label="Take Wind home"><img className="nav-logo" src={logo} alt="" /><span className="brand-copy"><strong>Take <em>Wind</em></strong><small className="brand-location"><i className="ri-map-pin-2-fill" aria-hidden="true" />Jorhat, Assam</small></span></Link><nav className="support-actions" aria-label="Contact us"><div className="customer-notifications"><button type="button" className="support notification-bell" onClick={toggleNotifications} aria-label="Notifications" aria-expanded={open}><i className="ri-notification-3-line" aria-hidden="true" />{unread > 0 && <b>{unread > 9 ? '9+' : unread}</b>}</button>{open && <section className="notification-popover" aria-label="Notifications"><strong>Notifications</strong>{notifications.length ? notifications.slice(0, 6).map((item) => <article key={item._id}><b>{item.title}</b><small>{item.message}</small></article>) : <small>No notifications yet.</small>}</section>}</div><a className="support phone" href={`tel:${contact.phone}`} aria-label="Call support"><i className="ri-phone-line" aria-hidden="true" /></a><a className="support whatsapp" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><i className="ri-whatsapp-line" aria-hidden="true" /></a></nav></header>
}
