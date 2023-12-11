export interface AuthProtocol {
  login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<{ username: string; token: string; roles: string[] }>
}
