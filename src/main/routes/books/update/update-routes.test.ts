 
import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import { sign } from 'jsonwebtoken'
import env from '../../../config/env'

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
    const mockedJwt = sign({ id: 'random_id' }, env.JWT_SECRET)
    const insertedBook = await PgHelper.query(
      'INSERT INTO books(book_name, student_name, student_class, lend_day) VALUES($1, $2, $3, $4) RETURNING *',
      ['any_name', 'any_book', 3000, new Date().getTime()]
    )
    await request(app)
      .patch('/api/books')
      .set('Authorization', 'Bearer ' + mockedJwt)
      .send({
        id: insertedBook?.rows[0].id,
        student_name: 'any_other_name'
      })
      .expect(200)
  })
})
