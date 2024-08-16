import { DbGetBooks } from "../../../../data/usecases/books/get/db-get-books";
import { BooksRepository } from "../../../../infra/db/postgres/books/books-repository";
import { GetBooksController } from "../../../../presentation/controllers/books/get-many/get-books-controller";

export const makeGetManyBooksController = (): GetBooksController => {
  const DbGetBooksRepository = new BooksRepository()
  const dbGetBooks = new DbGetBooks(DbGetBooksRepository)
  const getBooksController = new GetBooksController(dbGetBooks)
  return getBooksController
}