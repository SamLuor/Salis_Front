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

  async getClients() {
    return await this.httpConfig
      .get('/option/clientes')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPublicationMeans() {
    return await this.httpConfig
      .get('/option/meio-publicacoes')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getProcessTypes() {
    return await this.httpConfig
      .get('/option/tipo-processos')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getProcessModality() {
    return await this.httpConfig
      .get('/option/modalidade-processos')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getHiringRegime() {
    return await this.httpConfig
      .get('/option/regime-contratacoes')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPurchasingPortal() {
    return await this.httpConfig
      .get('/option/portal-compras')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getExecutionTypes() {
    return await this.httpConfig
      .get('/option/tipo-execucoes')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getModalityProcess() {
    return await this.httpConfig
      .get('/option/modo-disputas')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getModalityProcess() {
    return await this.httpConfig
      .get('/option/criterio-julgamentos')
      .then((response) => {
        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
