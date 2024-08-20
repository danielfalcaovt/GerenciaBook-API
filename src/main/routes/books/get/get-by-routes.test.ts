/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest'
import app from '../../../config/app'
import { NextFunction } from 'express'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'

jest.mock('../../../middlewares/auth-middleware/auth-middleware', () => jest.fn((req: any, res: any, next: NextFunction) => next()))

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
    await request(app)
      .get('/api/books/query?student_name=any_name')
      .expect(200)
  })
})