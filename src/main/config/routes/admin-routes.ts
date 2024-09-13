import { Express, Router } from 'express'
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()
  fs.readdirSync(`${__dirname}/../../routes/admin`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/admin/${file}`)).default(router)
    }
  })

  app.use('/admin', router)
}