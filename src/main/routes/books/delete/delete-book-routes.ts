import { Router } from "express";
import routeAdapter from "../../../adapters/route-adapter";
import { makeDeleteBookController } from "../../../factory/books/delete/delete-book-controller";

export default (router: Router) => {
  router.delete('/books', routeAdapter(makeDeleteBookController()))
}