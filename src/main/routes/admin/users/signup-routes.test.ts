 
import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import env from '../../../config/env'
import { sign } from 'jsonwebtoken'

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
    const mockedJwt = sign({ id: 'random_id' }, env.JWT_ADM_SECRET)
    await request(app)
    .post('/admin/signup')
    .set('Authorization', 'Bearer ' + mockedJwt)
    .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        confirmPassword: 'any_password'
      })
      .expect(200)
  })
})