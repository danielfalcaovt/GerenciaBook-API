import { DbDeleteBook } from "../../../../data/usecases/books/delete/db-delete-book";
import { BooksRepository } from "../../../../infra/db/postgres/books/books-repository";
import { DeleteBookController } from "../../../../presentation/controllers/books/delete/delete-book-controller";
import { makeDeleteValidation } from "./delete-book-validation";

export const makeDeleteBookController = (): DeleteBookController => {
  const dbDeleteBook = new DbDeleteBook(new BooksRepository())
  const deleteBookController = new DeleteBookController(makeDeleteValidation(), dbDeleteBook)
  return deleteBookController
}