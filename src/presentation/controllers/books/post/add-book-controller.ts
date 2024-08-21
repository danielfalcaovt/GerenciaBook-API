import { IAddBook } from "../../../../domain/usecases/books/post/iadd-book";
import { Controller, HttpRequest, HttpResponse, IValidation, ok } from "../books-protocols";

export class AddBookController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly addBook: IAddBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(ok({})))
  }
}