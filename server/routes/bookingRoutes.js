import express from 'express'
import { createBooking } from '../controllers/bookingController.js'
import { verifyFirebaseToken } from '../middleware/verifyFirebaseToken.js'

const router = express.Router()

router.post('/', verifyFirebaseToken, createBooking)

export default router
