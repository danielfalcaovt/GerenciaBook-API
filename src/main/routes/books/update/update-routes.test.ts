/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest'
import app from '../../../config/app'
import { NextFunction } from 'express'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'

jest.mock('../../../middlewares/auth-middleware/auth-middleware', () => jest.fn((req: any, res: any, next: NextFunction) => next()))

describe('UpdateRoutes', () => {

  beforeAll(async () => {
    PgHelper.connect().then(() => {})
  })

  beforeEach(async () => {
    PgHelper.query('DELETE FROM books').then(() => {})
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
  })

  it('Should return 200 on call update route', async () => {
    const insertedBook = await PgHelper.query(
      'INSERT INTO books(book_name, student_name, student_class, lend_day) VALUES($1, $2, $3, $4) RETURNING *',
      ['any_name', 'any_book', 3000, new Date().getTime()]
    )
    await request(app)
      .patch('/api/books')
      .send({
        id: insertedBook?.rows[0].id,
        student_name: 'any_other_name'
      })
      .expect(200)
  })
})