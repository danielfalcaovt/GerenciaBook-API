import { IBook } from "../../../../domain/protocols/book"
import { IUpdateBook, IUpdateBookModel } from "../../../../domain/usecases/books/update/iupdate-by-books"
import { IUpdateBookRepository } from '../../../protocols/db/books/idb-update-books-repository'
import { DbUpdateBook } from './db-update-book'

interface SutTypes {
  sut: IUpdateBook
  updateBookRepository: IUpdateBookRepository
}

const makeSut = (): SutTypes => {
  const updateBookRepository = makeUpdateRepository()
  const sut = new DbUpdateBook(updateBookRepository)
  return {
    sut,
    updateBookRepository
  }
}

const makeFakeRequest = (): IUpdateBookModel => ({
  id: 'any_id',
  book_name: 'any_book'
})

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  student_class: 3001,
  lend_day: fakeLendDay,
  student_name: 'any_name'
})

const fakeLendDay = new Date().getTime()

const makeUpdateRepository = (): IUpdateBookRepository => {
  class UpdateBookRepositoryStub implements IUpdateBookRepository {
    update(book: IUpdateBookModel): Promise<IBook[]> {
      return new Promise(resolve => resolve([
        {
          ...makeFakeBook(),
          ...book
        }
      ]))
    }
  }
  return new UpdateBookRepositoryStub()
}

describe('DbUpdateBook', () => {
  it('Should call update with correct values', async () => {
    const { sut, updateBookRepository } = makeSut()
    const updateSpy = jest.spyOn(updateBookRepository, 'update')
    await sut.update(makeFakeRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })
})