import { ILoadByEmail } from "../../../../data/protocols/db/users/iload-by-email";
import { IAdmin } from "../../../../domain/protocols/admin";
import { PgHelper } from "../helpers/pg-helper";

export class PgAdminRepository implements ILoadByEmail {
  async load(email: string): Promise<IAdmin | null> {
    const foundAccount = await PgHelper.query('SELECT * FROM admins WHERE email = $1', [email])
    if (foundAccount.rows.length > 0) {
      return new Promise(resolve => resolve(foundAccount.rows[0]))
    }
    return new Promise(resolve => resolve(null))
  }
}