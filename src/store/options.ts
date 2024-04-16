import { defineStore } from 'pinia'

interface Options {
  value: string
  text: string
}

interface State {
  empresa: Options[]
  cargos: Options[]
  permissoes: Options[]
  usuarios: Options[]
  clientes: Options[]
  meios_publicacao: Options[]
  tipos_processo: Options[]
  modalidades_processo: Options[]
  regimes_contratacao: Options[]
  portal_compras: Options[]
  unidades_medidas: Options[]
  setores_produtos: Options[]
  subseguintes_comerciais: Options[]
  tipos_execucao: Options[]
  modos_disputa: Options[]
  criterios_julgamento: Options[]
}

const useOptionsStore = defineStore({
  id: 'options',
  state: (): State => {
    return {
      empresa: [],
      cargos: [],
      permissoes: [],
      usuarios: [],
      clientes: [],
      meios_publicacao: [],
      tipos_processo: [],
      modalidades_processo: [],
      regimes_contratacao: [],
      portal_compras: [],
      unidades_medidas: [],
      setores_produtos: [],
      subseguintes_comerciais: [],
      tipos_execucao: [],
      modos_disputa: [],
      criterios_julgamento: []
    }
  },
  getters: {
    getCompanies: (state): Options[] => {
      return state.empresa
    },
    getPositions: (state): Options[] => {
      return state.cargos
    },
    getPermissions: (state): Options[] => {
      return state.permissoes
    },
    getUsers: (state): Options[] => {
      return state.usuarios
    },
    getClients: (state): Options[] => {
      return state.clientes
    },
    getMeansPublication: (state): Options[] => {
      return state.meios_publicacao
    },
    getTypesProcess: (state): Options[] => {
      return state.tipos_processo
    },
    getModalitiesProcess: (state): Options[] => {
      return state.modalidades_processo
    },
    getRegimeContract: (state): Options[] => {
      return state.regimes_contratacao
    },
    getPortalShopping: (state): Options[] => {
      return state.portal_compras
    },
    getUnitMeasure: (state): Options[] => {
      return state.unidades_medidas
    },
    getProductSectors: (state): Options[] => {
      return state.setores_produtos
    },
    getSubsequentCommercials: (state): Options[] => {
      return state.subseguintes_comerciais
    },
    getExecutionTypes: (state): Options[] => {
      return state.tipos_execucao
    },
    getDisputeModes: (state): Options[] => {
      return state.modos_disputa
    },
    getJudgingCriteria: (state): Options[] => {
      return state.criterios_julgamento
    }
  },
  actions: {
    setCompanies(empresas: Options[]) {
      this.empresa = empresas
    },
    setPositions(cargos: Options[]) {
      this.cargos = cargos
    },
    setPermissions(permissoes: Options[]) {
      this.permissoes = permissoes
    },
    setUsers(usuarios: Options[]) {
      this.usuarios = usuarios
    },
    setClients(clientes: Options[]) {
      this.clientes = clientes
    },
    setMeansPublication(meiosPublicacao: Options[]) {
      this.meios_publicacao = meiosPublicacao
    },
    setTypesProcess(tiposProcesso: Options[]) {
      this.tipos_processo = tiposProcesso
    },
    setModalitiesProcess(modalidadesProcesso: Options[]) {
      this.modalidades_processo = modalidadesProcesso
    },
    setRegimeContract(regimeContratacao: Options[]) {
      this.regimes_contratacao = regimeContratacao
    },
    setPortalShopping(portalCompras: Options[]) {
      this.portal_compras = portalCompras
    },
    setUnitMeasure(unidadesMedidas: Options[]) {
      this.unidades_medidas = unidadesMedidas
    },
    setProductSectors(setoresProdutos: Options[]) {
      this.setores_produtos = setoresProdutos
    },
    setSubsequentCommercials(subseguintesComerciais: Options[]) {
      this.subseguintes_comerciais = subseguintesComerciais
    },
    setExecutionTypes(tiposExecucao: Options[]) {
      this.tipos_execucao = tiposExecucao
    },
    setDisputeModes(modosDisputa: Options[]) {
      this.modos_disputa = modosDisputa
    },
    setJudgingCriteria(criteriosJulgamento: Options[]) {
      this.criterios_julgamento = criteriosJulgamento
    }
  }
})

export default useOptionsStore
