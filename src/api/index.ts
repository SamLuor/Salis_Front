import { httpConfig } from '@/api/axiosInstance'
import AuthService from './auth'
import SecureDataProcessor from '@/utils/SecureDataProcessor'
import router from '@/router'
import UserService from './user'
import OptionService from './options'
import CompanyService from './company'
import { useAuthStore } from '@/store/auth'
import { UserMe } from '@/@types/auth'
import PositionService from './position'
import ClientService from './clients'
import MeansPublicationService from './means_publication'
import PublicationService from './publication'
import EditalService from './edital'
import ProductService from './product'
import TermReferenceService from './term_reference'
import SetorProdutoService from './setor_produto'

httpConfig.interceptors.request.use((config) => {
  const dataProcessor = SecureDataProcessor.dataProcessor
  const storedToken = localStorage.getItem('@salis:token')
  const decryptToken = storedToken ? dataProcessor.decrypt(storedToken) : null

  if (decryptToken) {
    config.headers.Authorization = `Bearer ${decryptToken}`
  }
  return config
})

httpConfig.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      const { setUser, setToken } = authStore
      localStorage.removeItem('@salis:token')
      localStorage.removeItem('@salis:user')
      setToken(null)
      setUser({} as UserMe)

      router.push({ name: 'login' })
    }

    return Promise.reject(error)
  }
)

export default {
  Auth: new AuthService(httpConfig),
  User: new UserService(httpConfig),
  Option: new OptionService(httpConfig),
  Company: new CompanyService(httpConfig),
  Position: new PositionService(httpConfig),
  Clients: new ClientService(httpConfig),
  MeansPublication: new MeansPublicationService(httpConfig),
  Publication: new PublicationService(httpConfig),
  Edital: new EditalService(httpConfig),
  Products: new ProductService(httpConfig),
  TermReference: new TermReferenceService(httpConfig),
  SetorProduct: new SetorProdutoService(httpConfig),
  httpConfig
}
