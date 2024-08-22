/* eslint-disable @typescript-eslint/no-explicit-any */
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import request from 'supertest'
import app from '../../../config/app'
import { NextFunction } from 'express'

jest.mock('../../../middlewares/auth-middleware/auth-middleware', () =>
  jest.fn((req: any, res: any, next: NextFunction) => next())
)

describe('DeleteBook Route', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
  })

  beforeEach(async () => {
    PgHelper.query('DELETE FROM books').then(() => {})
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
  })
  it('Should return 200 on route succeed', async () => {
    const insertedBook = await PgHelper.query(
      'INSERT INTO books(book_name, student_name, student_class, lend_day) VALUES($1, $2, $3, $4) RETURNING *',
      ['any_name', 'any_book', 3000, new Date().getTime()]
    )
    await request(app)
    .delete(`/api/books?id=${insertedBook.rows[0].id}`)
    .expect(200)
  })
})
