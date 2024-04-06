export interface GenericResponse<T> {
  data: T
  message: string
}

export interface FieldObject {
  code: string
  expected: string
  message: string
  path: string[]
  received: string
}
