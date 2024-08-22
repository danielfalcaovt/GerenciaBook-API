export interface IDbDeleteBookRepository {
  delete(bookId: string): Promise<number>
}