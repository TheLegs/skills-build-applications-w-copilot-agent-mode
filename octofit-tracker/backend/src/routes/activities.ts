import { Router } from 'express'
import Activity from '../models/Activity.js'

const router = Router()

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email').lean()
  res.json({ activities })
})

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body)
  res.status(201).json({ activity })
})

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user', 'name email').lean()
  res.json({ activity })
})

export default router
