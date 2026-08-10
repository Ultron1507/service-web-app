import User from '../models/User.js'

export const registerOrLogin = async (req, res) => {
  try {
    const { phone } = req.body
    if (!phone) return res.status(400).json({ message: 'Phone is required' })

    let user = await User.findOne({ phone })
    if (!user) {
      user = await User.create({ phone })
    }

    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
