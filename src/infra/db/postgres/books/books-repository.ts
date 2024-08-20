import { IDbBooksRepository } from "../../../../data/protocols/db/books/idb-get-books-repository";
import { IBook } from "../../../../domain/protocols/book";
import { PgHelper } from "../helpers/pg-helper";

export class BooksRepository implements IDbBooksRepository {
  async get(): Promise<IBook[]> {
    const result = await PgHelper.query('SELECT * FROM books')
    if (result.rows.length > 0) {
      return new Promise(resolve => resolve(result.rows))
    } else {
      return new Promise(resolve => resolve([]))
    }
  }
}