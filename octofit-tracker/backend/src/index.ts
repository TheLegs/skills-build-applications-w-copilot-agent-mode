import express from 'express'
import cors from 'cors'
import db from './config/database.js'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const app = express()
const port = Number(process.env.PORT || 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', port, baseUrl })
})

app.get('/api/ready', (req, res) => {
  const ready = db.readyState === 1
  res.json({ ready, dbState: db.readyState, baseUrl })
})

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`)
  console.log(`Base API URL: ${baseUrl}`)
})
