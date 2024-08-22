import { IDbDeleteBook } from "../../../../domain/usecases/books/delete/idb-delete-book";
import { badRequest, Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class DeleteBookController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly deleteBook: IDbDeleteBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return new Promise(resolve => resolve(badRequest(error)))
    }
    await this.deleteBook.delete(httpRequest.body)
    return new Promise(resolve => resolve(ok({})))
  }
}