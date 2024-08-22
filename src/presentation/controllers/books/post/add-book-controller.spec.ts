/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBook } from "../../../../domain/protocols/book"
import { IDbAddBook, IAddBookModel } from "../../../../domain/usecases/books/post/idb-add-book"
import { badRequest, HttpRequest, IValidation, ok, serverError } from "../books-protocols"
import { AddBookController } from "./add-book-controller"

interface SutTypes {
  sut: AddBookController
  validationStub: IValidation
  addBookStub: IDbAddBook
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

const makeAddBookStub = (): IDbAddBook => {
  class AddBookStub implements IDbAddBook {
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
  it('Should return 500 if validate throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
  it('Should call addBook with correct values', async () => {
    const { sut, addBookStub } = makeSut()
    const addSpy = jest.spyOn(addBookStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  it('Should return 500 if addBook throws', async () => {
    const { sut, addBookStub } = makeSut()
    jest.spyOn(addBookStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError())
  })
  it('Should return the inserted book on addBook succeed', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({
      book_name: 'any_name',
      id: 'any_id',
      lend_day: fakeLendDay,
      student_class: 3001,
      student_name: 'any_student'
    }))
  })
})