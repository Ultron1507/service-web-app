export const stats = [
  { label: 'Total bookings', value: '248', change: '+12.5%', tone: 'blue', icon: 'calendar' },
  { label: 'Pending bookings', value: '18', change: 'Needs attention', tone: 'amber', icon: 'clock' },
  { label: 'Completed bookings', value: '196', change: '+8.2%', tone: 'green', icon: 'check' },
  { label: 'Cancelled bookings', value: '34', change: '-2.4%', tone: 'red', icon: 'x' },
  { label: 'Total customers', value: '172', change: '+16 new this month', tone: 'violet', icon: 'users' },
  { label: 'Total revenue', value: '₹1,84,500', change: '+14.8%', tone: 'teal', icon: 'wallet' },
]

export const bookings = [
  { id: 'BK1024', customer: 'Aarav Mehta', phone: '+91 98765 43210', service: 'Deep Home Cleaning', date: '18 Aug, 2026 · 10:30 AM', location: 'Bandra West, Mumbai', status: 'Pending', created: 'Today, 09:12 AM', address: 'Flat 402, Sea View Apartments, Bandra West', expected: '2.5 hours', notes: 'Please call before arriving. The building has visitor parking.' },
  { id: 'BK1023', customer: 'Ishita Sharma', phone: '+91 99887 77665', service: 'AC Repair & Service', date: '18 Aug, 2026 · 12:00 PM', location: 'Indiranagar, Bengaluru', status: 'Accepted', created: 'Today, 08:44 AM', address: '12th Main Road, Indiranagar', expected: '1.5 hours', notes: 'AC making a rattling sound.' },
  { id: 'BK1022', customer: 'Rohan Kapoor', phone: '+91 98111 22334', service: 'Pest Control', date: '17 Aug, 2026 · 03:30 PM', location: 'Sector 44, Gurgaon', status: 'In Progress', created: 'Yesterday, 04:20 PM', address: 'House 18, Sector 44', expected: '3 hours', notes: 'Focus on kitchen and balcony areas.' },
  { id: 'BK1021', customer: 'Nisha Patel', phone: '+91 97654 11223', service: 'Sofa Cleaning', date: '17 Aug, 2026 · 11:00 AM', location: 'Powai, Mumbai', status: 'Completed', created: 'Yesterday, 11:05 AM', address: 'Lakeview Residency, Powai', expected: '2 hours', notes: 'Three-seater fabric sofa.' },
  { id: 'BK1020', customer: 'Kabir Singh', phone: '+91 98989 44556', service: 'Bathroom Cleaning', date: '16 Aug, 2026 · 09:00 AM', location: 'Whitefield, Bengaluru', status: 'Cancelled', created: '15 Aug, 2026', address: 'Prestige Lakeside Habitat', expected: '1.5 hours', notes: 'Customer requested a reschedule.' },
  { id: 'BK1019', customer: 'Meera Iyer', phone: '+91 99001 88990', service: 'Full Home Cleaning', date: '16 Aug, 2026 · 02:00 PM', location: 'Koramangala, Bengaluru', status: 'Completed', created: '14 Aug, 2026', address: '5th Block, Koramangala', expected: '4 hours', notes: 'Include balcony windows.' },
  { id: 'BK1018', customer: 'Vikram Desai', phone: '+91 98200 33445', service: 'Kitchen Cleaning', date: '15 Aug, 2026 · 10:00 AM', location: 'Andheri East, Mumbai', status: 'Accepted', created: '13 Aug, 2026', email: 'vikram.desai@email.com', address: 'Mahakali Caves Road, Andheri East', expected: '2 hours', notes: 'Modular kitchen with chimney.' },
  { id: 'BK1017', customer: 'Tara Rao', phone: '+91 98450 66778', service: 'Water Tank Cleaning', date: '14 Aug, 2026 · 01:30 PM', location: 'HSR Layout, Bengaluru', status: 'Completed', created: '12 Aug, 2026', email: 'tara.rao@email.com', address: '27th Main, HSR Layout', expected: '3 hours', notes: 'Ground floor tank.' },
]

