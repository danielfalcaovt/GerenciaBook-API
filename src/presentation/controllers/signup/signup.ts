/* eslint-disable @typescript-eslint/no-unused-vars */
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { IValidation } from '../../protocols/validation'
import { IAddAccount } from '../../../domain/usecases/add-account'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly addAccount: IAddAccount
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return new Promise((resolve) => resolve(badRequest(error)))
      }

      const { confirmPassword, ...account } = httpRequest.body

      const addedAccount = await this.addAccount.add(account)
      return ok(addedAccount)
    } catch (err) {
      console.error(err)
      return serverError()
    }
  }
}
