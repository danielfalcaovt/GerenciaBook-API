export interface IDbDeleteBook {
  delete(bookId: string): Promise<number>
}