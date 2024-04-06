interface BaseItem {
  produto_item_id: string | null
  numero: number | null
  descricao_simplificada: string
  descricao_completa: string
  unidade_medida: string
  quantidade: number | null
}

interface Group {
  grupo: number | null
  items: BaseItem[]
}

export type { Group, BaseItem }
