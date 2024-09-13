import { IAccount } from "../../../../domain/protocols/account"
import { IAdmin } from "../../../../domain/protocols/admin"

export interface ILoadByEmail {
  load(email: string): Promise<IAccount | IAdmin | null>
}