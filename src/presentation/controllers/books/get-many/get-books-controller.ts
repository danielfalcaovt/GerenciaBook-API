/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetBooks } from "../../../../domain/usecases/books/get/iget-books";
import { Controller, HttpRequest, HttpResponse } from "../../login/login-protocols";

export class GetBooksController implements Controller {
  constructor(private readonly getBooks: IGetBooks) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.getBooks.get()
    return new Promise(resolve => resolve({statusCode:200}))
  }
}