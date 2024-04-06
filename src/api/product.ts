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
}
