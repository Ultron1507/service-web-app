import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { contact } from '../../data/contact'
import { getNotifications, markNotificationRead } from '../../services/api'

const logo = '/take-wind-logo.png'

export default function Navbar() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const refreshNotifications = () => getNotifications().then((response) => setNotifications(response.data.notifications || [])).catch(() => {})
  useEffect(() => {
    refreshNotifications()
    const interval = window.setInterval(refreshNotifications, 30000)
    return () => window.clearInterval(interval)
  }, [])
  const latestUnread = useMemo(() => notifications.find((item) => !item.isRead), [notifications])
  const openNotifications = () => setOpen((value) => latestUnread ? !value : false)
  const openNotification = async (notification) => {
    setOpen(false)
    setNotifications((items) => items.map((item) => item._id === notification._id ? { ...item, isRead: true } : item))
    markNotificationRead(notification._id).catch(refreshNotifications)
    const bookingId = typeof notification.booking === 'object' ? notification.booking?._id : notification.booking
    if (bookingId) navigate(`/bookings/${bookingId}`)
    else navigate('/my-bookings')
  }
  const unread = notifications.filter((item) => !item.isRead).length
  return <header className="topbar"><Link className="topbar-brand" to="/home" aria-label="Take Wind home"><img className="nav-logo" src={logo} alt="" /><span className="brand-copy"><strong>Take <em>Wind</em></strong><small className="brand-location"><i className="ri-map-pin-2-fill" aria-hidden="true" />Jorhat, Assam</small></span></Link><nav className="support-actions" aria-label="Contact us"><div className="customer-notifications"><button type="button" className="support notification-bell" onClick={openNotifications} aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`} aria-expanded={open} aria-controls="notification-panel"><i className="ri-notification-3-line" aria-hidden="true" />{unread > 0 && <b>{unread > 9 ? '9+' : unread}</b>}</button>{open && latestUnread && <section id="notification-panel" className="notification-popover" aria-label="Latest unread notification"><header><div><strong>New notification</strong><small>{unread > 1 ? `${unread} unread notifications` : 'Just now'}</small></div></header><button type="button" className="notification-item is-unread" onClick={() => openNotification(latestUnread)}><i className={latestUnread.type === 'booking_confirmed' ? 'ri-checkbox-circle-fill' : 'ri-notification-3-line'} aria-hidden="true" /><span><b>{latestUnread.title}</b><small>{latestUnread.message}</small></span><i className="ri-arrow-right-s-line notification-arrow" aria-hidden="true" /></button></section>}</div><a className="support phone" href={`tel:${contact.phone}`} aria-label="Call support"><i className="ri-phone-line" aria-hidden="true" /></a><a className="support whatsapp" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><i className="ri-whatsapp-line" aria-hidden="true" /></a></nav></header>
}
