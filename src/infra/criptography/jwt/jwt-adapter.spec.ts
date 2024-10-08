/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtAdapter } from "./jwt-adapter"
import jwt from 'jsonwebtoken'

const makeSut = (): JwtAdapter => {
  const sut = new JwtAdapter('any_secret')
  return sut
}

jest.mock('jsonwebtoken', () => ({
  sign() {
    return 'any_token'
  },
  verify() {
    return { id: 'any_id' }
  }
}))

describe('JwtAdapter', () => {
  describe('encrypt', () => {

    it('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, expect.anything(), { expiresIn: '8h' })
    })
    it('Should return a token on succeed', async () => {
      const sut = makeSut()
      const token = await sut.encrypt('any_id')
      expect(token).toBe('any_token')
    })
    it('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      expect(promise).rejects.toThrow()
    })
  })
  describe('decrypt', () => {
    it('Should call decrypt with correct values', async () => {
      const sut = makeSut()
      const decryptSpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(decryptSpy).toHaveBeenCalledWith('any_token', expect.anything())
    })
    it('Should not return if decrypt fails', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockReturnValueOnce('any_error' as any)
      const response = await sut.decrypt('any_token')
      expect(response).toBeFalsy()
    })
    it('Should return id on decrypt succeed', async () => {
      const sut = makeSut()
      const result = await sut.decrypt('any_token')
      expect(result).toBe('any_id')
    })
    it('Should return null if decrypt throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = await sut.decrypt('any_token')
      expect(promise).toBeFalsy()
    })
  })
})
