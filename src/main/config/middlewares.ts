import { Express } from 'express'
import bodyParser from '../middlewares/body-parser/body-parser'
import contentType from '../middlewares/body-parser/content-type'
import cors from '../middlewares/body-parser/cors'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}