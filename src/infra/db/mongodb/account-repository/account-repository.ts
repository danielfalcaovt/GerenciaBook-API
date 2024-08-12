import { IAddAccountRepository } from "../../../../data/protocols/db/iadd-account-repository";
import { ILoadByEmail } from "../../../../data/protocols/db/iload-by-email";
import { IAccount } from "../../../../domain/protocols/account";
import { IAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoAccountRepository implements IAddAccountRepository, ILoadByEmail {
  async add(account: IAccountModel): Promise<IAccount> {
    const accounts = await MongoHelper.getCollection('accounts')
    const insertedAccount = await accounts.insertOne(account)
    return await MongoHelper.map(account, insertedAccount.insertedId)
  }

  async load(email: string): Promise<IAccount | null> {
    const accounts = await MongoHelper.getCollection('accounts')
    const foundAccount = await accounts.findOne({email})
    if (foundAccount) {
      return MongoHelper.map(foundAccount, foundAccount?._id)
    }else {
      return null
    }
  }
}