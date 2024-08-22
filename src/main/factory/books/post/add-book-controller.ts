import { DbAddBook } from "../../../../data/usecases/books/post/db-add-book"
import { BooksRepository } from "../../../../infra/db/postgres/books/books-repository"
import { AddBookController } from "../../../../presentation/controllers/books/post/add-book-controller"
import { makeAddBookValidation } from "./add-book-validation"

export const makeAddBookController = (): AddBookController => {
  const addBook = new DbAddBook(new BooksRepository())
  const addBookController = new AddBookController(makeAddBookValidation(), addBook)
  return addBookController
}