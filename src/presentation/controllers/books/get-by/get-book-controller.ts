import { IGetBook } from "../../../../domain/usecases/books/get/iget-by-books";
import { Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class GetBookController implements Controller {
  constructor(private readonly validation: IValidation, private readonly GetBook: IGetBook) {}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(ok({})))
  }
}