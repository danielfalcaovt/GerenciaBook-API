import { Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class DeleteBookController implements Controller {
  constructor(private readonly validation: IValidation) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(ok({})))
  }
}