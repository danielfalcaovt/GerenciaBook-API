export interface AuthenticationModel {
  email: string
  password: string
}

export interface IAuthentication {
  auth(authenticationModel: AuthenticationModel): Promise<string | null>
}