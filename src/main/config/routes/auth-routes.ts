import { Express, Router } from 'express'
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()

  fs.readdirSync(`${__dirname}/../../routes/admin/login`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/admin/login/${file}`)).default(router)
    }
  })

  fs.readdirSync(`${__dirname}/../../routes/login`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/login/${file}`)).default(router)
    }
  })

  app.use('/api', router)
}