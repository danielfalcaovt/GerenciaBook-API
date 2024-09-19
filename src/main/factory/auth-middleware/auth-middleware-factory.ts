import { JwtAdapter, AuthMiddleware, IMiddleware } from './auth-protocols'
import env from "../../config/env"

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  const jwtAdapter = new JwtAdapter(role === 'admin' ? env.JWT_ADM_SECRET : env.JWT_SECRET)
  const authMiddleware = new AuthMiddleware(jwtAdapter)
  return authMiddleware
}