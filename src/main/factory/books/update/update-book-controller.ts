import { DbUpdateBook } from '../../../../data/usecases/books/update/db-update-book'
import { BooksRepository } from '../../../../infra/db/postgres/books/books-repository'
import { UpdateBookController } from '../../../../presentation/controllers/books/update/update-book-controller'
import { makeUpdateBookValidation } from './update-book-validations'

export const makeUpdateController = (): UpdateBookController => {
  const dbUpdateBook = new DbUpdateBook(new BooksRepository())
  return new UpdateBookController(makeUpdateBookValidation(), dbUpdateBook)
}