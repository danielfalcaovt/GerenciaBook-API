import { IAccount } from "../../../domain/protocols/account"
import { IAccountModel, IAddAccount } from "../../../domain/usecases/add-account"
import { IHasher } from "../../protocols/cryptography/ihasher"
import { IAddAccountRepository } from "../../protocols/db/iadd-account-repository"

export class DbAddAccount implements IAddAccount {
    constructor(
        private readonly hasher: IHasher,
        private readonly addAccountRepo: IAddAccountRepository
    ) {}
    async add(account: IAccountModel): Promise<IAccount> {
        const hashedValue = await this.hasher.hash(account.password)
        const user = await this.addAccountRepo.add(Object.assign({}, account, { password: hashedValue }))
        return user
    }
}