/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from '../../../../domain/protocols/book'
import { IUpdateBook } from '../../../../domain/usecases/books/update/iupdate-by-books'
import { badRequest, HttpRequest, IValidation, ok, serverError } from '../books-protocols'
import { UpdateBookController } from './update-book-controller'

interface SutTypes {
  sut: UpdateBookController
  updateBooksStub: IUpdateBook
  validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const updateBooksStub = makeUpdateBooksStub()
  const validationStub = makeValidationStub()
  const sut = new UpdateBookController(validationStub, updateBooksStub)
  return {
    sut,
    updateBooksStub,
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

const fakeLendDay = new Date().getTime()

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  lend_day: fakeLendDay,
  student_name: 'any_name',
  student_class: 3001
})


const makeUpdateBooksStub = (): IUpdateBook => {
  class UpdateBooksStub implements IUpdateBook {
    update(): Promise<IBook[]> {
      return new Promise(resolve => resolve([
        makeFakeBook()
      ]))
    }
  }
  return new UpdateBooksStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    id: 'any_id',
    student_name: 'any_student',
  }
})

describe('UpdateBookController', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  it.skip('Should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const expectedError = new Error('any_error')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(expectedError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(expectedError))
  })
  it.skip('Should throw if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
  it.skip('Should call UpdateBook with correct values', async () => {
    const { sut, updateBooksStub } = makeSut()
    const updateSpy = jest.spyOn(updateBooksStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  it.skip('Should return the UpdateBook result', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(ok([
      makeFakeBook(),
      makeFakeBook()
    ]))
  })
  it.skip('Should return 500 if UpdateBook throws', async () => {
    const { sut, updateBooksStub } = makeSut()
    jest.spyOn(updateBooksStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
})