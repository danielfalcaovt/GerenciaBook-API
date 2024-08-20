/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from '../../../../domain/protocols/book'
import { IGetBook } from '../../../../domain/usecases/books/get/iget-by-books'
import { badRequest, HttpRequest, IValidation } from '../books-protocols'
import { GetBookController } from './get-book-controller'

interface SutTypes {
  sut: GetBookController
  getBooksStub: IGetBook
  validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const getBooksStub = makeGetBooksStub()
  const validationStub = makeValidationStub()
  const sut = new GetBookController(validationStub, getBooksStub)
  return {
    sut,
    getBooksStub,
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

const fakeLendDay = new Date()

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  lend_day: fakeLendDay,
  student_name: 'any_name',
  student_class: 3001
})


const makeGetBooksStub = (): IGetBook => {
  class GetBooksStub implements IGetBook {
    get(): Promise<IBook[]> {
      return new Promise(resolve => resolve([
        makeFakeBook(),
        makeFakeBook()
      ]))
    }
  }
  return new GetBooksStub()
}

const fakeDate = new Date()

const makeFakeRequest = (): HttpRequest => ({
  body: {
    book_name: 'any_book',
    student_name: 'any_student',
    student_class: 3001,
    lend_day: fakeDate
  }
})

describe('GetBookController', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  it('Should return an error if validation fail', async () => {
    const { sut, validationStub } = makeSut()
    const expectedError = new Error('any_error')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(expectedError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(expectedError))
  })
})