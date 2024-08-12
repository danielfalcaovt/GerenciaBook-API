import { Express, Router } from 'express'
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()
  const signup = fs.readdirSync(`src/main/routes/signup`)
  for (const route of signup) {
    if (!route.includes('.test')) {
      (await import(`../routes/signup/${route}`)).default(router)
    }
  }
  app.use('/api', router)
}