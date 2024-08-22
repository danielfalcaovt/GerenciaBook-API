 
import { IBook } from "../../../../domain/protocols/book";
import { IAddBookModel, IDbAddBook } from "../../../../domain/usecases/books/post/idb-add-book";
import { IDbAddBookRepository } from "../../../protocols/db/books/idb-add-books-repository";

export class DbAddBook implements IDbAddBook {
  constructor(private readonly dbAddBookRepository: IDbAddBookRepository) {}

  async add(book: IAddBookModel): Promise<IBook> {
    await this.dbAddBookRepository.add(book)
    return new Promise(resolve => resolve({
      id: 'any_id',
      ...book
    }))
  }
}