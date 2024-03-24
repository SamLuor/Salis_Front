export interface GenericResponse {
  data: any
  message: string
}

export interface FieldObject {
  code: string
  expected: string
  message: string
  path: string[]
  received: string
}
