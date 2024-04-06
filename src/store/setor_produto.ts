import { defineStore } from 'pinia'
import { indexingBy } from '@/utils/transformData'
import { SetorProduto } from '@/@types/setor_produto'

interface SetorProductState {
  setorProdutos: SetorProduto[]
  setorProduto: SetorProduto
  indexingSetorProdutos: { [key: string]: SetorProduto }
}
const useSetorProdutoStore = defineStore({
  id: 'setor-produto',
  state: (): SetorProductState => {
    return {
      setorProdutos: [],
      setorProduto: {} as SetorProduto,
      indexingSetorProdutos: {}
    }
  },
  getters: {
    getSetorProduto: (state): SetorProduto[] => {
      return state.setorProdutos
    },
    getSetorProdutoIndexing: (state) => {
      return state.indexingSetorProdutos
    }
  },
  actions: {
    setSetorProdutos(users: SetorProduto[]) {
      this.setorProdutos = users.map((user, index) => {
        return { ...user, index }
      })

      this.indexingSetorProdutos = indexingBy(this.setorProdutos, 'id')
    },

    setSetorProduto(setor: SetorProduto) {
      this.setorProduto = setor
    },
    updateSetorProduto(item: SetorProduto) {
      if (item.id) {
        const index = this.indexingSetorProdutos[item.id].index
        this.setorProdutos[index!] = item
        this.indexingSetorProdutos[index!] = { ...item, index }
      }
    },

    deleteSetorProduto(id: string) {
      const index = this.indexingSetorProdutos[id].index
      this.setorProdutos.splice(index!, 1)
      delete this.indexingSetorProdutos[id]
    }
  }
})

export default useSetorProdutoStore
