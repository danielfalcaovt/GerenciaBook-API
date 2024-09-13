import * as dotenv from 'dotenv'
dotenv.config()

export default {
  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_USER: process.env.PG_USER || 'postgres',
  PG_DATABASE: process.env.PG_DATABASE,
  PG_PORT: Number(process.env.PG_PORT),
  PG_PASSWORD: process.env.PG_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET || 'development',
  JWT_ADM_SECRET: process.env.JWT_ADM_SECRET || 'admin',
  PORT: 3000
}