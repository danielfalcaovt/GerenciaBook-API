/* eslint-disable @typescript-eslint/no-unused-vars */
import { badRequest, ok, serverError,Controller, HttpRequest, HttpResponse, IValidation, InvalidParamError, unauthorized } from './signup-protocols'
import { IAddAccount } from '../../../domain/usecases/user-db/add-account'
import { ILoadByEmail } from '../../../data/protocols/db/users/iload-by-email'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly addAccount: IAddAccount,
    private readonly loadByEmail: ILoadByEmail
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return new Promise((resolve) => resolve(badRequest(error)))
      }

      const { confirmPassword, ...account } = httpRequest.body

      const alreadyExist = await this.loadByEmail.load(account.email)
      if (alreadyExist) {
        return badRequest(new InvalidParamError('email'))
      }

      const addedAccount = await this.addAccount.add(account)
      return ok(addedAccount)
    } catch (err) {
      console.error(err)
      return serverError()
    }
  }
}
