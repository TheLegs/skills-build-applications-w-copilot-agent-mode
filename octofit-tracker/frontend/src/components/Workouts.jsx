import { useEffect, useState } from 'react'
import { fetchApiList, getApiBaseUrl, getViteCodespaceName } from '../lib/api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const codespaceName = getViteCodespaceName()

  useEffect(() => {
    fetchApiList('workouts', 'workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-4">
      <h2>Workouts</h2>
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
        <div>Loading workouts…</div>
      ) : (
        <div className="row gy-3">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="card-text mb-1">
                    <strong>Duration:</strong> {workout.durationMinutes} minutes
                  </p>
                  <p className="card-text mb-0">
                    <strong>Intensity:</strong> {workout.intensity}
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

export default Workouts
