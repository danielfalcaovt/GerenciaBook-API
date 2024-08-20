/* eslint-disable @typescript-eslint/no-unused-vars */
import { IGetBook } from '../../../../domain/usecases/books/get/iget-by-books'
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  IValidation,
  ok,
  serverError
} from '../books-protocols'

export class GetBookController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly GetBook: IGetBook
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return new Promise(resolve => resolve(badRequest(error)))
      }
      const result = await this.GetBook.get(httpRequest.body)
      return new Promise(resolve => resolve(ok(result)))
    } catch (err) {
      return serverError()
    }
  }
}
