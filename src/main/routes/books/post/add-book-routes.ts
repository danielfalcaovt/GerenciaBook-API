import { Router } from "express";
import routeAdapter from "../../../adapters/route-adapter";
import { makeAddBookController } from "../../../factory/books/post/add-book-controller";
import { makeAuthMiddleware } from "../../../factory/auth-middleware/auth-middleware-factory";
import middlewareAdapter from "../../../adapters/middleware-adapter";

export default (router: Router) => {
  router.post('/books', middlewareAdapter(makeAuthMiddleware()),  routeAdapter(makeAddBookController()))
}