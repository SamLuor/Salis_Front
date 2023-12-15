export interface AuthProtocol {
  login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<{ data: { access_token: string }; message: string }>
}
