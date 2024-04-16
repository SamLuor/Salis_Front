import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import useCompanyStore from '@/store/company'
import { CompanyProtocol } from '@/@types/company'

export default class CompanyService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createCompany(data: FormData) {
    const store = useCompanyStore()

    return await this.httpConfig
      .post('/empresa', data)
      .then((response) => {
        store.setCompanies([...store.companies, response.data.data])
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getCompanies() {
    const store = useCompanyStore()

    return await this.httpConfig
      .get('/empresa')
      .then((response) => {
        store.setCompanies(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getCompany(id: string) {
    return await this.httpConfig
      .get('/empresa/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deleteCompany(data: CompanyProtocol) {
    const store = useCompanyStore()

    await this.httpConfig
      .delete('/empresa/' + data.id)
      .then((response) => {
        store.deleteCompany(data?.id ?? '')
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updateCompany(data: FormData, id: string) {
    const store = useCompanyStore()
    data.append('_method', 'PUT')
    await this.httpConfig
      .postForm('/empresa/' + id, data)
      .then((response) => {
        store.updateCompany(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
