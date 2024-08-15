import { JwtAdapter } from "./jwt-adapter"
import jwt from 'jsonwebtoken'

const makeSut = (): JwtAdapter => {
  const sut = new JwtAdapter('any_secret')
  return sut
}

jest.mock('jsonwebtoken', () => ({
  sign() {
    return 'any_token'
  }
}))

describe('JwtAdapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.generate('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, expect.anything())
  })
  it('Should return a token on succeed', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe('any_token')
  })
})