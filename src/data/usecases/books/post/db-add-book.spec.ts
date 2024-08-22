/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBook } from '../../../../domain/protocols/book'
import { IAddBookModel } from '../../../../domain/usecases/books/post/idb-add-book'
import { DbAddBook } from './db-add-book'
import { IDbAddBookRepository } from '../../../protocols/db/books/idb-add-books-repository'

interface SutTypes {
  sut: DbAddBook
  addBookRepositoryStub: IDbAddBookRepository
}

const makeSut = (): SutTypes => {
  const addBookRepositoryStub = makeAddBookRepositoryStub()
  const sut = new DbAddBook(addBookRepositoryStub)
  return {
    sut, 
    addBookRepositoryStub
  }
}

const makeAddBookRepositoryStub = (): IDbAddBookRepository => {
  class AddBookRepositoryStub implements IDbAddBookRepository {
    add(book: IAddBookModel): Promise<IBook> {
      return new Promise(resolve => resolve({
        book_name: 'any_book',
        id: 'any_id',
        lend_day: 1238128930128,
        student_class: 3000,
        student_name: 'any_name'
      }))
    }
  }
  return new AddBookRepositoryStub()
}

const makeFakeRequest = (): IAddBookModel => ({
  book_name: 'any_book',
  lend_day: 1238128930128,
  student_class: 3000,
  student_name: 'any_name'
})

describe('DbAddBook', () => {
  it('Should call post with correct values', async () => {
    const { sut, addBookRepositoryStub } = makeSut()
    const addSpyRep = jest.spyOn(addBookRepositoryStub, 'add')
    await sut.add(makeFakeRequest())
    expect(addSpyRep).toHaveBeenCalledWith(makeFakeRequest())
  })
  it('Should return an book when post succeed', async () => {
    const { sut } = makeSut()
    const book = await sut.add(makeFakeRequest())
    expect(book).toEqual({
      book_name: 'any_book',
      id: 'any_id',
      lend_day: 1238128930128,
      student_class: 3000,
      student_name: 'any_name'
    })
  })
  it('Should throw if post throws', async () => {
    const { sut, addBookRepositoryStub } = makeSut()
    jest.spyOn(addBookRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(makeFakeRequest())
    expect(promise).rejects.toThrow()
  })
})