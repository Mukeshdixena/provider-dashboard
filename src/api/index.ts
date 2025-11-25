// src/api/index.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',  // Your Spring Boot backend
  timeout: 10000
})

// Add JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('provider_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api