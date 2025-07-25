import axios from 'axios'
import { getAuth } from 'firebase/auth'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

// Interceptor para adicionar o token no header
api.interceptors.request.use(async (config) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

export default api
