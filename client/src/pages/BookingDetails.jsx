import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBookingById } from '../services/api'

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Pending'
const labels = { pending: 'Pending', confirmed: 'Confirmed', in_progress: 'In progress', completed: 'Completed', cancelled: 'Cancelled' }
const statusCopy = { pending: { message: 'Waiting for confirmation' }, confirmed: { message: 'Your appointment has been confirmed.' } }

export default function BookingDetails() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { getBookingById(bookingId).then((response) => setBooking(response.data.booking)).catch((requestError) => setError(requestError.response?.data?.message || 'We could not load this booking right now.')).finally(() => setLoading(false)) }, [bookingId])
  if (loading) return <section className="booking-details-page"><p className="loading-message">Loading booking...</p></section>
  if (error || !booking) return <section className="booking-details-page"><p className="form-error" role="alert">{error || 'Booking not found.'}</p><Link className="primary-button" to="/my-bookings">My bookings</Link></section>
  const copy = statusCopy[booking.status]
  const statusIcon = booking.status === 'confirmed' || booking.status === 'completed' ? 'ri-checkbox-circle-fill' : booking.status === 'cancelled' ? 'ri-close-circle-fill' : 'ri-time-line'
  return <section className="booking-details-page"><header className="page-heading"><button type="button" onClick={() => navigate(-1)} aria-label="Go back"><i className="ri-arrow-left-line" /></button><h1>Booking details</h1></header><div className="booking-detail-content"><section className={`booking-status-hero status-${booking.status}`}><div><span className="detail-status-icon"><i className={statusIcon} aria-hidden="true" /></span><span><small>Service request</small><h2>{labels[booking.status] || booking.status}</h2></span></div><p>{booking.status === 'confirmed' ? `Your ${booking.service?.name || 'service'} appointment is confirmed.` : copy?.message || 'We’ll keep you updated about this booking.'}</p><small className="booking-id">Booking ID · {booking._id}</small></section><section className="detail-card service-detail"><span className="detail-card-icon"><i className="ri-tools-line" aria-hidden="true" /></span><div><small>Service</small><h2>{booking.service?.name || 'Service request'}</h2>{booking.service?.description && <p>{booking.service.description}</p>}</div></section><section className="detail-card"><h2>Appointment</h2><div className="detail-row"><i className="ri-calendar-event-line" aria-hidden="true" /><div><small>Visit date and time</small><b>{formatDate(booking.date)}{booking.preferredTime && ` · ${booking.preferredTime}`}</b></div></div>{booking.serviceDeadline && <div className="detail-row"><i className="ri-timer-line" aria-hidden="true" /><div><small>Expected by</small><b>{formatDate(booking.serviceDeadline)}</b></div></div>}</section><section className="detail-card"><h2>Visit details</h2><div className="detail-row"><i className="ri-map-pin-2-line" aria-hidden="true" /><div><small>Service location</small><b>{booking.address || 'Location will be confirmed'}</b></div></div><div className="detail-row"><i className="ri-user-3-line" aria-hidden="true" /><div><small>Contact person</small><b>{booking.customer?.name || 'Customer'}</b><span>{booking.customer?.phone}{booking.customer?.email && ` · ${booking.customer.email}`}</span></div></div></section><Link className="secondary-link" to="/my-bookings"><i className="ri-arrow-left-line" aria-hidden="true" />Back to my bookings</Link></div></section>
}
