import { Router } from "express";
import routeAdapter from "../../../adapters/route-adapter";
import { makeDeleteBookController } from "../../../factory/books/delete/delete-book-controller";
import middlewareAdapter from "../../../adapters/middleware-adapter";
import { makeAuthMiddleware } from "../../../factory/auth-middleware/auth-middleware-factory";

export default (router: Router) => {
  router.delete('/books', middlewareAdapter(makeAuthMiddleware()), routeAdapter(makeDeleteBookController()))
}