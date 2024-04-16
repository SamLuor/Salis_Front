import { ZodIssue } from 'zod'

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

export type { Group, BaseItem, ErrorsItem }
