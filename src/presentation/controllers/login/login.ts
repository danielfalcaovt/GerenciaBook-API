import { IAuthentication } from "../../../domain/usecases/authentication";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";
import { IValidation } from "../../protocols/validation";

export class LoginController implements Controller {
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
      await this.authentication.auth(user)
      return new Promise(resolve => resolve(ok({})))
    } catch (err) {
      console.error(err)
      return serverError()
    }
  }
}