import { IBook } from '../../../../domain/protocols/book'

export interface IDbGetBookRepository {
  get(): Promise<IBook[]>
}
