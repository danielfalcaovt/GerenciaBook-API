import { IAccount } from "../../../../domain/protocols/account";
import { IAccountModel } from "../../../../domain/usecases/user-db/add-account";

export interface IAddAccountRepository {
  add(account: IAccountModel): Promise<IAccount>
}