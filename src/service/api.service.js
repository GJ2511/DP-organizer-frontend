import axios from 'axios'

axios.defaults.headers.common = {
  'Content-Type': 'application/json'
}

const createHttpClient = (baseURL) => {
  const client = axios.create({ baseURL })

  client.interceptors.response.use(handleResponseInterception, handleResponseErrorInterception)
  return client
}

class ApiService {
  constructor (baseURL, paramsSerializerConfig, headers) {
    this.baseURL = baseURL
    this.client = createHttpClient(baseURL, headers, paramsSerializerConfig)
  }

  get (resource, params = {}) {
    return this.client.get(resource, { params })
  }

  post (resource, body = {}) {
    return this.client.post(resource, body)
  }

  put (resource, body = {}) {
    return this.client.put(resource, body)
  }
}

function handleResponseInterception (response) {
  return response && response.data
}

function handleResponseErrorInterception (error) {
  return Promise.reject(error)
}

export { createHttpClient }
export default ApiService
