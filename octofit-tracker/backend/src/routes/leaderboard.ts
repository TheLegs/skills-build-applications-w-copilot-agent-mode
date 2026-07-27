import { Router } from 'express'
import LeaderboardEntry from '../models/LeaderboardEntry.js'

const router = Router()

router.get('/', async (req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user team', 'name email').sort({ rank: 1 }).lean()
  res.json({ leaderboard })
})

router.post('/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body)
  res.status(201).json({ entry })
})

export default router
