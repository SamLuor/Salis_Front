import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import usePublicationStore from '@/store/publication'
import type {
  PublicationProtocol,
  UpdatePublications
} from '@/@types/publication'

export default class PublicationService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createPublication(data: FormData) {
    const store = usePublicationStore()

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
    return await this.httpConfig
      .get('/processo/' + id)
      .then((response) => {
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
      .post('/processo/publicacao/destroy' + data.id)
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
    await this.httpConfig
      .post('processo/publicacao/' + id, data)
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
