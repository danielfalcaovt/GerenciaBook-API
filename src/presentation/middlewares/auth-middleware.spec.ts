/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccessDeniedError } from "../errors"
import { forbidden, ok, serverError, unauthorized } from "../helpers/http-helper"
import { HttpRequest } from "../protocols/http"
import { AuthMiddleware } from "./auth-middleware"
import { Decrypter } from "../../data/protocols/cryptography/decrypter"

interface SutTypes {
  sut: AuthMiddleware
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new AuthMiddleware(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(token: string): Promise<string | null> {
      return new Promise(resolve => resolve('any_id'))
    }
  }
  return new DecrypterStub()
}

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    authorization: 'Bearer any_token'
  }
})

describe('Auth Middleware', () => {
  it('Should return 403 if authorization not exist', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      headers: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  it('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const verifierSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.handle(makeFakeRequest())
    expect(verifierSpy).toHaveBeenCalledWith('any_token')
  })
  it('Should return 403 if Decrypter fail', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  it('Should return id on Decrypter succeed', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok({ id: 'any_id' }))
  })
  it('Should return 500 if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError())
  })
})