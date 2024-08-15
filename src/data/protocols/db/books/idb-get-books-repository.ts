import { IBook } from "../../../../domain/protocols/book";

export interface IDbGetBooksRepository {
  get(): Promise<IBook[]>
}