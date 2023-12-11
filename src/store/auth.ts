import { defineStore } from 'pinia'
import SecureDataProcessor from '@/utils/SecureDataProcessor'
import api from '@/api'
import { handleError } from '@/utils/handleErrors'

interface MainState {
  username: null | string
  token: null | string
  roles: string[] | null
}

const initializeState = (): MainState => {
  const [storedToken, storedUser, storedRoles] = [
    localStorage.getItem('@salis:token'),
    localStorage.getItem('@salis:user'),
    localStorage.getItem('@salis:roles')
  ]

  return {
    username: storedUser !== null ? dataProcessor.decrypt(storedUser) : null,
    token: storedToken !== null ? dataProcessor.decrypt(storedToken) : null,
    roles:
      storedRoles !== null
        ? JSON.parse(dataProcessor.decrypt(storedRoles))
        : null
  }
}

const dataProcessor = SecureDataProcessor.dataProcessor

export const useAuthStore = defineStore({
  id: 'auth',
  state: initializeState,
  getters: {
    getUsername: (state) => state.username,
    getRoles: (state) => state.roles,
    getToken: (state) => state.token
  },
  actions: {
    setUsername(username: string | null) {
      if (username) {
        localStorage.setItem('@salis:user', dataProcessor.encrypt(username))
      } else {
        localStorage.removeItem('@salis:user')
      }
      this.username = username
    },
    setRoles(roles: string[] | null) {
      if (roles) {
        localStorage.setItem(
          '@salis:roles',
          dataProcessor.encrypt(JSON.stringify(roles))
        )
      } else {
        localStorage.removeItem('@salis:roles')
      }
      this.roles = roles
    },
    setToken(token: string | null) {
      if (token) {
        localStorage.setItem('@salis:token', dataProcessor.encrypt(token))
      } else {
        localStorage.removeItem('@salis:token')
      }
      this.token = token
    },
    async login(data: { email: string; password: string }) {
      const authService = api.auth

      await authService
        .login(data)
        .then(({ username, token, roles }) => {
          this.setUsername(username)
          this.setToken(token)
          this.setRoles(roles)
        })
        .catch((err: Error) => {
          this.setUsername(null)
          this.setToken(null)
          this.setRoles(null)
          handleError(err, err.message)
        })
    }
  }
})
