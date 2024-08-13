/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IValidation } from "../../protocols/validation"
import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/authentication'
import { LoginController } from './login'
import { HttpRequest } from "../../protocols/http"
import { badRequest, serverError } from "../../helpers/http-helper"

interface SutTypes {
  sut: LoginController
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
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

const makeAuthenticationStub = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    auth(authenticationModel: AuthenticationModel): Promise<string | null> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  it('Should return an error if validation fail', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('random_error'))
    const error = await sut.handle(makeFakeRequest())
    expect(error).toEqual(badRequest(new Error('random_error')))
  })
  it('Should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const error = await sut.handle(makeFakeRequest()) 
    expect(error).toEqual(serverError())
  })
})