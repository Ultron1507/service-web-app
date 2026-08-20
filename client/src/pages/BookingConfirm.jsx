import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createBooking, getServiceBySlug } from '../services/api'

const today = () => new Date().toISOString().slice(0, 10)
const formatDate = (value) => {
  if (!value) return 'To be confirmed'
  const date = new Date(typeof value === 'string' && !value.includes('T') ? `${value}T00:00:00` : value)
  return Number.isNaN(date.getTime()) ? 'To be confirmed' : new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(date)
}

function BookingProgress({ step }) {
  const steps = ['Choose', 'Details', 'Confirm', 'Done']
  return <ol className="booking-progress" aria-label={`Booking progress: step ${step} of 4`}>{steps.map((label, index) => <li key={label} className={index + 1 < step ? 'complete' : index + 1 === step ? 'current' : ''} aria-current={index + 1 === step ? 'step' : undefined}><span>{index + 1 < step ? <i className="ri-check-line" aria-hidden="true" /> : index + 1}</span><small>{label}</small></li>)}</ol>
}

const submissionCopy = {
  pending: {
    title: 'Booking Request Submitted',
    message: 'Your appointment request has been received and is waiting for confirmation.',
    note: 'We’ll notify you as soon as a Take Wind technician confirms your visit.',
  },
  confirmed: {
    title: 'Booking Confirmed',
    message: 'You’re all set. A Take Wind technician will call shortly to confirm your visit.',
    note: 'Keep your phone nearby—we’ll contact you if we need any extra details.',
  },
}

export default function BookingConfirm() {
  const { serviceId: slug } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loadingService, setLoadingService] = useState(true)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('idle')
  const [submittedBooking, setSubmittedBooking] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getServiceBySlug(slug)
      .then((response) => setService(response.data))
      .catch((requestError) => setError(requestError.response?.data?.message || 'This service is no longer available.'))
      .finally(() => setLoadingService(false))
  }, [slug])

  const confirm = async () => {
    if (!service || !name.trim() || !date || !address.trim()) {
      setError('Please enter your name, select a date, and enter your service location.')
      return
    }
    setStatus('loading')
    setError('')
    try {
      const response = await createBooking({ serviceId: service._id, name: name.trim(), date, preferredTime: 'To be confirmed', address: address.trim() })
      setSubmittedBooking(response.data.booking)
      setStatus('success')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'We could not confirm the booking right now. Please try again.')
      setStatus('idle')
    }
  }

  if (loadingService) return <section className="booking-confirm"><p className="loading-message">Loading service...</p></section>
  if (!service) return <section className="booking-confirm"><p className="form-error" role="alert">{error || 'Service not found.'}</p><Link className="primary-button" to="/home">Back to services</Link></section>
  if (submittedBooking) {
    const copy = submissionCopy[submittedBooking.status] || submissionCopy.pending
    return <section className="confirmation"><BookingProgress step={4} /><div className="confirmed-icon"><i className="ri-check-line" aria-hidden="true" /></div><h1>{copy.title}</h1><p>{copy.message}</p><div className="confirm-summary"><div><span>Service</span><b>{submittedBooking.service?.name || service.name}</b></div><div><span>Visit date</span><b>{formatDate(submittedBooking.date || date)}</b></div></div><p className="confirm-note">{copy.note}</p><Link className="primary-button confirm-link" to="/my-bookings">View my bookings</Link></section>
  }

  return <section className="booking-confirm"><header className="page-heading"><button type="button" onClick={() => navigate(-1)} aria-label="Go back"><i className="ri-arrow-left-line" aria-hidden="true" /></button><h1>Confirm booking</h1></header><BookingProgress step={status === 'loading' ? 3 : 2} /><p className="booking-intro">Choose a date and tell us where to visit. We’ll confirm the details before sending a technician.</p><article className="selected-service"><span><i className="ri-tools-line" aria-hidden="true" /></span><div><b>{service.name}</b><small>{service.description}</small></div></article><div className="booking-fields"><label htmlFor="booking-name"><span><i className="ri-user-line" aria-hidden="true" />Name</span><input id="booking-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Enter your name" /></label><label htmlFor="booking-date"><span><i className="ri-calendar-schedule-line" aria-hidden="true" />Date</span><input id="booking-date" type="date" value={date} min={today()} onChange={(event) => setDate(event.target.value)} /></label><label htmlFor="booking-address"><span><i className="ri-map-pin-line" aria-hidden="true" />Location</span><input id="booking-address" value={address} onChange={(event) => setAddress(event.target.value)} autoComplete="street-address" placeholder="Enter your service location" /></label></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button confirm-booking" type="button" onClick={confirm} disabled={status === 'loading'}>{status === 'loading' ? 'Booking your service…' : 'Book Service'}</button></section>
}
