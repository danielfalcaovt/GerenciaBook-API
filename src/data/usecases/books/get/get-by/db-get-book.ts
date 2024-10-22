import { IBook } from "../../../../../domain/protocols/book";
import { IGetBook, IGetBookModel } from "../../../../../domain/usecases/books/get/iget-by-books";
import { IDbGetByBookRepository } from "../../../../protocols/db/books/idb-get-by-books";

export class DbGetBook implements IGetBook {
  constructor(private readonly DbGetBy: IDbGetByBookRepository) {}
  async get(book: IGetBookModel): Promise<IBook[]> {
    const request = book
    if (book.lend_day) {
      request.lend_day = String(new Date(book.lend_day + 'T10:20:20.200Z').getTime())
    }
    const result = await this.DbGetBy.getBy(request)
    console.log(result)
    return new Promise(resolve => resolve(result))
  }
}