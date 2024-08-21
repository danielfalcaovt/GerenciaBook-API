import { Router } from "express";
import routeAdapter from '../../../adapters/route-adapter'
import { makeGetByController } from '../../../factory/books/get-by/get-by-controller'

export default (router: Router) => {
  router.get('/books/query', routeAdapter(makeGetByController()))
}