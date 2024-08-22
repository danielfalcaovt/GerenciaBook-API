import { Express, Router } from "express"
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()

  fs.readdirSync(`${__dirname}/../../routes/books/get`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/books/get/${file}`)).default(router)
    }
  })

  fs.readdirSync(`${__dirname}/../../routes/books/post`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/books/post/${file}`)).default(router)
    }
  })

  app.use('/api', router)
}