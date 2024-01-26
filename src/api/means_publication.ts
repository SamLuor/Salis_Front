import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import { MeansPublicationProtocol } from '@/@types/means_publication'
import useMeansPublicationStore from '@/store/means_publication'

export default class MeansPublicationService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createMeansPublication(data: MeansPublicationProtocol) {
    const store = useMeansPublicationStore()

    return await this.httpConfig
      .post('/meio-publicacao', data)
      .then((response) => {
        store.setMeans([...store.means, response.data.data])
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getMeansPublications() {
    const store = useMeansPublicationStore()

    return await this.httpConfig
      .get('/meio-publicacao')
      .then((response) => {
        store.setMeans(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getMeanPublication(id: string) {
    return await this.httpConfig
      .get('/meio-publicacao/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deleteMeansPublication(data: MeansPublicationProtocol) {
    const store = useMeansPublicationStore()

    await this.httpConfig
      .post('/meio-publicacao/delete', { meio_publicacoes: [data.id] })
      .then((response) => {
        store.deleteMean(data.id ?? '')
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updateMeansPublication(data: MeansPublicationProtocol, id: string) {
    const store = useMeansPublicationStore()
    await this.httpConfig
      .put('/meio-publicacao/' + id, data)
      .then((response) => {
        store.updateMean(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
