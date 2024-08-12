import { Express } from 'express'
import bodyParser from '../middlewares/body-parser/body-parser'
import contentType from '../middlewares/content-type/content-type'
import cors from '../middlewares/cors/cors'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}