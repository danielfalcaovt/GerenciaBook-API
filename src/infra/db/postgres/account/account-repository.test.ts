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
  })
})