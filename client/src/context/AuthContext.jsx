/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useRef, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')
  const confirmation = useRef(null)
  const verifier = useRef(null)

  const login = async (phone) => {
    setLoading(true); setError('')
    try {
      if (!verifier.current) verifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' })
      confirmation.current = await signInWithPhoneNumber(auth, `+91${phone.replace(/\D/g, '')}`, verifier.current)
      setOtpSent(true)
      return true
    } catch {
      setError('Unable to send OTP. Check your Firebase configuration and try again.')
      verifier.current?.clear(); verifier.current = null
      return false
    } finally { setLoading(false) }
  }

  const verifyOtp = async (code) => {
    setLoading(true); setError('')
    try {
      if (!confirmation.current) throw new Error('Request an OTP first')
      const result = await confirmation.current.confirm(code)
      setUser(result.user)
      return true
    } catch { setError('That code could not be verified. Please try again.'); return false } finally { setLoading(false) }
  }

  const logout = () => { setUser(null); setOtpSent(false); confirmation.current = null }
  const value = useMemo(() => ({ user, loading, otpSent, error, login, verifyOtp, logout }), [user, loading, otpSent, error])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
