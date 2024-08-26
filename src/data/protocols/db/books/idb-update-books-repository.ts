import { IBook } from "../../../../domain/protocols/book";
import { IUpdateBookModel } from "../../../../domain/usecases/books/update/iupdate-by-books";

export interface IUpdateBookRepository {
  update(book: IUpdateBookModel): Promise<IBook[]>
}