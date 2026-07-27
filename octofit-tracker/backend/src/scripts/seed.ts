import mongoose from 'mongoose'
import User from '../models/User.js'
import Team from '../models/Team.js'
import Activity from '../models/Activity.js'
import LeaderboardEntry from '../models/LeaderboardEntry.js'
import Workout from '../models/Workout.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      {
        name: 'Ava Kim',
        email: 'ava.kim@octofit.com',
        passwordHash: 'hashed-password-ava',
        role: 'athlete',
        preferredWorkoutTypes: ['running', 'strength'],
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@octofit.com',
        passwordHash: 'hashed-password-marcus',
        role: 'athlete',
        preferredWorkoutTypes: ['cycling', 'yoga'],
      },
      {
        name: 'Priya Singh',
        email: 'priya.singh@octofit.com',
        passwordHash: 'hashed-password-priya',
        role: 'coach',
        preferredWorkoutTypes: ['strength', 'HIIT'],
      },
    ])

    const teams = await Team.create([
      {
        name: 'OctoRunners',
        description: 'A competitive running team focused on endurance and recovery.',
        captain: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'PowerPulse',
        description: 'Strength and performance training for weekend warriors.',
        captain: users[2]._id,
        members: [users[2]._id],
      },
    ])

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 45,
        caloriesBurned: 520,
        distanceKm: 10,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        notes: 'Morning tempo run with hill repeats.',
      },
      {
        user: users[1]._id,
        type: 'Cycling',
        durationMinutes: 60,
        caloriesBurned: 680,
        distanceKm: 24,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        notes: 'Steady-state ride through the city.',
      },
      {
        user: users[2]._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 410,
        distanceKm: 0,
        performedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
        notes: 'Full-body circuit with compound lifts.',
      },
    ])

    const leaderboardEntries = await LeaderboardEntry.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        score: 1580,
        rank: 1,
        category: 'weekly',
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        score: 1420,
        rank: 2,
        category: 'weekly',
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        score: 1350,
        rank: 3,
        category: 'weekly',
      },
    ])

    const workouts = await Workout.create([
      {
        title: 'Foundations Strength Circuit',
        description: 'A balanced routine for building strength and stability.',
        durationMinutes: 40,
        intensity: 'medium',
        focusAreas: ['full body', 'core'],
        createdBy: users[2]._id,
      },
      {
        title: 'HIIT Power Burner',
        description: 'High-intensity intervals designed to boost metabolism.',
        durationMinutes: 30,
        intensity: 'high',
        focusAreas: ['conditioning', 'legs'],
        createdBy: users[2]._id,
      },
      {
        title: 'Recovery Flow',
        description: 'Low-impact mobility and stretching to recover after hard training.',
        durationMinutes: 25,
        intensity: 'low',
        focusAreas: ['mobility', 'recovery'],
        createdBy: users[0]._id,
      },
    ])

    console.log('Created users:', users.map((u) => u.email).join(', '))
    console.log('Created teams:', teams.map((t) => t.name).join(', '))
    console.log('Created activities:', activities.length)
    console.log('Created leaderboard entries:', leaderboardEntries.length)
    console.log('Created workouts:', workouts.length)

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
