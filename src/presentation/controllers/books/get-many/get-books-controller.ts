/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetBooks } from "../../../../domain/usecases/books/get/iget-books";
import { Controller, HttpRequest, HttpResponse, ok } from "../books-protocols";

export class GetBooksController implements Controller {
  constructor(private readonly getBooks: IGetBooks) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this.getBooks.get()
    return new Promise(resolve => resolve(ok(result)))
  }
}