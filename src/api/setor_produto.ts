import { handleError } from '@/utils/handleErrors'

import type { PublicationProtocol } from '@/@types/publication'
import type { AxiosInstance } from 'axios'
import useSetorProdutoStore from '@/store/setor_produto'
import { SetorProduto } from '@/@types/setor_produto'

export default class SetorProdutoService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createSetorProduto(data: any) {
    const store = useSetorProdutoStore()
    return await this.httpConfig
      .post('/setor-produto', data)
      .then((response) => {
        store.setSetorProdutos([...store.setorProdutos, response.data.data])

        return response
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getSetorProdutos() {
    const store = useSetorProdutoStore()

    return await this.httpConfig
      .get('/setor-produto')
      .then((response) => {
        store.setSetorProdutos(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getSetorProduto(id: string) {
    const store = useSetorProdutoStore()
    return await this.httpConfig
      .get('setor-produto/' + id)
      .then((response) => {
        store.setSetorProduto(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deleteSetorProduto(data: SetorProduto) {
    const store = useSetorProdutoStore()

    await this.httpConfig
      .post('setor-produto/destroy/' + data.id)
      .then((response) => {
        store.deleteSetorProduto(data?.id ?? '')
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updateSetorProduto(data: any, id: string) {
    const store = useSetorProdutoStore()
    await this.httpConfig
      .patch('/setor-produto/' + id, data)
      .then((response) => {
        store.updateSetorProduto(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
