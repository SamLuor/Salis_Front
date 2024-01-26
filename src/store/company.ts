import { defineStore } from 'pinia'
import { indexingBy } from '@/utils/transformData'
import { CompanyProtocol } from '@/@types/company'

interface CompanyState {
  companies: CompanyProtocol[]
  indexingCompanys: { [key: string]: CompanyProtocol }
}
const useCompanyStore = defineStore({
  id: 'company',
  state: (): CompanyState => {
    return {
      companies: [],
      indexingCompanys: {}
    }
  },
  getters: {
    getCompanies: (state): CompanyProtocol[] => {
      return state.companies
    },
    getCompaniesIndexing: (state) => {
      return state.indexingCompanys
    }
  },
  actions: {
    setCompanies(companies: CompanyProtocol[]) {
      this.companies = companies.map((company, index) => {
        return { ...company, index }
      })

      this.indexingCompanys = indexingBy(this.companies, 'id')
    },

    updateCompany(item: CompanyProtocol) {
      if (item.id) {
        const index = this.indexingCompanys[item.id].index
        this.companies[index!] = item
        this.indexingCompanys[index!] = { ...item, index }
      }
    },

    deleteCompany(id: string) {
      const index = this.indexingCompanys[id].index
      this.companies.splice(index!, 1)
      delete this.indexingCompanys[id]
    }
  }
})

export default useCompanyStore
