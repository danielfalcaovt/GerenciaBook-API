/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBook } from "../../../../domain/protocols/book"
import { IAddBook, IAddBookModel } from "../../../../domain/usecases/books/post/iadd-book"
import { badRequest, HttpRequest, IValidation } from "../books-protocols"
import { AddBookController } from "./add-book-controller"

interface SutTypes {
  sut: AddBookController
  validationStub: IValidation
  addBookStub: IAddBook
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const addBookStub = makeAddBookStub()
  const sut = new AddBookController(validationStub, addBookStub)
  return {
    sut,
    validationStub,
    addBookStub
  }
}

const fakeLendDay = new Date().getTime()

const makeAddBookStub = (): IAddBook => {
  class AddBookStub implements IAddBook {
    add(book: IAddBookModel): Promise<IBook> {
      return new Promise(resolve => resolve({
        book_name: 'any_name',
        id: 'any_id',
        lend_day: fakeLendDay,
        student_class: 3001,
        student_name: 'any_student'
      }))
    }
  }
  return new AddBookStub()
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
    book_name: 'any_name',
    lend_day: fakeLendDay,
    student_class: 3001,
    student_name: 'any_student'
  }
})

describe('AddBook Controller', () => {
  it('Should call validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validationSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  it('Should return 400 if validate fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })
})