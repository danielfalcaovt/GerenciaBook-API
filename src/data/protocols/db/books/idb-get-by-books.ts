import { IBook } from "../../../../domain/protocols/book";
import { IGetBookModel } from "../../../../domain/usecases/books/get/iget-by-books";

export interface IDbGetByBook {
  getBy(data: IGetBookModel): Promise<IBook[]>
}