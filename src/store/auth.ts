import { defineStore } from 'pinia'
import SecureDataProcessor from '@/utils/SecureDataProcessor'
import api from '@/api'
import { handleError } from '@/utils/handleErrors'
import router from '@/router'
import type { UserMe } from '@/@types/auth'
import { UserFactory } from '@/factories/UserFactory'
import { MainState } from './@types/Auth'

const initializeState = (): MainState => {
  const [
    storedToken,
    storedUser,
    storedRoles,
    storeOptionsCompany,
    storeCompany
  ] = [
    localStorage.getItem('@salis:token'),
    localStorage.getItem('@salis:user'),
    localStorage.getItem('@salis:roles'),
    localStorage.getItem('@salis:options_company'),
    localStorage.getItem('@salis:company')
  ]

  return {
    user:
      storedUser !== null ? JSON.parse(dataProcessor.decrypt(storedUser)) : {},
    token: storedToken !== null ? dataProcessor.decrypt(storedToken) : null,
    options_company:
      storeOptionsCompany !== null
        ? JSON.parse(dataProcessor.decrypt(storeOptionsCompany))
        : [],
    roles:
      storedRoles !== null
        ? JSON.parse(dataProcessor.decrypt(storedRoles))
        : null,
    company_id:
      storeCompany !== null
        ? JSON.parse(dataProcessor.decrypt(storeCompany))
        : null
  }
}

const dataProcessor = SecureDataProcessor.dataProcessor

export const useAuthStore = defineStore({
  id: 'auth',
  state: initializeState,
  getters: {
    getUsername: (state) => state.user.name,
    getPermissions: (state) => state.user.permissions,
    getIdUser: (state) => state.user.id,
    getUserEmail: (state) => state.user.email,
    getRoles: (state) => state.roles,
    getToken: (state) => state.token,
    getOptionsCompany: (state) => state.options_company,
    getCompanyID: (state) => state.company_id
  },
  actions: {
    setUser(user: UserMe) {
      const userFactored = UserFactory(user)
      if (user.name) {
        localStorage.setItem(
          '@salis:user',
          dataProcessor.encrypt(JSON.stringify(userFactored))
        )
      } else {
        localStorage.removeItem('@salis:user')
      }
      this.user = userFactored
    },
    setCompany_id(company_id: string | null) {
      if (company_id) {
        localStorage.setItem(
          '@salis:company',
          dataProcessor.encrypt(JSON.stringify(company_id))
        )
      } else {
        localStorage.removeItem('@salis:company_id')
      }
      this.company_id = company_id
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
      if (options.length > 0) {
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
      const authService = api.Auth

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
    async logout() {
      const authService = api.Auth

      try {
        await authService.logout()

        this.setToken(null)
        this.setUser({} as UserMe)
        this.setOptionsCompany([])
        this.setCompany_id(null)

        router.push({ name: 'login' })
      } catch (err) {
        handleError(err as Error, (err as Error).message)
      }
    },
    async showOptionsCompany() {
      const authService = api.Auth

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
      const authService = api.Auth

      try {
        const response = await authService.loginWithCompany(id)
        if (response.data.access_token) {
          this.setToken(response.data.access_token)
          this.setCompany_id(id)
          await this.getMe()

          router.push({ name: 'user' })
        }
      } catch (err) {
        this.setToken(null)
        handleError(err as Error, (err as Error).message)
      } finally {
        this.setOptionsCompany([])
      }
    },
    async getMe() {
      const authService = api.Auth
      try {
        const responseDataMe = await authService.getMe()
        this.setUser(responseDataMe.data)
      } catch (err) {
        this.setUser({} as UserMe)
        handleError(err as Error, (err as Error).message)
      }
    }
  }
})
