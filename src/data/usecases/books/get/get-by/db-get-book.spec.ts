/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBook } from '../../../../../domain/protocols/book'
import { IGetBookModel } from '../../../../../domain/usecases/books/get/iget-by-books'
import { IDbGetByBook } from '../../../../../data/protocols/db/books/idb-get-by-books'
import { DbGetBook } from './db-get-book'

interface SutTypes {
  sut: DbGetBook
  dbGetBooksRepositoryStub: IDbGetByBook
}

const makeSut = (): SutTypes => {
  const dbGetBooksRepositoryStub = makeDbBooksRepositoryStub()
  const sut = new DbGetBook(dbGetBooksRepositoryStub)
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

const makeFakeRequest = (): IGetBookModel => ({
  book_name: 'any_book'
})

const makeDbBooksRepositoryStub = (): IDbGetByBook => {
  class DbGetBooksRepositoryStub implements IDbGetByBook {
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
