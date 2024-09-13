import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/user-db/authentication'
import { IComparer } from '../../protocols/cryptography/icomparer'
import { ITokenGenerator } from '../../protocols/cryptography/itoken-generator'
import { ILoadByEmail } from '../../protocols/db/users/iload-by-email'

export class DbAdminAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmail: ILoadByEmail,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly hashComparer: IComparer
  ) {}
  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmail.load(authentication.email)
    if (!account) {
      return new Promise((resolve) => resolve(null))
    }
    const result = await this.hashComparer.compare(
      authentication.password,
      account.password
    )
    if (!result) {
      return new Promise((resolve) => resolve(null))
    }
    const accessToken = await this.tokenGenerator.generate(account.id)
    if (!accessToken) {
      return new Promise((resolve) => resolve(null))
    }
    return new Promise((resolve) => resolve(accessToken))
  }
}