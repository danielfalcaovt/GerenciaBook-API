import { Router } from "express";
import routeAdapter from '../../../adapters/route-adapter'
import { makeGetByController } from '../../../factory/books/get-by/get-by-controller'
import { makeAuthMiddleware } from "../../../factory/auth-middleware/auth-middleware-factory";
import middlewareAdapter from "../../../adapters/middleware-adapter";

export default (router: Router) => {
  router.get('/books/query', middlewareAdapter(makeAuthMiddleware()),  routeAdapter(makeGetByController()))
}