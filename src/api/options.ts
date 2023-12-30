import { AuthProtocol } from '@/@types/auth'
import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'

export default class OptionService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async getCompanies() {
    return await this.httpConfig
      .get('/option/empresas')
      .then((response) => {
        return { ...response.data, option: 'companies' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPosition() {
    return await this.httpConfig
      .get('/option/cargos')
      .then((response) => {
        return { ...response.data, option: 'positions' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPermitions() {
    return await this.httpConfig
      .get('/option/permissoes')
      .then((response) => {
        return { ...response.data, option: 'permitions' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getUsers() {
    return await this.httpConfig
      .get('/option/usuarios')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
