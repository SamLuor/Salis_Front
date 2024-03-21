import { handleError } from '@/utils/handleErrors'
import { AxiosInstance } from 'axios'

export default class EditalService {
  constructor(private readonly httpClient: AxiosInstance) {}

  async create(data: FormData) {
    return await this.httpClient
      .postForm('/processo/edital', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async update(data: FormData, id: string) {
    return await this.httpClient
      .patchForm('/processo/edital/' + id, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
