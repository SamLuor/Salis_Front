import { AuthProtocol } from '@/@types/auth'
import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'

export default class AuthService implements AuthProtocol {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async login(data: {
    email: string
    password: string
  }): Promise<{ data: { access_token: string }; message: string }> {
    return await this.httpConfig
      .post('/auth/login', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        handleError(err, err.message)
      })
  }

  async loginWithCompany(id: string) {
    return await this.httpConfig
      .post('/auth/login-with-company', { current_company: id })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        handleError(err, err.message)
      })
  }

  async getOptionsCompany(): Promise<{ data: [] }> {
    return await this.httpConfig
      .get('/option/empresas')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        handleError(err, err.message)
      })
  }
}
