import { useMemo, useState } from 'react'
import api, { login as requestLogin } from '../services/api'
import { AuthContext } from './AuthContextValue'

const TOKEN_KEY = 'authToken'
const USER_KEY = 'authUser'
const storedToken = localStorage.getItem(TOKEN_KEY)

if (storedToken) api.defaults.headers.common.Authorization = `Bearer ${storedToken}`

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY)
    try {
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      localStorage.removeItem(USER_KEY)
      return null
    }
  })
  const [token, setToken] = useState(storedToken)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (phone) => {
    setLoading(true)
    setError('')
    try {
      const digits = phone.replace(/\D/g, '')
      const formattedPhone = digits.startsWith('91') && digits.length === 12 ? `+${digits}` : `+91${digits}`
      const response = await requestLogin(formattedPhone)
      if (!response.success || !response.data?.token || !response.data?.user) {
        setError(response.message || 'Login failed')
        return false
      }

      const { token: authToken, user: userData } = response.data
      localStorage.setItem(TOKEN_KEY, authToken)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      api.defaults.headers.common.Authorization = `Bearer ${authToken}`
      setToken(authToken)
      setUser(userData)
      return true
    } catch (requestError) {
      setError(requestError.response?.data?.message || (requestError.request ? 'Unable to connect to server. Please try again.' : 'An error occurred. Please try again.'))
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    delete api.defaults.headers.common.Authorization
  }

  const value = useMemo(() => ({ user, token, loading, error, login, logout }), [user, token, loading, error])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
