import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <section className="hero-section">
      <h1>OctoFit Tracker</h1>
      <p className="lead">
        A modern multi-tier fitness tracker built with React, Vite, Express, TypeScript, and MongoDB.
      </p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="/api/health" target="_blank" rel="noreferrer">
          Backend Health
        </a>
      </div>
    </section>
  )
}

function Dashboard() {
  return (
    <section className="dashboard-section">
      <h2>Dashboard</h2>
      <p>Track users, activities, teams, and leaderboard data from the API.</p>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell container py-5">
        <header className="mb-4">
          <nav className="navbar navbar-expand-lg navbar-light bg-light rounded px-3">
            <span className="navbar-brand mb-0 h1">OctoFit</span>
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
