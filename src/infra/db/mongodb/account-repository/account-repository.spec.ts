import { IAccountModel } from "../../../../domain/usecases/add-account"
import { MongoHelper } from '../helpers/mongo-helper'
import env from '../../../../main/config/env'
import { MongoAccountRepository } from './account-repository'

const makeFakeAccount = (): IAccountModel => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password'
})

describe('AddAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  it('Should return an account on succeed', async () => {
    const sut = new MongoAccountRepository()
    const account = await sut.add(makeFakeAccount())
    expect(account.id).toBeTruthy()
    expect(account.email).toBe('any_mail@mail.com')
  })
})