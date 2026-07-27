import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function Home() {
  return (
    <section className="hero-section">
      <h1>OctoFit Tracker</h1>
      <p className="lead">
        A modern multi-tier fitness tracker built with React, Vite, Express, TypeScript, and MongoDB.
      </p>
      <p className="mb-3">
        The UI reads the API base URL from <code>import.meta.env.VITE_CODESPACE_NAME</code>.
      </p>
      <p className="text-muted">
        Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces support.
      </p>
      <div className="hero-actions">
        <NavLink className="btn btn-primary" to="/users">
          View Users
        </NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell container py-5">
        <header className="mb-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light rounded px-3">
            <span className="navbar-brand mb-0 h1">OctoFit Tracker</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#octofitNavbar"
              aria-controls="octofitNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="octofitNavbar">
              <div className="navbar-nav">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
                <NavLink className="nav-link" to="/activities">
                  Activities
                </NavLink>
                <NavLink className="nav-link" to="/teams">
                  Teams
                </NavLink>
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </div>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
