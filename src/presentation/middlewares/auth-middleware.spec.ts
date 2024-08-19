/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccessDeniedError } from "../errors"
import { forbidden, ok, serverError, unauthorized } from "../helpers/http-helper"
import { HttpRequest } from "../protocols/http"
import { AuthMiddleware } from "./auth-middleware"
import { ITokenVerifier } from "../../data/protocols/cryptography/itoken-verifier"

interface SutTypes {
  sut: AuthMiddleware
  tokenVerifierStub: ITokenVerifier
}

const makeSut = (): SutTypes => {
  const tokenVerifierStub = makeTokenVerifierStub()
  const sut = new AuthMiddleware(tokenVerifierStub)
  return {
    sut,
    tokenVerifierStub
  }
}

const makeTokenVerifierStub = (): ITokenVerifier => {
  class TokenVerifierStub implements ITokenVerifier {
    verify(token: string): Promise<string | null> {
      return new Promise(resolve => resolve('any_id'))
    }
  }
  return new TokenVerifierStub()
}

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    authorization: 'any_token'
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
  it('Should call TokenVerifier with correct value', async () => {
    const { sut, tokenVerifierStub } = makeSut()
    const verifierSpy = jest.spyOn(tokenVerifierStub, 'verify')
    await sut.handle(makeFakeRequest())
    expect(verifierSpy).toHaveBeenCalledWith('any_token')
  })
  it('Should return 403 if TokenVerifier fail', async () => {
    const { sut, tokenVerifierStub } = makeSut()
    jest.spyOn(tokenVerifierStub, 'verify').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
  it('Should return id on TokenVerifier succeed', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok({ id: 'any_id' }))
  })
  it('Should return 500 if TokenVerifier throws', async () => {
    const { sut, tokenVerifierStub } = makeSut()
    jest.spyOn(tokenVerifierStub, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(serverError())
  })
})