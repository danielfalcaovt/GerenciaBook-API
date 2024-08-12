import { Request, Response } from "express";
import { Controller } from "../../presentation/protocols/controller";

export default (controller: Controller) => {
  return (req: Request, res: Response) => {
    const response = controller.handle(req.body)
    return res.json(response)
  } 
}