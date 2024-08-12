import express from 'express'
import routes from './routes'

const app = express()

routes(app)
// middlewares

export default app