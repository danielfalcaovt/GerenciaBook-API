import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import { sign } from 'jsonwebtoken'
import env from '../../../config/env'

describe('AddBook Route', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
  })

  beforeEach(async () => {
    PgHelper.query('DELETE FROM books').then(() => {})
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
  })
  
  it('Should return 200 on succeed', async () => {
    const mockedJwt = sign({ id: 'random_id' }, env.JWT_SECRET)
    await request(app)
    .post('/api/books')
    .set('Authorization', 'Bearer ' + mockedJwt)
    .send({
      book_name: 'any_book',
        student_name: 'any_name',
        lend_day: String(new Date().getTime()),
        student_class: "3001"
      })
      .expect(200)
  })
})
