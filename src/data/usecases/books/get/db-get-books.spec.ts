import { IBook } from '../../../../domain/protocols/book'
import { IDbGetBooksRepository } from '../../../protocols/db/books/idb-get-books-repository'
import { DbGetBooks } from './db-get-books'

interface SutTypes {
  sut: DbGetBooks
  dbGetBooksRepositoryStub: IDbGetBooksRepository
}

const makeSut = (): SutTypes => {
  const dbGetBooksRepositoryStub = makeDbGetBooksRepositoryStub()
  const sut = new DbGetBooks(dbGetBooksRepositoryStub)
  return {
    sut,
    dbGetBooksRepositoryStub
  }
}

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  lend_day: 'any_day',
  student_name: 'any_name'
})

const makeDbGetBooksRepositoryStub = (): IDbGetBooksRepository => {
  class DbGetBooksRepositoryStub implements IDbGetBooksRepository {
    get(): Promise<IBook[]> {
      return new Promise(resolve => resolve([
        makeFakeBook(),
        makeFakeBook()
      ]))
    }
  }
  return new DbGetBooksRepositoryStub()
}

describe('DbGetBooks', () => {
  it('Should call get', async () => {
    const { sut, dbGetBooksRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(dbGetBooksRepositoryStub, 'get')
    await sut.get()
    expect(getSpy).toHaveBeenCalledTimes(1)
  })
  it('Should return get result', async () => {
    const { sut } = makeSut()
    const result = await sut.get()
    expect(result).toEqual([
      makeFakeBook(),
      makeFakeBook()
    ])
  })
  it('Should throw if repository throws', async () => {
    const { sut, dbGetBooksRepositoryStub } = makeSut()
    jest.spyOn(dbGetBooksRepositoryStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.get()
    expect(promise).rejects.toThrow()
  })
})