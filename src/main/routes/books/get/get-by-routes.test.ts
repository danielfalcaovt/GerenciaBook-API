 
import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import { sign } from 'jsonwebtoken'
import env from '../../../config/env'

describe('GetBy Route', () => {
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
      .get('/api/books/query?student_name=any_name')
      .set('Authorization', 'Bearer ' + mockedJwt)
      .expect(200)
  })
})