export const customers = [
  { name: 'Aarav Mehta', initials: 'AM', phone: '+91 98765 43210', bookings: 8, completed: 7, last: '18 Aug, 2026', status: 'Active', color: 'blue' },
  { name: 'Ishita Sharma', initials: 'IS', phone: '+91 99887 77665', bookings: 5, completed: 4, last: '18 Aug, 2026', status: 'Active', color: 'purple' },
  { name: 'Rohan Kapoor', initials: 'RK', phone: '+91 98111 22334', bookings: 3, completed: 2, last: '17 Aug, 2026', status: 'Active', color: 'orange' },
  { name: 'Nisha Patel', initials: 'NP', phone: '+91 97654 11223', bookings: 12, completed: 12, last: '17 Aug, 2026', status: 'Active', color: 'green' },
  { name: 'Kabir Singh', initials: 'KS', phone: '+91 98989 44556', bookings: 2, completed: 1, last: '16 Aug, 2026', status: 'Inactive', color: 'pink' },
  { name: 'Meera Iyer', initials: 'MI', phone: '+91 99001 88990', bookings: 7, completed: 7, last: '16 Aug, 2026', status: 'Active', color: 'teal' },
]

export const services = [
  { name: 'Deep Home Cleaning', description: 'A detailed clean for every room, corner, and surface.', price: '₹1,499', duration: '3 - 4 hrs', bookings: 86, status: 'Active', icon: 'sparkles' },
  { name: 'AC Repair & Service', description: 'Professional inspection, repair, and seasonal servicing.', price: '₹599', duration: '1 - 2 hrs', bookings: 48, status: 'Active', icon: 'wind' },
  { name: 'Pest Control', description: 'Safe, effective treatment for a pest-free home.', price: '₹899', duration: '2 - 3 hrs', bookings: 38, status: 'Active', icon: 'bug' },
  { name: 'Sofa Cleaning', description: 'Deep extraction cleaning for fabric and leather sofas.', price: '₹699', duration: '1 - 2 hrs', bookings: 32, status: 'Active', icon: 'armchair' },
  { name: 'Bathroom Cleaning', description: 'Sanitisation and deep cleaning for a sparkling finish.', price: '₹499', duration: '1 hr', bookings: 28, status: 'Paused', icon: 'bath' },
  { name: 'Kitchen Cleaning', description: 'Degreasing and sanitisation for your everyday kitchen.', price: '₹799', duration: '2 hrs', bookings: 16, status: 'Active', icon: 'utensils' },
]

export const notifications = [
  { id: 1, type: 'booking', title: 'New booking received', text: 'Booking #BK1024 was created by Aarav Mehta.', time: '2 minutes ago', unread: true },
  { id: 2, type: 'review', title: 'New 5-star review', text: 'Nisha Patel left a glowing review for Sofa Cleaning.', time: '34 minutes ago', unread: true },
  { id: 3, type: 'customer', title: 'New customer joined', text: 'Tara Rao created a new customer profile.', time: '1 hour ago', unread: true },
  { id: 4, type: 'completed', title: 'Booking completed', text: 'Booking #BK1021 has been marked completed.', time: '3 hours ago', unread: false },
  { id: 5, type: 'cancelled', title: 'Booking cancelled', text: 'Booking #BK1020 was cancelled by the customer.', time: 'Yesterday', unread: false },
]

export const reviews = [
  { customer: 'Nisha Patel', rating: 5, review: 'The team was punctual, polite, and the sofa looks brand new. Will definitely book again!', service: 'Sofa Cleaning', date: '17 Aug, 2026', status: 'Published' },
  { customer: 'Meera Iyer', rating: 5, review: 'Wonderful service from start to finish. Very thorough and professional.', service: 'Full Home Cleaning', date: '16 Aug, 2026', status: 'Published' },
  { customer: 'Aarav Mehta', rating: 4, review: 'Good service overall. The booking process was smooth and the staff was helpful.', service: 'Deep Home Cleaning', date: '14 Aug, 2026', status: 'Published' },
  { customer: 'Vikram Desai', rating: 3, review: 'The cleaning was fine, but the team arrived later than the scheduled time.', service: 'Kitchen Cleaning', date: '12 Aug, 2026', status: 'Published' },
]

export const chartData = {
  '7 Days': [
    { name: 'Mon', bookings: 28, completed: 21 }, { name: 'Tue', bookings: 34, completed: 27 }, { name: 'Wed', bookings: 26, completed: 18 }, { name: 'Thu', bookings: 42, completed: 31 }, { name: 'Fri', bookings: 36, completed: 29 }, { name: 'Sat', bookings: 49, completed: 38 }, { name: 'Sun', bookings: 33, completed: 25 },
  ],
  '30 Days': Array.from({ length: 10 }, (_, index) => ({ name: `${index * 3 + 1} Aug`, bookings: 28 + ((index * 13) % 22), completed: 19 + ((index * 9) % 17) })),
  '12 Months': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((name, index) => ({ name, bookings: 110 + index * 18, completed: 88 + index * 14 })),
}