import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt/bcrypt-adapter"
import { PgAccountRepository } from "../../../infra/db/postgres/account/account-repository"
import { LoginController } from "../../../presentation/controllers/login/login"
import { makeLoginValidation } from "./login-validation"
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt-adapter'
import env from "../../config/env"

export const makeLoginController = (): LoginController => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const hashComparer = new BcryptAdapter(salt)
  const loadAccountByEmail = new PgAccountRepository()
  const updateAccessToken = new PgAccountRepository()
  const authentication = new DbAuthentication(updateAccessToken, loadAccountByEmail, jwtAdapter, hashComparer)
  const loginController = new LoginController(makeLoginValidation(), authentication)
  return loginController
}