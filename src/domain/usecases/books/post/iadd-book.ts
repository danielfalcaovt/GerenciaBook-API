import { IBook } from "../../../protocols/book";

export interface IAddBook {
  add(book: IAddBookModel): Promise<IBook>
}

export interface IAddBookModel {
  book_name: string
  student_name: string
  lend_day: number
  student_class: number
}