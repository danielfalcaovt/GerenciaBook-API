 
import { IBook } from "../../../../domain/protocols/book";
import { IAddBookModel, IDbAddBook } from "../../../../domain/usecases/books/post/idb-add-book";
import { IDbAddBookRepository } from "../../../protocols/db/books/idb-add-books-repository";

export class DbAddBook implements IDbAddBook {
  constructor(private readonly dbAddBookRepository: IDbAddBookRepository) {}

  async add(book: IAddBookModel): Promise<IBook> {
    const request = book
    if (book.lend_day) {
      request.lend_day = String(new Date(book.lend_day + 'T10:20:20.200Z').getTime())
    }
    const insertedBook = await this.dbAddBookRepository.add(request)
    return new Promise(resolve => resolve(insertedBook))
  }
}