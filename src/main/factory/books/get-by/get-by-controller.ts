/* import { BooksRepository } from "../../../../infra/db/postgres/books/books-repository";
import { GetBookController } from "../../../../presentation/controllers/books/get-by/get-book-controller";

export const makeGetByController = (): GetBookController => {
  const booksRepository = new BooksRepository()
  const DbGetBook = new DbGetBook(booksRepository)
  const getBooksController = new GetBookController(makeBooksValidation(), DbGetBook)
  return getBooksController
} */