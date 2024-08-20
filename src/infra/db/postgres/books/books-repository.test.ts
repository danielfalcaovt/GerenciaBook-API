/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBook } from '../../../../domain/protocols/book'
import { IGetBookModel } from '../../../../domain/usecases/books/get/iget-by-books'
import { PgHelper } from '../helpers/pg-helper'
import { BooksRepository } from './books-repository'

const fakeLendDay = new Date()

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  lend_day: fakeLendDay,
  student_name: 'any_name',
  student_class: 3001
})

const makeFakeRequest = (): IGetBookModel => ({
  student_name: 'any_name',
  book_name: 'any_book'
})

describe('BooksRepository', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
  })

  beforeEach(async () => {
    PgHelper.query('DELETE FROM books').then(() => {})
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
  })
  describe('get', () => {
    it('Should call query the correct times', async () => {
      const sut = new BooksRepository()
      const querySpy = jest.spyOn(PgHelper, 'query')
      await sut.get()
      expect(querySpy).toHaveBeenCalledTimes(1)
    })
    it('Should return an empty array if query fail', async () => {
      const sut = new BooksRepository()
      jest.spyOn(PgHelper, 'query').mockImplementationOnce(() => {
        return new Promise((resolve) => resolve({ rows: [] } as any))
      })
      const result = await sut.get()
      expect(result).toEqual([])
    })
    it('Should return the correct value when query succeed', async () => {
      const sut = new BooksRepository()
      const insertedBook = await PgHelper.query(
        'INSERT INTO books(book_name, student_name, student_class, lend_day) VALUES($1, $2, $3, $4) RETURNING *',
        [
          makeFakeBook().book_name,
          makeFakeBook().student_name,
          makeFakeBook().student_class,
          makeFakeBook().lend_day
        ]
      )
      await PgHelper.query(
        'INSERT INTO books(book_name, student_name, student_class, lend_day) VALUES($1, $2, $3, $4)',
        [
          makeFakeBook().book_name,
          makeFakeBook().student_name,
          makeFakeBook().student_class,
          makeFakeBook().lend_day
        ]
      )
      const response = await sut.get()
      expect(response[0].id).toBeTruthy()
      expect(response[0].book_name).toBe(insertedBook.rows[0].book_name)
      expect(response[0].lend_day).toStrictEqual(insertedBook.rows[0].lend_day)
      expect(response[0].student_name).toBe(insertedBook.rows[0].student_name)
    })
    it('Should throw if query throws', async () => {
      const sut = new BooksRepository()
      jest.spyOn(PgHelper, 'query').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.get()
      expect(promise).rejects.toThrow()
    })
  })
  describe('getBy', () => {
    it('Should call query with correct values', async () => {
      const sut = new BooksRepository()
      const querySpy = jest.spyOn(PgHelper, 'query')
      await sut.getBy(makeFakeRequest())
      expect(querySpy).toHaveBeenCalledWith('SELECT * FROM books WHERE book_name = $1 AND student_name = $2', ['any_book', 'any_name'])
    })
  })
})
