import { IBook } from "../../../protocols/book";

export interface IGetBook {
  get(book: IGetBookModel): Promise<IBook[]>
}

export interface IGetBookModel {
  book_name?: string
  student_name?: string
  student_class?: string
  lend_day?: string
  phone?: string
}