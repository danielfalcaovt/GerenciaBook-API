import { IAccount } from "../../protocols/account"

export interface IAddAccount {
  add(account: IAccountModel): Promise<IAccount>
}

export interface IAccountModel {
  name: string
  email: string
  password: string
}