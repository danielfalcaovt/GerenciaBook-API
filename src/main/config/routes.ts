import { Express, Router } from 'express'
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()
  fs.readdirSync(`${__dirname}/../routes/signup`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../routes/signup/${file}`)).default(router)
    }
  })
  app.use('/api', router)
}