import { useEffect, useState } from 'react'
import { fetchApiList, getApiBaseUrl, getViteCodespaceName } from '../lib/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const codespaceName = getViteCodespaceName()

  useEffect(() => {
    fetchApiList('activities', 'activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-4">
      <h2>Activities</h2>
      <p>
        API base URL: <strong>{getApiBaseUrl()}</strong>
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
