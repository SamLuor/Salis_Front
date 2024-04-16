import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import useOptionsStore from '@/store/options'

export default class OptionService {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async getCompanies() {
    const store = useOptionsStore()

    if (store.empresa.length)
      return { data: store.empresa, option: 'companies' }

    return await this.httpConfig
      .get('/option/empresas')
      .then((response) => {
        store.setCompanies(response.data.data)
        return { ...response.data, option: 'companies' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPosition() {
    const store = useOptionsStore()

    if (store.cargos.length) return { data: store.cargos, option: 'positions' }

    return await this.httpConfig
      .get('/option/cargos')
      .then((response) => {
        store.setPositions(response.data.data)

        return { ...response.data, option: 'positions' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPermitions() {
    const store = useOptionsStore()

    if (store.permissoes.length)
      return { data: store.permissoes, option: 'permitions' }

    return await this.httpConfig
      .get('/option/permissoes')
      .then((response) => {
        store.setPermissions(response.data.data)

        return { ...response.data, option: 'permitions' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getUsers() {
    const store = useOptionsStore()

    if (store.usuarios.length) return { data: store.usuarios, option: 'users' }

    return await this.httpConfig
      .get('/option/usuarios')
      .then((response) => {
        store.setUsers(response.data.data)

        return { ...response.data, option: 'users' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getClients() {
    const store = useOptionsStore()

    if (store.clientes.length)
      return { data: store.clientes, option: 'clients' }

    return await this.httpConfig
      .get('/option/clientes')
      .then((response) => {
        store.setClients(response.data.data)

        return { ...response.data, option: 'clients' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPublicationMeans() {
    const store = useOptionsStore()

    if (store.meios_publicacao.length)
      return { data: store.meios_publicacao, option: 'publicationMeans' }

    return await this.httpConfig
      .get('/option/meio-publicacoes')
      .then((response) => {
        store.setMeansPublication(response.data.data)

        return { ...response.data, option: 'publicationMeans' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getProcessTypes() {
    const store = useOptionsStore()

    if (store.tipos_processo.length)
      return { data: store.tipos_processo, option: 'processTypes' }

    return await this.httpConfig
      .get('/option/tipo-processos')
      .then((response) => {
        store.setTypesProcess(response.data.data)

        return { ...response.data, option: 'processTypes' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getProcessModality() {
    const store = useOptionsStore()

    if (store.modalidades_processo.length)
      return { data: store.modalidades_processo, option: 'processModality' }

    return await this.httpConfig
      .get('/option/modalidade-processos')
      .then((response) => {
        store.setModalitiesProcess(response.data.data)

        return { ...response.data, option: 'processModality' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getHiringRegime() {
    const store = useOptionsStore()

    if (store.regimes_contratacao.length)
      return { data: store.regimes_contratacao, option: 'contractRegimes' }

    return await this.httpConfig
      .get('/option/regime-contratacoes')
      .then((response) => {
        store.setRegimeContract(response.data.data)

        return { ...response.data, option: 'contractRegimes' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getPurchasingPortal() {
    const store = useOptionsStore()

    if (store.portal_compras.length)
      return { data: store.portal_compras, option: 'purchasingPortals' }

    return await this.httpConfig
      .get('/option/portal-compras')
      .then((response) => {
        store.setPortalShopping(response.data.data)

        return { ...response.data, option: 'purchasingPortals' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getExecutionTypes() {
    const store = useOptionsStore()

    if (store.tipos_execucao.length)
      return { data: store.tipos_execucao, option: 'executionTypes' }

    return await this.httpConfig
      .get('/option/tipo-execucoes')
      .then((response) => {
        store.setExecutionTypes(response.data.data)

        return { ...response.data, option: 'executionTypes' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getContestModes() {
    const store = useOptionsStore()

    if (store.modos_disputa.length)
      return { data: store.modos_disputa, option: 'disputeModes' }

    return await this.httpConfig
      .get('/option/modo-disputas')
      .then((response) => {
        store.setDisputeModes(response.data.data)

        return { ...response.data, option: 'disputeModes' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getJudgingCriteria() {
    const store = useOptionsStore()

    if (store.criterios_julgamento.length)
      return { data: store.criterios_julgamento, option: 'judgmentCriteria' }

    return await this.httpConfig
      .get('/option/criterio-julgamentos')
      .then((response) => {
        store.setJudgingCriteria(response.data.data)

        return { ...response.data, option: 'judgmentCriteria' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getUnitMeasure(type: 'servico' | 'material') {
    const store = useOptionsStore()

    if (store.unidades_medidas.length)
      return { data: store.unidades_medidas, option: 'unitMeasure' }

    return await this.httpConfig
      .get('/option/unidade-medidas', { params: { tipo: type } })
      .then((response) => {
        store.setUnitMeasure(response.data.data)

        return { ...response.data, option: 'unitMeasure' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getSetorProduto() {
    const store = useOptionsStore()

    if (store.setores_produtos.length)
      return { data: store.setores_produtos, option: 'setorProduto' }

    return await this.httpConfig
      .get('/option/setor-produtos')
      .then((response) => {
        store.setProductSectors(response.data.data)

        return { ...response.data, option: 'setorProduto' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getSubSeguinteComercial() {
    const store = useOptionsStore()

    if (store.subseguintes_comerciais.length)
      return {
        data: store.subseguintes_comerciais,
        option: 'subSeguinteComercial'
      }

    return await this.httpConfig
      .get('/option/subseguinte-comerciais')
      .then((response) => {
        store.setSubsequentCommercials(response.data.data)

        return { ...response.data, option: 'subSeguinteComercial' }
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
