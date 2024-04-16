import { Address } from '@/@types/addresses'
import { Contact } from '@/@types/contacts'
import { ProductItemPayload } from '@/@types/products'
import { PublicationProcess } from '@/@types/publication'
import { BaseItem, Group } from '@/@types/term_reference'

export const newItem: BaseItem = {
  numero: null,
  descricao_simplificada: '',
  descricao_completa: '',
  unidade_medida: '',
  quantidade: null,
  produto_item_id: null
}

export const newGroup: Group = {
  grupo: null,
  produto_item_id: null,
  numero: null,
  descricao_simplificada: '',
  descricao_completa: '',
  unidade_medida: '',
  quantidade: null
}

export const ProductItem: ProductItemPayload = {
  produto_nome: '',
  produto_id: '',
  descricao_simplificada: '',
  descricao_completa: '',
  unidade_medida_id: ''
}

export const AddressInitial: Address = {
  cep: '',
  numero: '',
  bairro: '',
  logradouro: '',
  complemento: '',
  cidade: ''
}

export const ContactInitial: Contact = {
  ddd: null,
  numero: null,
  pessoa: ''
}

export const PublicationsInitial: PublicationProcess = {
  processo: {
    tipo_processo_id: ''
  },
  publicacoes: [
    {
      cliente_id: '',
      date: '',
      file: null,
      meio_publicacao_id: '',
      file_path: ''
    }
  ]
}
