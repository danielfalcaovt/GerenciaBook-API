import { IAddAccountRepository } from "../../../../data/protocols/db/iadd-account-repository";
import { IAccount } from "../../../../domain/protocols/account";
import { IAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoAccountRepository implements IAddAccountRepository {
  async add(account: IAccountModel): Promise<IAccount> {
    const accounts = await MongoHelper.getCollection('accounts')
    const insertedAccount = await accounts.insertOne(account)
    return await MongoHelper.map(account, insertedAccount.insertedId)
  }
}