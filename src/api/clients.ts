import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import useClientStore from '@/store/clients'
import { ClientProtocol } from '@/@types/client'

export default class ClientService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createClient(data: FormData) {
    const store = useClientStore()

    return await this.httpConfig
      .post('/cliente', data)
      .then((response) => {
        store.setClients([...store.clients, response.data.data])
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getClients() {
    const store = useClientStore()

    return await this.httpConfig
      .get('/cliente')
      .then((response) => {
        store.setClients(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getClient(id: string) {
    return await this.httpConfig
      .get('/cliente/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deleteClient(data: ClientProtocol) {
    const store = useClientStore()

    await this.httpConfig
      .delete('/cliente/' + data.id)
      .then((response) => {
        store.deleteClient(data.id ?? '')
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updateClient(data: FormData, id: string) {
    const store = useClientStore()
    await this.httpConfig
      .put('/cliente/' + id, data)
      .then((response) => {
        store.updateClient(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
