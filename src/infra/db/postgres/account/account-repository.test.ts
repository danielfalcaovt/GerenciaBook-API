import { IAccountModel } from "../../../../domain/usecases/add-account"
import { PgHelper } from '../helpers/pg-helper'
import { PgAccountRepository } from './account-repository'

const makeFakeAccount = (): IAccountModel => ({
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

describe('PgAccountRepository', () => {

  beforeAll(async () => {
    PgHelper.connect().then(() => {})
    return
  })

  afterEach(async () => {
    PgHelper.query('DELETE FROM users').then(() => {})
    return
  })

  afterAll(async () => {
    PgHelper.disconnect().then(() => {})
    return
  })

  describe('add account', () => {
    it('Should return an account on succeed', async () => {
      const sut = new PgAccountRepository()
      const account = await sut.add(makeFakeAccount())
      expect(account.id).toBeTruthy()
      expect(account.email).toBe('any_mail@mail.com')
    })
  })
  describe('load by email', () => {
    it('Should call query with correct value', async () => {
      const sut = new PgAccountRepository()
      const querySpy = jest.spyOn(PgHelper, 'query')
      const email = makeFakeAccount().email
      await sut.load(email)
      expect(querySpy).toHaveBeenCalledWith(expect.anything(), expect.arrayContaining([email]))
    })
    it('Should return an account on succeed', async () => {
      await PgHelper.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', ['any_name', 'any_mail@mail.com', 'any_password'])
      const sut = new PgAccountRepository()
      const account = await sut.load('any_mail@mail.com')
      expect(account?.id).toBeTruthy()
      expect(account?.email).toBe('any_mail@mail.com')
    })
    it('Should not return on fail', async () => {
      const sut = new PgAccountRepository()
      const error = await sut.load('inexistent_email@mail.com')
      expect(error).toBeFalsy()
    })
    it('Should throw if query throws', async () => {
      const sut = new PgAccountRepository()
      jest.spyOn(PgHelper, 'query').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.load('any_mail@mail.com')
      expect(promise).rejects.toThrow()
    })
  })

  describe('update access token', () => {
    it('Should update the token on succeed', async () => {
      const user = await PgHelper.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', ['any_name', 'any_mail@mail.com', 'any_password'])
      const sut = new PgAccountRepository()
      await sut.update(user.rows[0].id, 'any_token')
      const result = await PgHelper.query('SELECT * FROM users WHERE id = $1', [user.rows[0].id])
      expect(result.rows[0].token).toBe('any_token')
    })
    it('Should call query with correct values', async () => {
      const user = await PgHelper.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', ['any_name', 'any_mail@mail.com', 'any_password'])
      const sut = new PgAccountRepository()
      const querySpy = jest.spyOn(PgHelper, 'query')
      await sut.update(user.rows[0].id, 'any_token')
      expect(querySpy).toHaveBeenCalledWith(expect.anything(), ['any_token', expect.anything()])
    })
    it('Should throw if query throws', async () => {
      const sut = new PgAccountRepository()
      jest.spyOn(PgHelper, 'query').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.update('anything', 'any_token')
      expect(promise).rejects.toThrow()
    })
  })
})