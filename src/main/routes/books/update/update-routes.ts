import { Router } from 'express'
import routeAdapter from '../../../adapters/route-adapter'
import { makeUpdateController } from '../../../factory/books/update/update-book-controller'
import middlewareAdapter from '../../../adapters/middleware-adapter'
import { makeAuthMiddleware } from '../../../factory/auth-middleware/auth-middleware-factory'

export default (router: Router) => {
  router.patch('/books', middlewareAdapter(makeAuthMiddleware()),  routeAdapter(makeUpdateController()))
}
