import { IAddBook } from "../../../../domain/usecases/books/post/iadd-book";
import { badRequest, Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class AddBookController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly addBook: IAddBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return new Promise(resolve => resolve(badRequest(error)))
    }
    return new Promise(resolve => resolve(ok({})))
  }
}