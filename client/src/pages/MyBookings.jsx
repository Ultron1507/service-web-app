import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMyBookings } from '../services/api'

const formatDate = (value) => {
  if (!value) return 'To be confirmed'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'To be confirmed' : new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(date)
}

const statusLabel = (status) => ({ pending: 'Pending', confirmed: 'Confirmed', in_progress: 'In progress', completed: 'Completed', cancelled: 'Cancelled' }[status] || 'Pending')

export default function MyBookings() {
  const navigate = useNavigate(); const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { getMyBookings().then((response) => setBookings(response.data?.bookings || [])).catch((requestError) => { if (requestError.response?.status === 401) { navigate('/', { replace: true }); return }; setError('We could not load your bookings right now.') }).finally(() => setLoading(false)) }, [navigate])
  return <section className="booking-list-page"><header className="page-heading"><h1>My Books</h1></header><div className="booking-list-content">{loading && <p className="loading-message">Loading your bookings...</p>}{error && <p className="form-error" role="alert">{error}</p>}{!loading && !error && !bookings.length && <div className="empty-state"><i className="ri-calendar-line" aria-hidden="true" /><h2>No bookings yet</h2><p>When you need a hand, book a service and it will appear here.</p><Link className="primary-button" to="/home">Book a Service</Link></div>}{bookings.map((booking) => <Link className="booking-list-card" key={booking._id} to={`/bookings/${booking._id}`} aria-label={`View ${booking.service?.name || 'service request'} booking`}><div className="booking-card-top"><div><b>{booking.service?.name || 'Service request'}</b><small>Ref: {booking._id}</small></div><span className={`status-badge status-${booking.status}`}>{statusLabel(booking.status)}</span></div><div className="booking-card-meta"><span><i className="ri-calendar-event-line" aria-hidden="true" />{formatDate(booking.date)}{booking.preferredTime && ` · ${booking.preferredTime}`}</span>{booking.address && <span><i className="ri-map-pin-line" aria-hidden="true" />{booking.address}</span>}</div><i className="booking-card-arrow ri-arrow-right-s-line" aria-hidden="true" /></Link>)}</div></section>
}
