export interface IComparer {
  compare(value: string, hash: string): Promise<boolean>
}