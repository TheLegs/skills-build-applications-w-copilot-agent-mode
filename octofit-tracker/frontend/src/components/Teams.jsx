import { useEffect, useState } from 'react'
import { normalizeApiResponse } from '../lib/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'

  useEffect(() => {
    fetch(apiEndpoint)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }
        return response.json()
      })
      .then((json) => setTeams(normalizeApiResponse(json, 'teams')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiEndpoint])

  return (
    <section className="py-4">
      <h2>Teams</h2>
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
        <div>Loading teams…</div>
      ) : (
        <div className="row gy-3">
          {teams.map((team) => (
            <div key={team._id} className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                  <p className="card-text">
                    Captain: {team.captain?.name || 'TBD'}
                  </p>
                  <p className="card-text">
                    Members: {team.members?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
