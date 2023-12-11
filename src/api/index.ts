import { httpConfig } from '@/api/axiosInstance'
import AuthService from './auth'
import SecureDataProcessor from '@/utils/SecureDataProcessor'
import router from '@/router'

httpConfig.interceptors.request.use((config) => {
  const dataProcessor = SecureDataProcessor.dataProcessor
  const storedToken = localStorage.getItem('@salis:token')
  const decryptToken = storedToken ? dataProcessor.decrypt(storedToken) : null

  if (decryptToken) {
    config.headers.Authorization = `Bearer ${decryptToken}`
  }
  return config
})

httpConfig.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  }
)

export default {
  auth: new AuthService(httpConfig)
}
