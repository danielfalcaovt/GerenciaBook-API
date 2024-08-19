import { NextFunction, Request, Response } from "express";
import { AuthMiddleware } from "../../../presentation/middlewares/auth-middleware";
import { JwtAdapter } from "../../../infra/criptography/jwt/jwt-adapter";
import env from "../../config/env";

export default async (req: Request, res: Response, next: NextFunction) => {
  const tokenVerifier = new JwtAdapter(env.JWT_SECRET)
  const authMiddleware = new AuthMiddleware(tokenVerifier)
  const httpRequest = {
    headers: req.headers
  }
  const result = await authMiddleware.handle(httpRequest)
  if (result.statusCode === 200) {
    next()
  } else {
    return res.status(result.statusCode).json(result.body)
  }
}