import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account";
import { BcryptAdapter } from "../../../infra/criptography/bcrypt/bcrypt-adapter";
import { SignUpController } from "../../../presentation/controllers/signup/signup";
import { makeSignUpValidation } from "./signup-validation";

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const addAccount = new DbAddAccount(hasher, )
  const signUpController = new SignUpController(makeSignUpValidation(), addAccount)
  return signUpController
}