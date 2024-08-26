import { IBook } from "../../../protocols/book"

export interface IUpdateBook {
  update(book: IUpdateBookModel): Promise<IBook[]>
}

export interface IUpdateBookModel {
  id: string
  book_name?: string
  student_name?: string
  student_class?: number
  lend_day?: number
}