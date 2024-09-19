import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "../../presentation/protocols/middleware";

export default (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // interceptação dos usuários que não estão autênticados
    const response = await middleware.handle(req)
    if (response.statusCode === 200) {
      next()
    } else {
      return res.status(response.statusCode).json(response.body)
    }
  } 
}