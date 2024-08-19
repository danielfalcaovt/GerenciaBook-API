import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'

jest.mock('../../../middlewares/auth-middleware/auth-middleware', () => jest.fn((req, res, next) => next()));

describe('GetMany Routes', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
  })

  it('Should return 200 on call get many route', async () => {
    await request(app)
      .get('/api/books')
      .expect(200)
  })
})