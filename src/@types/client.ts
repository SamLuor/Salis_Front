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
  ddd: string | null
  numero: string | null
  pessoa: string
}

export interface Endereco {
  cep: string
  logradouro: string
  bairro: string
  numero: number | null
  complemento: string
}
