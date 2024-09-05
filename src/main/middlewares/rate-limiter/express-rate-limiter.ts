import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 15 * 60 & 1000,
    limit: 100,
    message: 'Limite de requisições atingido. Tente novamente mais tarde.'
  })