import { Router } from "express";
import routeAdapter from "../../../adapters/route-adapter";
import { makeSignUpController } from "../../../factory/signup/signup-controller";
import middlewareAdapter from "../../../adapters/middleware-adapter";
import { makeAuthMiddleware } from "../../../factory/auth-middleware/auth-middleware-factory";

export default (router: Router) => {
  router.post('/signup', middlewareAdapter(makeAuthMiddleware('admin')),  routeAdapter(makeSignUpController()))
}