/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoadByEmail } from '../../../data/protocols/db/users/iload-by-email'
import { IAccount } from '../../../domain/protocols/account'
import {
  IAccountModel,
  IAddAccount
} from '../../../domain/usecases/user-db/add-account'
import { SignUpController, HttpRequest, IValidation, InvalidParamError, badRequest, ok, serverError } from './signup-protocols'

interface SutTypes {
  sut: SignUpController
  validationStub: IValidation
  addAccountStub: IAddAccount
  loadByEmailStub: ILoadByEmail
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addAccountStub = makeAddAccountStub()
  const loadByEmailStub = makeLoadByEmailStub()
  const sut = new SignUpController(validationStub, addAccountStub, loadByEmailStub)
  return {
    sut,
    validationStub,
    addAccountStub,
    loadByEmailStub
  }
}

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(data: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeLoadByEmailStub = (): ILoadByEmail => {
  class LoadByEmailStub implements ILoadByEmail {
    load(email: string): Promise<IAccount | null> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new LoadByEmailStub()
}


const makeAddAccountStub = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    add(account: IAccountModel): Promise<IAccount> {
      return new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeFakeAccount = (): IAccount => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_mail@mail.com',
    password: 'any_password',
    confirmPassword: 'any_password'
  }
})

describe('SignUpController', () => {
  it('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  it('Should return an error if validation returns error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error('any error'))
    const error = await sut.handle(makeFakeRequest())
    expect(error).toEqual(badRequest(new Error('any error')))
  })
  it('Should throw if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
  it('Should call addAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })
  it('Should return 500 if addAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
  it('Should return an account if addAccount throws', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
  it('Should call loadByEmail with correct value', async () => {
    const { sut, loadByEmailStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
  it('Should return 400 if email already exist', async () => {
    const { sut, loadByEmailStub } = makeSut()
    jest.spyOn(loadByEmailStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeAccount())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
})
