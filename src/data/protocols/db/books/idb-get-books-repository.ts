import { IBook } from '../../../../domain/protocols/book'

export interface IDbBooksRepository {
  get(): Promise<IBook[]>
}
