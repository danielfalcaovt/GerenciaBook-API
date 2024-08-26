 
import { IUpdateBook } from "../../../../domain/usecases/books/update/iupdate-by-books";
import { badRequest, Controller, HttpRequest, HttpResponse, IValidation, ok, serverError } from "../books-protocols";

export class UpdateBookController implements Controller {
  constructor(
    private readonly validation: IValidation,
    private readonly updateBook: IUpdateBook
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error =this.validation.validate(httpRequest.body)
      if(error) {
        return new Promise(resolve => resolve(badRequest(error)))
      }
      const result = await this.updateBook.update(httpRequest.body)
      return new Promise(resolve => resolve(ok(result)))
    } catch (err) {
      console.log(err)
      return serverError()
    }
  }
}