/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBook } from '../../../../domain/protocols/book'
import { IGetBook } from '../../../../domain/usecases/books/get/iget-by-books'
import { badRequest, HttpRequest, IValidation, ok, serverError } from '../books-protocols'
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

const fakeLendDay = new Date().getTime()

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

const makeFakeRequest = (): HttpRequest => ({
  params: {
    student_name: 'any_student',
  }
})

describe('GetBookController', () => {
  it('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().params)
  })
  it('Should return 500 if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const expectedError = new Error('any_error')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(expectedError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(expectedError))
  })
  it('Should throw if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
  it('Should call GetBook with correct values', async () => {
    const { sut, getBooksStub } = makeSut()
    const getSpy = jest.spyOn(getBooksStub, 'get')
    await sut.handle(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith(makeFakeRequest().params)
  })
  it('Should return the GetBook result', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(ok([
      makeFakeBook(),
      makeFakeBook()
    ]))
  })
  it('Should return 500 if GetBook throws', async () => {
    const { sut, getBooksStub } = makeSut()
    jest.spyOn(getBooksStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
})