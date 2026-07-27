export const getViteCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME

export const getApiBaseUrl = () => {
  const codespaceName = getViteCodespaceName()
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'
}

export const getApiEndpoint = (resource) => `${getApiBaseUrl()}/${resource}/`

export const normalizeApiResponse = (data, listKey) => {
  if (!data) {
    return []
  }

  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data[listKey])) {
    return data[listKey]
  }

  if (Array.isArray(data.items)) {
    return data.items
  }

  if (Array.isArray(data.data)) {
    return data.data
  }

  return []
}

export const fetchApiList = async (resource, listKey) => {
  const url = getApiEndpoint(resource)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  const json = await response.json()
  return normalizeApiResponse(json, listKey)
}
