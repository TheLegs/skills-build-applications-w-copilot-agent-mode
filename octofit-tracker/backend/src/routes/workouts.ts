import { Router } from 'express'
import Workout from '../models/Workout.js'

const router = Router()

router.get('/', async (req, res) => {
  const workouts = await Workout.find().populate('createdBy', 'name email').lean()
  res.json({ workouts })
})

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body)
  res.status(201).json({ workout })
})

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id).populate('createdBy', 'name email').lean()
  res.json({ workout })
})

export default router
