import { ZodIssue } from 'zod'
import { GenericResponse } from './generics'

export interface ErrorsUnitMeasure {
  nome?: ZodIssue
  tipo?: ZodIssue
  empresas?: ZodIssue
}

export interface UnitMeasure {
  id?: string
  nome: string
  tipo: 'servico' | 'material'
  empresas: string[]
}

export type ResponseCreateUnitMeasure = GenericResponse<UnitMeasure>

export type ResponseGetUnitsMeasures = GenericResponse<UnitMeasure[]>

export interface UnitMeasureServices {
  createUnitMeasure(data: UnitMeasure): Promise<ResponseCreateUnitMeasure>
  getUnitsMeasure(): Promise<ResponseGetUnitsMeasures>
}
