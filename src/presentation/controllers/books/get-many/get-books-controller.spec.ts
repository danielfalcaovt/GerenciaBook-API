import { IBook } from '../../../../domain/protocols/book'
import { IGetBooks } from '../../../../domain/usecases/books/get/iget-books'
import { GetBooksController } from './get-books-controller'

interface SutTypes {
  sut: GetBooksController
  getBooksStub: IGetBooks
}

const makeSut = (): SutTypes => {
  const getBooksStub = makeGetBooksStub()
  const sut = new GetBooksController(getBooksStub)
  return {
    sut,
    getBooksStub
  }
}

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  lend_day: 'any_day',
  student_name: 'any_name'
})

const makeGetBooksStub = (): IGetBooks => {
  class GetBooksStub implements IGetBooks {
    get(): Promise<IBook[]> {
      return new Promise(resolve => resolve([
        makeFakeBook(),
        makeFakeBook()
      ]))
    }
  }
  return new GetBooksStub()
}

describe('GetBooksController', () => {
  it('Should call GetBooks', async () => {
    const { sut, getBooksStub } = makeSut()
    const getSpy = jest.spyOn(getBooksStub, 'get')
    await sut.handle({})
    expect(getSpy).toHaveBeenCalledTimes(1)
  })
  it('Should return getBooks result', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({})
    expect(result.statusCode).toBe(200)
    expect(result.body).toContainEqual(makeFakeBook())
  })
})