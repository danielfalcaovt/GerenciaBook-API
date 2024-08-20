import { DbGetBook } from "../../../../data/usecases/books/get/get-by/db-get-book";
import { BooksRepository } from "../../../../infra/db/postgres/books/books-repository";
import { GetBookController } from "../../../../presentation/controllers/books/get-by/get-book-controller";
import { makeGetByValidation } from "./get-by-validations";

export const makeGetByController = (): GetBookController => {
  const booksRepository = new BooksRepository()
  const dbGetBook = new DbGetBook(booksRepository)
  const getBooksController = new GetBookController(makeGetByValidation(), dbGetBook)
  return getBooksController
}