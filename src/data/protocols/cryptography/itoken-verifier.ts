export interface ITokenVerifier {
  verify(token: string): Promise<string | null>
}