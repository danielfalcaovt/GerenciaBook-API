import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { IValidation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor(private readonly validation: IValidation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return new Promise((resolve) => resolve(badRequest(error)))
      }

      return new Promise((resolve) => resolve(badRequest(new Error())))
    } catch (err) {
      console.error(err)
      return serverError()
    }
  }
}
