import express from 'express'
import cors from 'cors'
import db from './config/database.js'

const app = express()
const port = Number(process.env.PORT || 8000)

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', port })
})

app.get('/api/ready', (req, res) => {
  const ready = db.readyState === 1
  res.json({ ready, dbState: db.readyState })
})

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`)
})
