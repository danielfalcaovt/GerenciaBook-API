import { IDbDeleteBook } from "../../../../domain/usecases/books/delete/idb-delete-book";
import { IDbDeleteBookRepository } from "../../../protocols/db/books/idb-delete-books-repository";

export class DbDeleteBook implements IDbDeleteBook {
  constructor(private readonly dbDeleteBookRepository: IDbDeleteBookRepository) {}
  async delete(bookId: string): Promise<number> {
    const result = await this.dbDeleteBookRepository.delete(bookId)
    return new Promise(resolve => resolve(result))
  }
}