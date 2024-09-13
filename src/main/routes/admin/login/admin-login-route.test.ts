import request from 'supertest'
import app from '../../../config/app'
import { PgHelper } from '../../../../infra/db/postgres/helpers/pg-helper'
import { hash } from 'bcrypt'

describe('AdminLoginRoute', () => {
  beforeAll(async () => {
    PgHelper.connect().then(() => {})
    PgHelper.query('INSERT INTO admins(email, password) VALUES($1, $2)', ['any_mail@mail.com', await hash('any_password', 12)]).then(() => {})
    return
  })

  afterAll(async () => {
    PgHelper.query('DELETE FROM admins').then(() => {})
    PgHelper.disconnect().then(() => {})
  })
  
  it('Should return 200 on succeed', async () => {
    await request(app)
      .post('/api/adm-login')
      .send({
        email: 'any_mail@mail.com',
        password: 'any_password'
      })
      .expect(200)
  })
})