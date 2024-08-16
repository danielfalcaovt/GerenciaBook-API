/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBook } from '../../../../domain/protocols/book'
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
  it('Should call query with correct values', async () => {
    const sut = new BooksRepository()
    const querySpy = jest.spyOn(PgHelper, 'query')
    await sut.get()
    expect(querySpy).toHaveBeenCalledTimes(1)
  })
  it('Should return an empty array if query fail', async () => {
    const sut = new BooksRepository()
    jest.spyOn(PgHelper, 'query').mockImplementationOnce(() => {
      return new Promise(resolve => resolve({ rows: [] } as any ))
    })
    const result = await sut.get()
    expect(result).toEqual([])
  })
})
