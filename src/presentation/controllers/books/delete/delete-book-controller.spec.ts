/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, IValidation } from "../books-protocols"
import { DeleteBookController } from './delete-book-controller'

interface SutTypes {
  sut: DeleteBookController
  validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new DeleteBookController(validationStub)
  return {
    sut,
    validationStub
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

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'any_id'
  }
})

describe('DeleteBookController', () => {
  it('Should call validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
})