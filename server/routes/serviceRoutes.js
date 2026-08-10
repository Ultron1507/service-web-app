import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Oil Change', price: 49 },
    { id: 2, name: 'Tire Service', price: 79 },
    { id: 3, name: 'Battery', price: 129 },
    { id: 4, name: 'Wash & Wax', price: 89 },
  ])
})

export default router
