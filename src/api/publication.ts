import { handleError } from '@/utils/handleErrors'
import usePublicationStore from '@/store/publication'
import useProcessStore from '@/store/process'

import type { PublicationProtocol } from '@/@types/publication'
import type { AxiosInstance } from 'axios'

export default class PublicationService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createPublication(data: FormData) {
    return await this.httpConfig
      .post('/processo/publicacao', data)
      .then((response) => {
        return response
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPublications() {
    const store = usePublicationStore()

    return await this.httpConfig
      .get('/processo')
      .then((response) => {
        store.setPublication(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPublication(id: string) {
    const store = useProcessStore()
    return await this.httpConfig
      .get('/processo/' + id)
      .then((response) => {
        store.setProcess(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deletePublication(data: PublicationProtocol) {
    const store = usePublicationStore()

    await this.httpConfig
      .post('/processo/publicacao/destroy/' + { processos: [data.id] })
      .then((response) => {
        store.deletePublication(data?.id ?? '')
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updatePublication(data: FormData, id: string) {
    const store = usePublicationStore()
    data.append('processo[id]', id)
    await this.httpConfig
      .post('processo/publicacao')
      .then((response) => {
        store.updatePublication(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
