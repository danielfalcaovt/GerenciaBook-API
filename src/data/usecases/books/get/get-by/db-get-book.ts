import { IBook } from "../../../../../domain/protocols/book";
import { IGetBook, IGetBookModel } from "../../../../../domain/usecases/books/get/iget-by-books";
import { IDbGetByBook } from "../../../../protocols/db/books/idb-get-by-books";

export class DbGetBook implements IGetBook {
  constructor(private readonly DbGetBy: IDbGetByBook) {}
  async get(book: IGetBookModel): Promise<IBook[]> {
    await this.DbGetBy.getBy(book)
    return new Promise(resolve => resolve([]))
  }
}