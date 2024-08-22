import { Router } from "express";
import routeAdapter from "../../../adapters/route-adapter";
import { makeAddBookController } from "../../../factory/books/post/add-book-controller";

export default (router: Router) => {
  router.post('/books', routeAdapter(makeAddBookController()))
}