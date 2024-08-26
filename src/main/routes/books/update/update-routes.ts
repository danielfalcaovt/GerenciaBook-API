import { Router } from 'express'
import routeAdapter from '../../../adapters/route-adapter'
import { makeUpdateController } from '../../../factory/books/update/update-book-controller'

export default (router: Router) => {
  router.patch('/books', routeAdapter(makeUpdateController()))
}
