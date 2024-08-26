/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDbAddBookRepository } from "../../../../data/protocols/db/books/idb-add-books-repository";
import { IDbDeleteBookRepository } from "../../../../data/protocols/db/books/idb-delete-books-repository";
import { IDbGetBookRepository } from "../../../../data/protocols/db/books/idb-get-books-repository";
import { IDbGetByBookRepository } from "../../../../data/protocols/db/books/idb-get-by-books";
import { IDbUpdateBookRepository } from "../../../../data/protocols/db/books/idb-update-books-repository";
import { IBook } from "../../../../domain/protocols/book";
import { IGetBookModel } from "../../../../domain/usecases/books/get/iget-by-books";
import { IAddBookModel } from "../../../../domain/usecases/books/post/idb-add-book";
import { IUpdateBookModel } from "../../../../domain/usecases/books/update/iupdate-by-books";
import { PgHelper } from "../helpers/pg-helper";

export class BooksRepository implements IDbGetBookRepository, IDbGetByBookRepository, IDbAddBookRepository, IDbDeleteBookRepository, IDbUpdateBookRepository {
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

  async add(book: IAddBookModel): Promise<IBook> {
    const insertedBook = await PgHelper.query('INSERT INTO books(book_name, student_name, lend_day, student_class) VALUES($1, $2, $3, $4) RETURNING *', [book.book_name, book.student_name, book.lend_day, book.student_class])
    if (insertedBook.rows.length > 0) {
      return new Promise(resolve => resolve(insertedBook.rows[0]))
    } else {
      throw new Error()
    }
  }

  async delete(bookId: string): Promise<number> {
    const queryResult = await PgHelper.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId])
    if (queryResult.rows.length > 0) {
      return new Promise(resolve => resolve(queryResult.rows.length))
    } else {
      return new Promise(resolve => resolve(0))
    }
  }

  async update(book: IUpdateBookModel): Promise<IBook[]> {
    let query = "UPDATE books SET"
    const queryValues: any[] = []
    let queryParams = 1
    if (book.book_name) {
      queryValues.push(book.book_name)
      query += ` book_name = $${queryParams}`
      queryParams++
    }

    if (book.student_name) {
      queryValues.push(book.student_name)
      query += queryParams > 1 ? ', ' : ''
      query += ` student_name = $${queryParams}`
      queryParams++
    }

    if (book.student_class) {
      queryValues.push(book.student_class)
      query += queryParams > 1 ? ',' : ''
      query += ` student_class = $${queryParams}`
      queryParams++
    }

    if (book.lend_day) {
      queryValues.push(book.lend_day)
      query += queryParams > 1 ? ', ' : ''
      query += ` lend_day = $${queryParams}`
      queryParams++
    }
    
    query += ` WHERE id = $${queryParams}`
    queryValues.push(book.id)
    console.log(query)
    await PgHelper.query(query, queryValues)
    return Promise.resolve([])
  }
}