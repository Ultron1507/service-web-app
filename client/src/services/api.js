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

export const getServiceBySlug = async (slug) => (await api.get(`/api/services/slug/${encodeURIComponent(slug)}`)).data

export const createBooking = async (payload) => {
  const response = await api.post('/api/bookings', payload)
  return response.data
}

export const getMyBookings = async () => (await api.get('/api/bookings/my')).data
export const getBookingById = async (id) => (await api.get(`/api/bookings/${id}`)).data
export const getAdminDashboard = async () => (await api.get('/api/admin/dashboard')).data
export const getAdminBookings = async (status) => (await api.get('/api/admin/bookings', { params: status ? { status } : {} })).data
export const getNotifications = async () => (await api.get('/api/notifications')).data
export const markAllNotificationsRead = async () => (await api.patch('/api/notifications/read-all')).data
export const markNotificationRead = async (id) => (await api.patch(`/api/notifications/${id}/read`)).data
export const getAdminNotifications = getNotifications
export const updateAdminBookingStatus = async (id, action, payload = {}) => (await api.patch(`/api/admin/bookings/${id}/${action}`, payload)).data

export default api
