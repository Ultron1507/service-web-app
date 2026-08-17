import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContextValue'

const logo = '/take-wind-logo.png'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)
  const [location, setLocation] = useState('')
  const addressRef = useRef(null)
  const { login, user, loading, error } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate(user.role === 'admin' ? '/admin' : '/home', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login(phone)
  }

  useEffect(() => {
    if (!locationOpen || !addressRef.current || !import.meta.env.VITE_GOOGLE_MAPS_API_KEY) return undefined
    const initialise = () => {
      if (!window.google?.maps?.places) return
      const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current, { types: ['geocode'], componentRestrictions: { country: 'in' } })
      autocomplete.addListener('place_changed', () => setLocation(autocomplete.getPlace().formatted_address || addressRef.current.value))
    }
    if (window.google?.maps?.places) {
      initialise()
      return undefined
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.onload = initialise
    document.head.appendChild(script)
    return () => script.remove()
  }, [locationOpen])

  return <section className="login-screen"><div className="login-brand"><img className="login-logo" src={logo} alt="Take Wind" /><h1>Home service, made simple.</h1><p>Book trusted appliance care and keep every detail in one easy place.</p></div><div className="login-card"><h2>Let's get you started</h2><p>Use your mobile number to book and manage services.</p><form onSubmit={handleSubmit}><label className="field-label"><span>Mobile number</span><span className="phone-field"><span>+91</span><input autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10" required value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile number" aria-describedby="phone-help" disabled={loading} /></span><small id="phone-help">We'll use this to verify your account.</small></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Continue'}</button></form><button className="location-button" type="button" onClick={() => setLocationOpen(!locationOpen)} aria-expanded={locationOpen}><i className="ri-map-pin-line" aria-hidden="true" />{locationOpen ? 'Hide location' : 'Add your area (optional)'}</button>{locationOpen && <label className="location-input"><span>Your area</span><input ref={addressRef} value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Search for your location..." /></label>}</div></section>
}
