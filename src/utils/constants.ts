import { ProductItemPayload } from '@/@types/products'
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
  items: []
}

export const ProductItem: ProductItemPayload = {
  produto_nome: '',
  produto_id: '',
  descricao_simplificada: '',
  descricao_completa: '',
  unidade_medida_id: ''
}
