import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import { UnitMeasure, UnitMeasureServices } from '@/@types/unit_measure'
import useOptionsStore from '@/store/options'

export default class UnitMeasureService implements UnitMeasureServices {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createUnitMeasure(data: UnitMeasure) {
    const storeOptions = useOptionsStore()

    return await this.httpConfig
      .post('/unidade-medida', data)
      .then((response) => {
        const { id, nome } = response.data.data as UnitMeasure
        storeOptions.setUnitMeasure([
          ...storeOptions.unidades_medidas,
          { text: String(nome), value: String(id) }
        ])
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
