import { defineStore } from 'pinia'
import type {
  Edital,
  Empresa,
  Publicacoes,
  Processo,
  Termo_Referencia
} from '@/@types/process'

interface ProcessState {
  process: Processo
  edital: Edital
  company: Empresa
  publications: Publicacoes
  term_reference: Termo_Referencia
}

const useProcessStore = defineStore({
  id: 'process',
  state: (): ProcessState => {
    return {
      process: {} as Processo,
      company: {} as Empresa,
      edital: {} as Edital,
      publications: [] as Publicacoes,
      term_reference: {} as Termo_Referencia
    }
  },
  getters: {
    getProcess: (state): Processo => {
      return state.process
    }
  },
  actions: {
    setProcess(process: Processo) {
      this.process = process
      this.setEdital(process.edital)
      this.setCompany(process.empresa)
      this.setPublications(process.publicacoes)
      this.setTermReference(process.termo_referencia)
    },
    setEdital(edital: Edital) {
      this.edital = edital
    },
    setCompany(company: Empresa) {
      this.company = company
    },
    setPublications(publications: Publicacoes) {
      this.publications = publications
    },
    setTermReference(term_reference: Termo_Referencia) {
      const data = {
        id: term_reference.id,
        arquivo: term_reference.caminho_arquivo,
        caminho_arquivo: term_reference.caminho_arquivo,
        setor_produtos: term_reference.setor_produtos,
        subseguinte_comerciais: term_reference.subseguinte_comerciais,
        validade_proposta: new Date(term_reference.validade_proposta),
        prazo_entrega: new Date(term_reference.prazo_entrega),
        prazo_garantia_produto: new Date(term_reference.prazo_garantia_produto),
        ...(term_reference.validade_publicacao_arp && {
          validade_publicacao_arp: +term_reference.validade_publicacao_arp
        }),
        itensGroups: term_reference.grupos.map((itens) => {
          const group = {
            grupo: +itens.numero,
            items: itens.itens.map((item) => ({
              numero: +item.numero,
              produto_item_id: item.produto_item_id,
              descricao_simplificada: item.produto_item.descricao_simplificada,
              descricao_completa: item.produto_item.descricao_completa,
              unidade_medida: item.produto_item.unidade_medida_id,
              quantidade: +item.quantidade
            }))
          }
          return group
        })
      }

      term_reference.itens.forEach((item) => {
        data.itensGroups.push({
          numero: +item.numero,
          produto_item_id: item.produto_item_id,
          descricao_simplificada: item.produto_item.descricao_simplificada,
          descricao_completa: item.produto_item.descricao_completa,
          unidade_medida: item.produto_item.unidade_medida_id,
          quantidade: +item.quantidade
        })
      })

      this.term_reference = data
    },
    clearStore() {
      this.edital = {} as Edital
      this.company = {} as Empresa
      this.process = {} as Processo
      this.publications = [] as Publicacoes
      this.term_reference = {} as Termo_Referencia
    }
  }
})

export default useProcessStore
