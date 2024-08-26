import { Express, Router } from "express"
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()

  for (const route of ['get', 'post', 'delete', 'update']) {
    fs.readdirSync(`${__dirname}/../../routes/books/${route}`).map(async file => {
      if (!file.includes('.test') && !file.includes('.map')) {
        (await import(`../../routes/books/${route}/${file}`)).default(router)
      }
    })
  }

  app.use('/api', router)
}