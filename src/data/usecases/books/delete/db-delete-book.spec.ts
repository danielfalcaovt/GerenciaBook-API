/* eslint-disable @typescript-eslint/no-unused-vars */
import { IDbDeleteBookRepository } from '../../../protocols/db/books/idb-delete-books-repository'
import { DbDeleteBook } from './db-delete-book'

interface SutTypes {
  sut: DbDeleteBook
  deleteBookRepositoryStub: IDbDeleteBookRepository
}

const makeSut = (): SutTypes => {
  const deleteBookRepositoryStub = makeDeleteBookRepositoryStub()
  const sut = new DbDeleteBook(deleteBookRepositoryStub)
  return {
    sut,
    deleteBookRepositoryStub
  }
}

const makeDeleteBookRepositoryStub = (): IDbDeleteBookRepository => {
  class DbDeleteBookRepositoryStub implements IDbDeleteBookRepository {
      delete(bookId: string): Promise<number> {
        return new Promise(resolve => resolve(1))
      }
  }
  return new DbDeleteBookRepositoryStub()
}

describe('DbDeleteBook', () => {
  it('Should call delete with correct values', async () => {
    const { sut, deleteBookRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteBookRepositoryStub, 'delete')
    await sut.delete('any_id')
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })
  it('Should throw if repository throws', async () => {
    const { sut, deleteBookRepositoryStub } = makeSut()
    jest.spyOn(deleteBookRepositoryStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.delete('any_id')
    expect(promise).rejects.toThrow()
  })
})