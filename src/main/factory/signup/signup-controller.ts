import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt/bcrypt-adapter";
import { MongoAccountRepository } from "../../../infra/db/mongodb/account-repository/account-repository";
import { SignUpController } from "../../../presentation/controllers/signup/signup";
import { makeSignUpValidation } from "./signup-validation";

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const AddAccountRepository = new MongoAccountRepository()
  const addAccount = new DbAddAccount(hasher, AddAccountRepository)
  const loadByEmail = new MongoAccountRepository()
  const signUpController = new SignUpController(makeSignUpValidation(), addAccount, loadByEmail)
  return signUpController
}