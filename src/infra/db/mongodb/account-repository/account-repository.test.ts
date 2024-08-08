import { IAccountModel } from "../../../../domain/usecases/add-account"
import { MongoHelper } from '../helpers/mongo-helper'
import { MongoAccountRepository } from './account-repository'
import env from '../../../../main/config/env'
import { ollection } from 'mongodb'

const makeFakeAccount = (): IAccountModel => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password'
})

let accountCollection: ollection

describe('AddAccountRepository', () => {
  const makeSut = (): MongoAccountRepository => {
    return new MongoAccountRepository()
  }
  beforeAll(async () => {
    await MongoHelper.connect(env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })


  it('Should return an account on succeed', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeAccount())
    expect(account.id).toBeTruthy()
    expect(account.email).toBe('any_mail@mail.com')
  })
  it('Should throw if add throws', async () => {
    const sut = makeSut()
    jest.spyOn(MongoHelper, 'getCollection').mockImplementationOnce(async () => Promise.reject(new Error()))
    const promise = sut.add(makeFakeAccount())
    expect(promise).rejects.toThrow()
  })
})