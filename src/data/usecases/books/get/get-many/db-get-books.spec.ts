import { IBook } from '../../../../../domain/protocols/book'
import { IDbBooksRepository } from '../../../../protocols/db/books/idb-get-books-repository'
import { DbGetBooks } from './db-get-books'

interface SutTypes {
  sut: DbGetBooks
  dbGetBooksRepositoryStub: IDbBooksRepository
}

const makeSut = (): SutTypes => {
  const dbGetBooksRepositoryStub = makeDbGetBooksRepositoryStub()
  const sut = new DbGetBooks(dbGetBooksRepositoryStub)
  return {
    sut,
    dbGetBooksRepositoryStub
  }
}

const fakeLendDay = new Date()

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  student_class: 3001,
  lend_day: fakeLendDay,
  student_name: 'any_name'
})

const expectedValue = [
  makeFakeBook(),
  makeFakeBook()
]

const makeDbGetBooksRepositoryStub = (): IDbBooksRepository => {
  class DbGetBooksRepositoryStub implements IDbBooksRepository {
    get(): Promise<IBook[]> {
      return new Promise(resolve => resolve(expectedValue))
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
    expect(result).toEqual(expectedValue)
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