import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import { sign } from 'jsonwebtoken'
import env from '../../../config/env'

describe('GetMany Routes', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
  })

  it('Should return 200 on call get many route', async () => {
    const mockedJwt = sign({ id: 'random_id' }, env.JWT_SECRET)
    await request(app)
      .get('/api/books')
      .set('Authorization', 'Bearer ' + mockedJwt)
      .expect(200)
  })
})
