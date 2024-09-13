import { Express, Router } from 'express'
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()
  fs.readdirSync(`${__dirname}/../../routes/admin/users`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/admin/users/${file}`)).default(router)
    }
  })

  app.use('/admin', router)
}