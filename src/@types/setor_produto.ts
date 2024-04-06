export interface SetorProduto {
  index?: number
  id: string
  nome: string
  empresas: Array<{
    id: string
    razao_social: string
    nome_fantasia: string
    sigla: string
    cnpj: string
    email: string
    logo_img_path: any
    frase: string
  }>
}
