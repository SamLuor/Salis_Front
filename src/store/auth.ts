import { defineStore } from 'pinia'
import SecureDataProcessor from '@/utils/SecureDataProcessor'
import api from '@/api'
import { handleError } from '@/utils/handleErrors'
import router from '@/router'

interface MainState {
  username: null | string
  token: null | string
  roles: string[] | null
  options_company: [{ text: string; value: string }] | []
}

const initializeState = (): MainState => {
  const [storedToken, storedUser, storedRoles, storeOptionsCompany] = [
    localStorage.getItem('@salis:token'),
    localStorage.getItem('@salis:user'),
    localStorage.getItem('@salis:roles'),
    localStorage.getItem('@salis:options_company')
  ]

  return {
    username: storedUser !== null ? dataProcessor.decrypt(storedUser) : null,
    token: storedToken !== null ? dataProcessor.decrypt(storedToken) : null,
    options_company:
      storeOptionsCompany !== null
        ? JSON.parse(dataProcessor.decrypt(storeOptionsCompany))
        : [],
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
    getToken: (state) => state.token,
    getOptionsCompany: (state) => state.options_company
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
    setOptionsCompany(options: [{ text: string; value: string }] | []) {
      if (options) {
        localStorage.setItem(
          '@salis:options_company',
          dataProcessor.encrypt(JSON.stringify(options))
        )
      } else {
        localStorage.removeItem('@salis:options_company')
      }
      this.options_company = options
    },
    async login(data: { email: string; password: string }) {
      const authService = api.auth

      try {
        const response = await authService.login(data)

        if (response.data.access_token) {
          this.setToken(response.data.access_token)
          this.showOptionsCompany()
          router.push('/select-company')
        }
      } catch (err) {
        this.setToken(null)
        handleError(err as Error, (err as Error).message)
      }
    },
    async showOptionsCompany() {
      const authService = api.auth

      try {
        const response = await authService.getOptionsCompany()

        if (response.data) {
          this.setOptionsCompany(response.data)
        }
      } catch (err) {
        this.setToken(null)
        handleError(err as Error, (err as Error).message)
      }
    },
    async selectCompany(id: string) {
      const authService = api.auth

      try {
        const response = await authService.loginWithCompany(id)
        if (response.data.access_token) {
          this.setToken(response.data.access_token)
          router.push({ name: 'app' })
        }
      } catch (err) {
        this.setToken(null)
        handleError(err as Error, (err as Error).message)
      } finally {
        this.setOptionsCompany([])
      }
    }
  }
})
