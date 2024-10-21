import { IBook } from "../../../../../domain/protocols/book";
import { IGetBook, IGetBookModel } from "../../../../../domain/usecases/books/get/iget-by-books";
import { IDbGetByBookRepository } from "../../../../protocols/db/books/idb-get-by-books";

export class DbGetBook implements IGetBook {
  constructor(private readonly DbGetBy: IDbGetByBookRepository) {}
  async get(book: IGetBookModel): Promise<IBook[]> {
    const request = book
    if (book.lend_day) {
      request.lend_day = String(new Date(book.lend_day).getTime())
    }
    const result = await this.DbGetBy.getBy(book)
    return new Promise(resolve => resolve(result))
  }
}