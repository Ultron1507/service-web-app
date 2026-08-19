import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBookingById } from '../services/api'

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Pending'
const labels = { pending: 'Pending', confirmed: 'Confirmed', in_progress: 'In progress', completed: 'Completed', cancelled: 'Cancelled' }

export default function BookingDetails() {
  const { bookingId } = useParams(); const navigate = useNavigate(); const [booking, setBooking] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('')
  useEffect(() => { getBookingById(bookingId).then((response) => setBooking(response.data.booking)).catch((requestError) => setError(requestError.response?.data?.message || 'We could not load this booking right now.')).finally(() => setLoading(false)) }, [bookingId])
  if (loading) return <section className="booking-details-page"><p className="loading-message">Loading booking...</p></section>
  if (error || !booking) return <section className="booking-details-page"><p className="form-error" role="alert">{error || 'Booking not found.'}</p><Link className="primary-button" to="/my-bookings">My bookings</Link></section>
  return <section className="booking-details-page"><header className="page-heading"><button type="button" onClick={() => navigate(-1)} aria-label="Go back"><i className="ri-arrow-left-line" /></button><h1>Booking details</h1></header><div className="booking-detail-content"><div className="detail-status"><span className={`status-badge status-${booking.status}`}>{labels[booking.status] || booking.status}</span><small>Booking ID: {booking._id}</small></div><article className="detail-block"><h2>Service</h2><b>{booking.service?.name || 'Service request'}</b><p>{booking.service?.description}</p></article><article className="detail-block"><h2>Customer</h2><p>{booking.customer?.name}<br />{booking.customer?.phone}{booking.customer?.email && <><br />{booking.customer.email}</>}</p></article><article className="detail-block"><h2>Location</h2><p>{booking.address}</p></article><article className="detail-block"><h2>Visit time</h2><b>{formatDate(booking.date)} · {booking.preferredTime}</b></article><article className="detail-block"><h2>Expected by</h2><b>{formatDate(booking.serviceDeadline)}</b></article><Link className="secondary-link" to="/my-bookings">Back to my bookings</Link></div></section>
}
