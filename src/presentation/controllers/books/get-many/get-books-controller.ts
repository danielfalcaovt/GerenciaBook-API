/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetBooks } from "../../../../domain/usecases/books/get/iget-books";
import { Controller, HttpRequest, HttpResponse, ok, serverError } from "../books-protocols";

export class GetBooksController implements Controller {
  constructor(private readonly getBooks: IGetBooks) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this.getBooks.get()
      return new Promise(resolve => resolve(ok(result)))
    } catch (err) {
      return serverError()
    }
  }
}