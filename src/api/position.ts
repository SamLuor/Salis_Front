import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'

export default class PositionService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createPosition(data: any) {
    return await this.httpConfig
      .post('/cargo', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPositions() {
    return await this.httpConfig
      .get('/cargo')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPosition(id: string) {
    return await this.httpConfig
      .get('/cargo/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deletePosition(data: any) {
    await this.httpConfig
      .delete('/cargo/' + data.id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updatePosition(data: any) {
    await this.httpConfig
      .patch('/cargo/' + data.id, data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
