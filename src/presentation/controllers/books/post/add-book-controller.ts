/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDbAddBook } from "../../../../domain/usecases/books/post/idb-add-book";
import { badRequest, Controller, HttpRequest, HttpResponse, IValidation, ok, serverError } from "../books-protocols";

export class AddBookController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly addBook: IDbAddBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return new Promise(resolve => resolve(badRequest(error)))
      }
      const book = await this.addBook.add(httpRequest.body)
      return new Promise(resolve => resolve(ok(book)))
    } catch (err) {
      return new Promise(resolve => resolve(serverError()))
    }
  }
}