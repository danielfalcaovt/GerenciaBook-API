import { IBook } from "../../../../domain/protocols/book";
import { IAddBookModel } from "../../../../domain/usecases/books/post/idb-add-book";

export interface IDbAddBookRepository {
  add(book: IAddBookModel): Promise<IBook>
}