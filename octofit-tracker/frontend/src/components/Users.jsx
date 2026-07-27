import { useEffect, useState } from 'react'
import { normalizeApiResponse } from '../lib/api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'

  useEffect(() => {
    fetch(apiEndpoint)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`)
        }
        return response.json()
      })
      .then((json) => setUsers(normalizeApiResponse(json, 'users')))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [apiEndpoint])

  return (
    <section className="py-4">
      <h2>Users</h2>
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
        <div>Loading users…</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
