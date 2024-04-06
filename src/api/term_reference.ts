import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import useProcessStore from '@/store/process'

export default class TermReferenceService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createTermReference(data: FormData, id: string) {
    const store = useProcessStore()
    return await this.httpConfig
      .postForm('/processo/termo-referencia/' + id, data)
      .then((response) => {
        store.setTermReference(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updateTermReference(data: FormData, id: string, id_term: string) {
    const store = useProcessStore()

    data.append('id', id_term)
    return await this.httpConfig
      .postForm('/processo/termo-referencia/' + id, data)
      .then((response) => {
        store.setTermReference(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
