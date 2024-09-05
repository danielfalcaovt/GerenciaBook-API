import { Express } from "express"
import { rateLimit } from 'express-rate-limit'

export default (app: Express) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 & 1000,
    limit: 100,
    message: 'Limite de requisições atingido. Tente novamente mais tarde.'
  })
  app.use(limiter)
}