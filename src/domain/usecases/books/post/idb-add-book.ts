import { IBook } from "../../../protocols/book";

export interface IDbAddBook {
  add(book: IAddBookModel): Promise<IBook>
}

export interface IAddBookModel {
  book_name: string
  student_name: string
  lend_day: number
  student_class: number
}