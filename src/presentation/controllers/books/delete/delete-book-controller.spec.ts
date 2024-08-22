/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { badRequest, HttpRequest, IValidation, ok } from "../books-protocols"
import { DeleteBookController } from './delete-book-controller'
import { IDbDeleteBook } from '../../../../domain/usecases/books/delete/idb-delete-book'

interface SutTypes {
  sut: DeleteBookController
  validationStub: IValidation
  deleteBookStub: IDbDeleteBook
}

const makeSut = (): SutTypes => {
  const deleteBookStub = makeDeleteBookStub()
  const validationStub = makeValidationStub()
  const sut = new DeleteBookController(validationStub, deleteBookStub)
  return {
    sut,
    validationStub,
    deleteBookStub
  }
}

const makeDeleteBookStub = (): IDbDeleteBook => {
  class DbDeleteBookStub implements IDbDeleteBook {
    delete(bookId: string): Promise<number> {
      return new Promise(resolve => resolve(1))
    }
  }
  return new DbDeleteBookStub()
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
  query: {
    id: 'any_id'
  }
})

describe('DeleteBookController', () => {
  it('Should call validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().query)
  })
  it('Should return 400 if validate fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('any_error'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error('any_error')))
  })
  it('Should call DeleteBook with correct values', async () => {
    const { sut, deleteBookStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteBookStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(deleteSpy).toHaveBeenCalledWith(makeFakeRequest().query.id)
  })
  it('Should throw if DeleteBook throws', async () => {
    const { sut, deleteBookStub } = makeSut()
    jest.spyOn(deleteBookStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.handle(makeFakeRequest())
    expect(promise).rejects.toThrow()
  })
  it('Should return affected rows on succeed', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(1))
  })
})