import { Address } from './addresses'
import { Contact } from './contacts'

export interface ClientProtocol {
  index?: number
  id?: string
  razao_social: string
  nome_fantasia: string
  sigla: string
  cnpj: string
  email: string
  enderecos: Address[]
  telefones: Contact[]
  empresas: string[]
}

export interface Telefone {
  ddd: number | null
  numero: string | undefined
  pessoa: string
}

export interface Endereco {
  cep: string
  logradouro: string
  bairro: string
  numero: number | null
  complemento: string
}
