import { badRequest, Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class DeleteBookController implements Controller {
  constructor(private readonly validation: IValidation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return new Promise(resolve => resolve(badRequest(error)))
    }
    return new Promise(resolve => resolve(ok({})))
  }
}