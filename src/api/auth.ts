import { AuthProtocol } from '@/@types/auth'
import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'

export default class AuthService implements AuthProtocol {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async login(data: { email: string; password: string }): Promise<{
    username: string
    token: string
    roles: string[]
  }> {
    return await this.httpConfig
      .post('/auth', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        handleError(err, err.message)
      })
  }
}
