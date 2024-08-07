import { IAccount } from "../../../domain/protocols/account";
import { IAccountModel } from "../../../domain/usecases/add-account";

export interface IAddAccountRepository {
  add(account: IAccountModel): Promise<IAccount>
}