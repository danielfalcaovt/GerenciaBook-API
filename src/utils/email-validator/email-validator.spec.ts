import validator from "validator"
import { EmailValidator } from './email-validator'

jest.mock('validator', () => ({
  isEmail() {
    return true
  }
}))

describe('EmailValidator', () => {
  it('Should return false if isValid returns false', () => {
    const sut = new EmailValidator()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const response = sut.isValid('invalid_mail')
    expect(response).toBe(false)
  })
})