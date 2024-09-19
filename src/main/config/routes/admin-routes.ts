import { Express, Router } from 'express'
import fs from 'fs'

export default async (app: Express) => {
  const router = Router()

  // rota de cadastro de usuários
  fs.readdirSync(`${__dirname}/../../routes/admin/users`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/admin/users/${file}`)).default(router)
    }
  })
  
  // rota de login admin
  fs.readdirSync(`${__dirname}/../../routes/admin/login`).map(async file => {
    if (!file.includes('.test') && !file.includes('.map')) {
      (await import(`../../routes/admin/login/${file}`)).default(router)
    }
  })

  app.use('/admin', router)
}