import { ZodIssue } from 'zod'
import { ProductItemProtocol } from './products'
import { GenericResponse } from './generics'

interface ErrorsItem {
  grupo?: ZodIssue
  produto_item_id?: ZodIssue
  quantidade?: ZodIssue
  numero?: ZodIssue
}

interface BaseItem {
  produto_item_id: string | null
  numero: number | null
  descricao_simplificada: string
  descricao_completa: string
  unidade_medida: string
  quantidade: number | null
  termo_referencia_id?: string
}

interface Group extends BaseItem {
  grupo: number | null
}

interface ItemProductTermReference {
  id: string
  numero: string
  quantidade: number
  valor: number
  produto_item_id: string
  termo_referencia_id: null | string
  grupo_id: null | string
  produto_item: ProductItemProtocol
}

interface ItemGroupProductTermReference {
  id: string
  numero: string
  termo_referencia_id: string
  itens: ItemProductTermReference[]
}

interface SubseguinteComercial {
  id: string
  nome: string
}

interface SetorProdutos {
  id: string
  nome: string
}

interface Process {
  id: string
  codigo: string
  tipo_processo_id: string
}

export interface TermReferenceProtocol {
  id: string
  nome: any
  caminho_arquivo: string
  validade_proposta: string
  prazo_entrega: string
  prazo_garantia_produto: string
  validade_assinatura_arp: number
  validade_publicacao_arp: number
  processo_id: string
  processo: Process
  setor_produtos: SetorProdutos[]
  subseguinte_comerciais: SubseguinteComercial[]
  grupos: ItemGroupProductTermReference[]
  itens: ItemProductTermReference[]
}

export type GetResponseTermReference = GenericResponse<TermReferenceProtocol>

export type { Group, BaseItem, ErrorsItem }
