/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDbBooksRepository } from "../../../../data/protocols/db/books/idb-get-books-repository";
import { IDbGetByBook } from "../../../../data/protocols/db/books/idb-get-by-books";
import { IBook } from "../../../../domain/protocols/book";
import { IGetBookModel } from "../../../../domain/usecases/books/get/iget-by-books";
import { PgHelper } from "../helpers/pg-helper";

export class BooksRepository implements IDbBooksRepository, IDbGetByBook {
  async get(): Promise<IBook[]> {
    const result = await PgHelper.query('SELECT * FROM books')
    if (result.rows.length > 0) {
      return new Promise(resolve => resolve(result.rows))
    } else {
      return new Promise(resolve => resolve([]))
    }
  }

  async getBy(data: IGetBookModel): Promise<IBook[]> {
    // ORDEM DA QUERY DE ACORDO COM A INTERFACE RECEPTADA
    let query = "SELECT * FROM books WHERE"
    const queryValues: any[] = []
    let queryParams = 1
    if (data.book_name) {
      queryValues.push(data.book_name)
      query += ` book_name = $${queryParams}`
      queryParams++
    }

    if (data.student_name) {
      queryValues.push(data.student_name)
      query += queryParams > 1 ? ' AND' : ''
      query += ` student_name = $${queryParams}`
      queryParams++
    }

    if (data.student_class) {
      queryValues.push(data.student_class)
      query += queryParams > 1 ? ' AND' : ''
      query += ` student_class = $${queryParams}`
      queryParams++
    }

    if (data.lend_day) {
      queryValues.push(data.lend_day)
      query += queryParams > 1 ? ' AND' : ''
      query += ` lend_day = $${queryParams}`
      queryParams++
    }


    const queryResult = await PgHelper.query(query, queryValues)
    if (queryResult.rows.length === 0) {
      return new Promise(resolve => resolve([]))
    }

    return new Promise(resolve => resolve(queryResult.rows))
  }
}