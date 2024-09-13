import { IAuthentication } from "../../../domain/usecases/user-db/authentication";
import { Controller, HttpRequest, HttpResponse, IValidation, badRequest, ok, serverError, unauthorized, } from './admin-login-protocols'

export class AdminLoginController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return new Promise(resolve => resolve(badRequest(error)))
      }
      const user = httpRequest.body
      const token = await this.authentication.auth(user)
      if (!token) {
        return new Promise(resolve => resolve(unauthorized()))
      }
      return new Promise(resolve => resolve(ok(token)))
    } catch (err) {
      console.error(err)
      return serverError()
    }
  }
}