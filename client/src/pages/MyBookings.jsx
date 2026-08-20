import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMyBookings } from '../services/api'

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value)) : 'Pending'
const statusLabel = (status) => ({ pending: 'Booking Request Submitted', confirmed: 'Booking Confirmed', in_progress: 'In progress', completed: 'Completed', cancelled: 'Cancelled' }[status] || 'Pending')

export default function MyBookings() {
  const navigate = useNavigate(); const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { getMyBookings().then((response) => setBookings(response.data.bookings || [])).catch((requestError) => { if (requestError.response?.status === 401) { navigate('/', { replace: true }); return }; setError('We could not load your bookings right now.') }).finally(() => setLoading(false)) }, [navigate])
  return <section className="booking-list-page"><header className="page-heading"><h1>My bookings</h1></header><div className="booking-list-content">{loading && <p className="loading-message">Loading bookings...</p>}{error && <p className="form-error" role="alert">{error}</p>}{!loading && !error && !bookings.length && <div className="empty-state"><i className="ri-calendar-line" aria-hidden="true" /><h2>No bookings yet</h2><p>Choose a service when you are ready to request help.</p><Link className="primary-button" to="/home">Find a service</Link></div>}{bookings.map((booking) => <Link className="booking-list-card" key={booking._id} to={`/bookings/${booking._id}`}><div><b>{booking.service?.name || 'Service request'}</b><small>{booking._id}</small></div><span className={`status-badge status-${booking.status}`}>{statusLabel(booking.status)}</span><small>Booked {formatDate(booking.createdAt)} · Expected by {formatDate(booking.serviceDeadline)}</small><i className="ri-arrow-right-s-line" aria-hidden="true" /></Link>)}</div></section>
}
