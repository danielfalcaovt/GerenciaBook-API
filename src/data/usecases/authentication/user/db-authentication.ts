import { AuthenticationModel, IAuthentication } from '../../../../domain/usecases/user-db/authentication'
import { IComparer } from '../../../protocols/cryptography/icomparer'
import { Encrypter } from '../../../protocols/cryptography/encrypter'
import { ILoadByEmail } from '../../../protocols/db/users/iload-by-email'

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmail: ILoadByEmail,
    private readonly tokenGenerator: Encrypter,
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
    const accessToken = await this.tokenGenerator.encrypt(account.id)
    return new Promise((resolve) => resolve(accessToken))
  }
}
