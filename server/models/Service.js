import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
})

export default mongoose.model('Service', serviceSchema)
