export interface ClientProtocol {
  index?: number
  id?: string
  razao_social: string
  nome_fantasia: string
  sigla: string
  cnpj: string
  email: string
  enderecos: Endereco[]
  telefones: Telefone[]
  empresas: string[]
}

export interface Telefone {
  ddd: string
  numero: string
  pessoa: string
}

export interface Endereco {
  cep: string
  logradouro: string
  bairro: string
  numero: number | null
  complemento: string
}
