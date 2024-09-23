import { Router } from 'express'
import routeAdapter from '../../../adapters/route-adapter'
import { makeGetManyBooksController } from '../../../factory/books/get-many/get-many-controller'
import middlewareAdapter from '../../../adapters/middleware-adapter'
import { makeAuthMiddleware } from '../../../factory/auth-middleware/auth-middleware-factory'

export default (router: Router) => {
  router.get('/books', middlewareAdapter(makeAuthMiddleware()), routeAdapter(makeGetManyBooksController()))
}
