/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IValidation } from "../../protocols/validation"
import { ValidationComposite } from "../validations/validation-composite"

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
    const expectedField = { field: 'any_field' }
    const validationSpy = jest.spyOn(validations[0], 'validate')
    sut.validate(expectedField)
    expect(validationSpy).toHaveBeenCalledWith(expectedField)
  })
  it('Should return an error if any validation fails', () => {
    const { sut, validations } = makeSut()
    const expectedError = new Error('expected_error')
    jest.spyOn(validations[0], 'validate').mockReturnValueOnce(expectedError)
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(expectedError)
  })
  it('Should return the first error received', () => {
    const { sut, validations } = makeSut()
    jest.spyOn(validations[0], 'validate').mockReturnValueOnce(new Error('first'))
    jest.spyOn(validations[1], 'validate').mockReturnValueOnce(new Error('second'))
    const error = sut.validate({ field: 'any_field' })
    expect(error).toEqual(new Error('first'))
  })
  it('Should not return if all validations succeed', () => {
    const { sut } = makeSut()
    const response = sut.validate({ field: 'any_field' })
    expect(response).toBeFalsy()
  })
  it('Should throw if any validation throws', () => {
    const { sut, validations } = makeSut()
    jest.spyOn(validations[0], 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})