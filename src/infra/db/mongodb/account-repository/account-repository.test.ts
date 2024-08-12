import { IAccountModel } from "../../../../domain/usecases/add-account"
import { MongoHelper } from '../helpers/mongo-helper'
import { MongoAccountRepository } from './account-repository'
import env from '../../../../main/config/env'
import { Collection } from 'mongodb'

const makeFakeAccount = (): IAccountModel => ({
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password'
})

let accountCollection: Collection

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
    expect(account.email).toBe('any_email@mail.com')
  })
  it('Should throw if add throws', async () => {
    const sut = makeSut()
    jest.spyOn(MongoHelper, 'getCollection').mockImplementationOnce(async () => Promise.reject(new Error()))
    const promise = sut.add(makeFakeAccount())
    expect(promise).rejects.toThrow()
  })
  it('Should return an account if loadByEmail found', async () => {
    await accountCollection.insertOne(makeFakeAccount())
    const sut = makeSut()
    const foundAccount = await sut.load('any_email@mail.com')
    expect(foundAccount?.email).toBe('any_email@mail.com')
  })
})