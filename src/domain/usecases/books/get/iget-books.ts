import { IBook } from "../../../protocols/book";

export interface IGetBooks {
  get(): Promise<IBook[]>
}