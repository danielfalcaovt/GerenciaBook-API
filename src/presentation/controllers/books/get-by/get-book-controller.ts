import { IGetBook } from "../../../../domain/usecases/books/get/iget-by-books";
import { badRequest, Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class GetBookController implements Controller {
  constructor(private readonly validation: IValidation, private readonly GetBook: IGetBook) {}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return new Promise(resolve => resolve(badRequest(error)))
    }
    return new Promise(resolve => resolve(ok({})))
  }
}