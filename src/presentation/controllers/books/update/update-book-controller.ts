 
import { IUpdateBook } from "../../../../domain/usecases/books/update/iupdate-by-books";
import { Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class UpdateBookController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly updateBook: IUpdateBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(ok([])))
  }
}