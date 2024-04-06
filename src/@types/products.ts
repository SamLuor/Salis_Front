import { ZodIssue } from 'zod'
import { GenericResponse } from './generics'

export interface GetProductsItemParams {
  descricao_simplificada?: string
}

export interface ProductItemProtocol {
  id: string
  descricao_simplificada: string
  descricao_completa: string
  produto_id: string
  unidade_medida_id: string
  produto: {
    id: string
    nome: string
  }
  unidade_medida: {
    id: string
    nome: string
  }
}

export interface ProductItem {
  id: string
  descricao_simplificada: string
  descricao_completa: string
  produto_id: string
  unidade_medida_id: string
  unidade_medida: {
    id: string
    nome: string
  }
}

export interface ProductProtocol {
  id: string
  nome: string
  itens: ProductItem[]
}

export type GetProductResponse = GenericResponse<ProductProtocol[]>
export type GetProductItemResponse = GenericResponse<ProductItemProtocol[]>

export interface GetProductsParams {
  nome: string
}

export interface ProductItemPayload {
  produto_nome?: string
  produto_id?: string
  descricao_simplificada: string
  descricao_completa: string
  unidade_medida_id: string
}

export interface ErrorProductItemPayload {
  nome: ZodIssue
  produto_id: ZodIssue
  descricao_simplificada: ZodIssue
  descricao_completa: ZodIssue
  unidade_medida_id: ZodIssue
}

export interface ProductServices {
  createProduct(data: any): Promise<any>
  createProductItem(data: any): Promise<any>
  getProducts(params: GetProductsParams): Promise<GetProductResponse>
  getProductsItem(
    params: GetProductsItemParams
  ): Promise<GetProductItemResponse>
}
