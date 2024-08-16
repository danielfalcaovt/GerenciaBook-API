import { IBook } from '../../../../domain/protocols/book'
import { IGetBooks } from '../../../../domain/usecases/books/get/iget-books'
import { serverError } from '../books-protocols'
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

const fakeLendDay = new Date()

const makeFakeBook = (): IBook => ({
  book_name: 'any_book',
  id: 'any_id',
  lend_day: fakeLendDay,
  student_name: 'any_name',
  student_class: 3001
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
  it('Should return 500 if getBooks throws', async () => {
    const { sut, getBooksStub } = makeSut()
    jest.spyOn(getBooksStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })
    const error = await sut.handle({})
    expect(error).toEqual(serverError())
  })
})