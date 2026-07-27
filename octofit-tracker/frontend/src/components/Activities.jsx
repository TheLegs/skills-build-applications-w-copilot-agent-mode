import { useEffect, useState } from 'react'
import { normalizeApiResponse } from '../lib/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'

  useEffect(() => {
    fetch(apiEndpoint)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }
        return response.json()
      })
      .then((json) => setActivities(normalizeApiResponse(json, 'activities')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiEndpoint])

  return (
    <section className="py-4">
      <h2>Activities</h2>
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
        <div>Loading activities…</div>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>{activity.type}</h5>
                  <p className="mb-1">{activity.notes}</p>
                </div>
                <span className="badge bg-secondary">{activity.durationMinutes} min</span>
              </div>
              <div className="small text-muted">
                {activity.user?.name || 'Unknown athlete'} • {activity.caloriesBurned} calories
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities
