import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import { UnitMeasureServices } from '@/@types/unit_measure'

export default class UnitMeasureService implements UnitMeasureServices {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createUnitMeasure(data: any) {
    return await this.httpConfig
      .post('/unidade-medida', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getUnitsMeasure() {
    return await this.httpConfig
      .get('/unidade-medida')
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
