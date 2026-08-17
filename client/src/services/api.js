import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const login = async (phone) => {
  const response = await api.post('/api/auth/login', { phone })
  return response.data
}

export const getServices = async () => {
  const response = await api.get('/api/services')
  return response.data
}

export const createBooking = async (payload) => {
  const response = await api.post('/api/bookings', payload)
  return response.data
}

export default api
