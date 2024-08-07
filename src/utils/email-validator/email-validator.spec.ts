import validator from "validator"
import { EmailValidator } from './email-validator'

jest.mock('validator', () => ({
  isEmail() {
    return true
  }
}))

describe('EmailValidator', () => {
  it('Should call isValid with correct value', () => {
    const sut = new EmailValidator()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_mail')
    expect(isEmailSpy).toHaveBeenCalledWith('any_mail')
  })
  it('Should return false if isValid returns false', () => {
    const sut = new EmailValidator()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const response = sut.isValid('invalid_mail')
    expect(response).toBe(false)
  })
  it('Should return true if isValid returns true', () => {
    const sut = new EmailValidator()
    const response = sut.isValid('valid_mail')
    expect(response).toBe(true)
  })
  it('Should throw if validator throws', () => {
    const sut = new EmailValidator()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.isValid).toThrow()
  })
})