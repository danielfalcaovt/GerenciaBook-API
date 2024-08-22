import request from 'supertest'
import app from '../../config/app'
import { PgHelper } from '../../../infra/db/postgres/helpers/pg-helper'
import { hash } from 'bcrypt'

const salt = 12

describe('LoginRoutes', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
    PgHelper.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', ['any_name', 'any_email@mail.com', await hash('any_password', salt)]).then(() => {})
  })
  
  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
  })

  it('Should return 200 on call login route with correct values', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      .expect(200)
  })
})