/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmailValidator } from "../../../utils/email-validator/email-validator"
import { InvalidParamError } from "../../errors/invalid-param-error"
import { IEmailValidation } from "../../protocols/email-validation"
import { EmailValidation } from './email-validation'

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: IEmailValidation
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new EmailValidation(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

const makeEmailValidatorStub = (): IEmailValidation => {
  class EmailValidatorStub implements IEmailValidation {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('EmailValidation', () => {
  it('Should call isValid with correct value', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({email: 'any_mail'})
    expect(isValidSpy).toHaveBeenCalledWith('any_mail')
  })
  it('Should return an InvalidParamError if isValid returns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate('any_mail')
    expect(error).toEqual(new InvalidParamError('email'))
  })
  it('Should not return if isValid returns true', () => {
    const { sut } = makeSut()
    const response = sut.validate('any_mail')
    expect(response).toBeFalsy()
  })
  it('Should throw if isValid throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})