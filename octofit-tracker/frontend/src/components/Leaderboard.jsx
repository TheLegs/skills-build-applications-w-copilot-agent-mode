import { useEffect, useState } from 'react'
import { normalizeApiResponse } from '../lib/api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'

  useEffect(() => {
    fetch(apiEndpoint)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }
        return response.json()
      })
      .then((json) => setEntries(normalizeApiResponse(json, 'leaderboard')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiEndpoint])

  return (
    <section className="py-4">
      <h2>Leaderboard</h2>
      <p>
        API endpoint: <strong>{apiEndpoint}</strong>
      </p>
      <p>
        {codespaceName
          ? `Using VITE_CODESPACE_NAME=${codespaceName}`
          : 'No VITE_CODESPACE_NAME set; falling back to localhost.'}
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading leaderboard…</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.rank}</td>
                  <td>{entry.user?.name || 'Unknown'}</td>
                  <td>{entry.team?.name || 'Independent'}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
