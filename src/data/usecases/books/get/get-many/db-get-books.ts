import { IBook } from "../../../../../domain/protocols/book";
import { IGetBooks } from "../../../../../domain/usecases/books/get/iget-many-books";
import { IDbBooksRepository } from "../../../../protocols/db/books/idb-get-books-repository";

export class DbGetBooks implements IGetBooks {
  constructor(private readonly DbGetBooksRepository: IDbBooksRepository) {}
  async get(): Promise<IBook[]> {
    const result = await this.DbGetBooksRepository.get()
    return new Promise(resolve => resolve(result))
  }
} 