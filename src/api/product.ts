import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import type {
  ProductServices,
  GetProductsItemParams,
  GetProductsParams,
  ProductItemPayload,
  GetProductResponse,
  GetProductItemResponse
} from '@/@types/products'
import { GetResponseTermReference } from '@/@types/term_reference'

export default class ProductService implements ProductServices {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createProduct(data: any) {
    return await this.httpConfig
      .post('/produto', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async createProductItem(data: ProductItemPayload) {
    return await this.httpConfig
      .post('/produto-item', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getProducts(params?: GetProductsParams): Promise<GetProductResponse> {
    return await this.httpConfig
      .get('/produto', { params: { ...params } })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getProductsItem(
    params?: GetProductsItemParams
  ): Promise<GetProductItemResponse> {
    return await this.httpConfig
      .get('/produto-item', { params: { ...params } })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getListProductsItens(id: string): Promise<GetResponseTermReference> {
    return await this.httpConfig
      .get('/termo-referencia/' + id)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updateValueProductItem(id: string, value: number) {
    return await this.httpConfig
      .post(`/termo-referencia-item/${id}/update-valor`, {
        _method: 'put',
        valor: value
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deleteProductItemListed(id: string) {
    return await this.httpConfig
      .post('termo-referencia-item/destroy', { termo_referencia_itens: [id] })
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
