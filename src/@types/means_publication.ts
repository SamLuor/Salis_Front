import { CompanyProtocol } from './company'

export interface MeansPublicationProtocol {
  index?: number
  id?: string
  nome: string
  empresas: string[] | CompanyProtocol[]
}

export interface MeansPublicationData {
  index?: number
  id?: string
  nome: string
  empresas: CompanyProtocol[]
}
