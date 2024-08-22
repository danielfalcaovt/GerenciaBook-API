import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'

jest.mock('../../../middlewares/auth-middleware/auth-middleware', () => jest.fn((req, res, next) => next()))

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
    await request(app)
      .post('/api/books')
      .send({
        book_name: 'any_book',
        student_name: 'any_name',
        lend_day: new Date().getTime(),
        student_class: 3001
      })
      .expect(200)
  })
})
