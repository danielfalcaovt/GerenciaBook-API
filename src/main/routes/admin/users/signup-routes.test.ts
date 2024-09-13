/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import { NextFunction } from 'express'

jest.mock('../../../middlewares/auth-middleware/auth-middleware', () =>
  jest.fn((req: any, res: any, next: NextFunction) => next())
)

describe('SignUp Routes', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
    return
  })
  
  afterEach(async () => {
    PgHelper.query('DELETE FROM users').then(() => {})
    return
  })

  beforeEach(async () => {
    PgHelper.query('DELETE FROM users').then(() => {})
    return
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
    return
  })

  it('Should return an account on call signup route', async () => {
    await request(app)
      .post('/admin/signup')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      })
      .expect(200)
  })
})