import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
})

export const getServices = async () => {
  const response = await api.get('/services')
  return response.data
}

export const createBooking = async (payload) => {
  const response = await api.post('/bookings', payload)
  return response.data
}

export default api
