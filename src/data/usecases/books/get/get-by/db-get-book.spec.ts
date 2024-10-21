/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBook } from '../../../../../domain/protocols/book'
import { IGetBookModel } from '../../../../../domain/usecases/books/get/iget-by-books'
import { IDbGetByBookRepository } from '../../../../../data/protocols/db/books/idb-get-by-books'
import { DbGetBook } from './db-get-book'

interface SutTypes {
  sut: DbGetBook
  dbGetBooksRepositoryStub: IDbGetByBookRepository
}

const makeSut = (): SutTypes => {
  const dbGetBooksRepositoryStub = makeDbBooksRepositoryStub()
  const sut = new DbGetBook(dbGetBooksRepositoryStub)
  return {
    sut,
    dbGetBooksRepositoryStub
  }
}

const fakeLendDay = String(new Date().getTime())

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  student_class: "3001",
  lend_day: fakeLendDay,
  student_name: 'any_name',
  phone: '00000000000'
})

const makeFakeRequest = (): IGetBookModel => ({
  book_name: 'any_book'
})

const makeDbBooksRepositoryStub = (): IDbGetByBookRepository => {
  class DbGetBooksRepositoryStub implements IDbGetByBookRepository {
    getBy(data: IGetBookModel): Promise<IBook[]> {
      return new Promise((resolve) => resolve([makeFakeBook()]))
    }
  }
  return new DbGetBooksRepositoryStub()
}

describe('DbGetBook', () => {
  it('Should call getBy with correct values', async () => {
    const { sut, dbGetBooksRepositoryStub } = makeSut()
    const getBySpy = jest.spyOn(dbGetBooksRepositoryStub, 'getBy')
    await sut.get(makeFakeRequest())
    expect(getBySpy).toHaveBeenCalledWith(makeFakeRequest())
  })
  it('Should call getBy with correct lend_day', async () => {
    const { sut, dbGetBooksRepositoryStub } = makeSut()
    const getBySpy = jest.spyOn(dbGetBooksRepositoryStub, 'getBy')
    await sut.get({lend_day: '12-05-2005'})
    expect(getBySpy).toHaveBeenCalledWith({ lend_day: String(new Date('12-05-2005').getTime()) })
  })
  it('Should return getBy result', async () => {
    const { sut } = makeSut()
    const response = await sut.get(makeFakeRequest())
    expect(response).toEqual([makeFakeBook()])
  })
  it('Should throw if getBy throws', async () => {
    const { sut, dbGetBooksRepositoryStub } = makeSut()
    jest.spyOn(dbGetBooksRepositoryStub, 'getBy').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.get(makeFakeRequest())
    expect(promise).rejects.toThrow()
  })
})
