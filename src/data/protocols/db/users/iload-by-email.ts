import { IAccount } from "../../../../domain/protocols/account"

export interface ILoadByEmail {
  load(email: string): Promise<IAccount | null>
}