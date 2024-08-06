/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IValidation } from "../protocols/validation"
import { ValidationComposite } from "./validation-composite"

interface SutTypes {
  sut: ValidationComposite
  validations: IValidation[]
}

const makeSut = (): SutTypes => {
  const validations: IValidation[] = []
  validations.push(makeValidationStub())
  validations.push(makeValidationStub())
  const sut = new ValidationComposite(validations)
  return {
    sut,
    validations
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

describe('ValidationComposite', () => {
  it('Should call validation with correct values', () => {
    const { sut, validations } = makeSut()
    const validationSpy = jest.spyOn(validations[0], 'validate')
    sut.validate({ field: 'any_field' })
    expect(validationSpy).toHaveBeenCalledWith({ field: 'any_field' })
  })
  it('Should return an error if any validation fails', () => {
    const { sut, validations } = makeSut()
    jest.spyOn(validations[0], 'validate').mockReturnValueOnce(new Error('expected_error'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new Error('expected_error'))
  })
  it('Should not return if all validations succeed', () => {
    const { sut } = makeSut()
    const response = sut.validate({ field: 'any_field' })
    expect(response).toBeFalsy()
  })
})