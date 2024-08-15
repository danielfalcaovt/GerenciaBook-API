import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt/bcrypt-adapter";
import { PgAccountRepository } from "../../../infra/db/postgres/account/account-repository";
import { SignUpController } from "../../../presentation/controllers/signup/signup";
import { makeSignUpValidation } from "./signup-validation";

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const AddAccountRepository = new PgAccountRepository()
  const addAccount = new DbAddAccount(hasher, AddAccountRepository)
  const loadByEmail = new PgAccountRepository()
  const signUpController = new SignUpController(makeSignUpValidation(), addAccount, loadByEmail)
  return signUpController
}