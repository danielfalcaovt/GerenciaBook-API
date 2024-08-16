import { Router } from 'express'
import routeAdapter from '../../../adapters/route-adapter'
import { makeGetManyBooksController } from '../../../factory/books/get-many/get-many-controller'

export default (router: Router) => {
  router.get('/books', routeAdapter(makeGetManyBooksController()))
}
