import { IAddAccountRepository } from "../../../../data/protocols/db/iadd-account-repository";
import { ILoadByEmail } from "../../../../data/protocols/db/iload-by-email";
import { IUpdateAccessToken } from "../../../../data/protocols/db/iupdate-access-token";
import { IAccount } from "../../../../domain/protocols/account";
import { IAccountModel } from "../../../../domain/usecases/user-db/add-account";
import { PgHelper } from "../helpers/pg-helper";

export class PgAccountRepository implements IAddAccountRepository, ILoadByEmail, IUpdateAccessToken {
  async add(account: IAccountModel): Promise<IAccount> {
    const insertedAccount = await PgHelper.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [account.name, account.email, account.password])
    if (insertedAccount.rows.length > 0) {
      return new Promise(resolve => resolve(insertedAccount.rows[0]))
    }
    throw new Error()
  }

  async load(email: string): Promise<IAccount | null> {
    const foundAccount = await PgHelper.query('SELECT * FROM users WHERE email = $1', [email])
    if (foundAccount.rows.length > 0) {
      return new Promise(resolve => resolve(foundAccount.rows[0]))
    }
    return new Promise(resolve => resolve(null))
  }

  async update(id: string, token: string): Promise<void> {
    await PgHelper.query('UPDATE users SET token = $1 WHERE id = $2', [token, id])
  }
}