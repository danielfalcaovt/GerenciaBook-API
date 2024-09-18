import { DbAuthentication } from "../../../data/usecases/authentication/user/db-authentication"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt/bcrypt-adapter"
import { makeLoginValidation } from "./admin-login-validation"
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt-adapter'
import env from "../../config/env"
import { AdminLoginController } from "../../../presentation/controllers/admin/admin-login"
import { PgAdminRepository } from "../../../infra/db/postgres/admin/admin-repository"

export const makeAdminLoginController = (): AdminLoginController => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.JWT_ADM_SECRET)
  const hashComparer = new BcryptAdapter(salt)
  const loadAccountByEmail = new PgAdminRepository()
  const authentication = new DbAuthentication(loadAccountByEmail, jwtAdapter, hashComparer)
  const adminLoginController = new AdminLoginController(makeLoginValidation(), authentication)
  return adminLoginController
}