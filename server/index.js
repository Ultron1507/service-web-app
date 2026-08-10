import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Take Wind server is running' })
})

app.get('/api/services', (req, res) => {
  res.json([
    { id: 1, name: 'Oil Change', price: 49 },
    { id: 2, name: 'Tire Service', price: 79 },
    { id: 3, name: 'Battery', price: 129 },
    { id: 4, name: 'Wash & Wax', price: 89 },
  ])
})

app.post('/api/bookings', (req, res) => {
  res.status(201).json({ success: true, booking: req.body })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
