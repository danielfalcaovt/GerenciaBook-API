import { IBook } from "../../../../../domain/protocols/book";
import { IGetBook, IGetBookModel } from "../../../../../domain/usecases/books/get/iget-by-books";
import { IDbGetByBookRepository } from "../../../../protocols/db/books/idb-get-by-books";

export class DbGetBook implements IGetBook {
  constructor(private readonly DbGetBy: IDbGetByBookRepository) {}
  async get(book: IGetBookModel): Promise<IBook[]> {
    const result = await this.DbGetBy.getBy(book)
    return new Promise(resolve => resolve(result))
  }
}