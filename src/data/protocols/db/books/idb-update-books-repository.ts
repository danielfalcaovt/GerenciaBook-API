import { IBook } from "../../../../domain/protocols/book";
import { IUpdateBookModel } from "../../../../domain/usecases/books/update/iupdate-by-books";

export interface IDbUpdateBookRepository {
  update(book: IUpdateBookModel): Promise<IBook[]>
}