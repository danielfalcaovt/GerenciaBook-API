import { IBook } from "../../../../domain/protocols/book";
import { IUpdateBook, IUpdateBookModel } from "../../../../domain/usecases/books/update/iupdate-by-books";
import { IUpdateBookRepository } from "../../../protocols/db/books/idb-update-books-repository";

export class DbUpdateBook implements IUpdateBook {
  constructor(private readonly updateBookRepository: IUpdateBookRepository) {}
  async update(book: IUpdateBookModel): Promise<IBook[]> {
    await this.updateBookRepository.update(book)
    return new Promise(resolve => resolve([]))
  }
}